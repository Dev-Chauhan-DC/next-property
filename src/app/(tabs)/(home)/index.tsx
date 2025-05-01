import { ActivityIndicator, Modal, Pressable, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeLayout from '@/src/components/app/(tabs)/(home)/layout';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Link, router } from 'expo-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAtom, onFilterApplyClickAtom, searchQueryState } from '@/src/global_state/recoil/atoms/search';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import { getProperty, getPropertyV2, searchAndFilters } from '@/src/data/network/services/property';
import { IFilters, IViewport } from '@/src/utilities/interfaces/search';
import { IGetPropertyParams, IProperty } from '@/src/data/network/models/property';
import { calculateDeltas } from '@/src/utilities/halper_functions/google_map';
import { formatNumberIndian } from '@/src/utilities/halper_functions/text';
import PropertyCard from '@/src/components/app/(tabs)/(home)/list/PropertyCard';
import { Colors } from '@/src/constants/Colors';
import MapView2 from "react-native-map-clustering";
import { tabBarHeight } from '@/src/constants/layout';




const MapScreen = () => {
    const insets = useSafeAreaInsets()
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const [loadingProp, setLoadingProp] = useState<boolean>(false);
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [property, setProperty] = useState<IProperty | null>(null);
    const [filter, setFilter] = useRecoilState(filterAtom);
    const [onFilterApplyClick, setOnFilterApplyClick] = useRecoilState(onFilterApplyClickAtom);








    const searchAndFiltersHandle = async (viewport: IViewport, filters: IFilters) => {
        try {
            const result = await searchAndFilters(viewport, { ...filters, view: 'map' });
            setProperties(result.data);


        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {

        }
    }

    const getPropertyHandle = async (propertyId: number, queryParams: IGetPropertyParams) => {
        try {
            setLoadingProp(true)
            const result = await getPropertyV2(propertyId, queryParams);
            setLoadingProp(false);
            setProperty(result.data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoadingProp(false);
        }
    }


    useEffect(() => {
        if (searchQuery?.result.geometry.viewport) {
            searchAndFiltersHandle(searchQuery?.result.geometry.viewport, { ...filter, view: 'map' });
        }

    }, [searchQuery])


    useEffect(() => {

        const filterFunction = () => {
            if (searchQuery?.result.geometry.viewport) {
                searchAndFiltersHandle(searchQuery?.result.geometry.viewport, filter);
            }
        }

        if (onFilterApplyClick) {
            filterFunction();
            setOnFilterApplyClick(false)
        }



    }, [onFilterApplyClick])


    const markers = useMemo(() => (
        properties.map((item, index) =>
            <Marker
                tracksViewChanges={false}
                onPress={() => {
                    if (item?.id) { getPropertyHandle(item?.id, { view: 'card' }) }
                }}
                key={index}
                coordinate={{
                    latitude: item?.latitude || 0,
                    longitude: item?.longitude || 0,
                }}
            >
                <Pressable
                    className='h-5 bg-red-500 rounded-[5px] items-center justify-center px-2'>
                    <Text className='font-mMedium text-white text-sm'>{item.price_on_demand ? 'CFP' : (item?.price ? '₹' + formatNumberIndian(item.price) : null)}</Text>
                </Pressable>
            </Marker>
        )
    ), [properties])


    const propertyCard = useMemo(() => (
        <Modal
            transparent={true}
            visible={property ? true : false}
            animationType='slide'
        >
            <Pressable
                style={{
                    paddingBottom: tabBarHeight + insets.bottom
                }}
                onPress={() => setProperty(null)}
                className='flex-1 justify-end '>
                <View
                    className='bg-white m-[10px] p-[10px] rounded-[10px]'>
                    <PropertyCard
                        isActiveHeart={property?.isSaved}
                        property={property}
                        image={property?.property_photos?.[0]?.photos}
                        price={property?.price}
                        ba={property?.bathroom_count}
                        bd={property?.bedroom_count}
                        hall={property?.hall_count}
                        kitchen={property?.kitchen_count}
                        sqft={property?.built_up_area}
                        address={property?.address}
                        role={property?.user?.user_role?.role}
                        onPress={() => {
                            setProperty(null);
                            router.push({ pathname: '/property_info', params: { id: property?.id } });
                        }}
                        className='m-0'
                    />
                </View>
            </Pressable>

        </Modal>
    ), [property, tabBarHeight, insets])

    const mapRegion = useMemo(() => (
        {
            latitude: searchQuery?.result.geometry.location.lat || 21.1702401,
            longitude: searchQuery?.result.geometry.location.lng || 72.83106070000001,
            latitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).latitudeDelta : 0.2,
            longitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).longitudeDelta : 0.2,
        }
    ), [searchQuery])


    const mapView = useMemo(() => {

        return (
            <MapView2
                clusterColor={Colors.red[500]}
                provider={PROVIDER_GOOGLE}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                initialRegion={mapRegion}
                region={mapRegion}
            >
                {markers}

            </MapView2>
        )
    }, [mapRegion, markers])



    return (

        <HomeLayout className='relative'>
            {
                process.env.NODE_ENV === "development" && <Link href={'/theme'}><Text className='font-mMedium text-red-500 text-sm text-center'>Theme</Text></Link>
            }
            {mapView}
            {propertyCard}
            {
                loadingProp ?
                    <View className='w-10 h-10 bg-white absolute top-0 left-0 m-4 rounded-full items-center justify-center'>
                        <ActivityIndicator size={'small'} color={Colors.black[800]} />
                    </View> : null
            }

        </HomeLayout>
    )
}

export default MapScreen