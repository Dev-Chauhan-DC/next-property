import { ActivityIndicator, Modal, Pressable, Text, useWindowDimensions, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/src/components/app/(tabs)/(home)/header';
import HomeLayout from '@/src/components/app/(tabs)/(home)/layout';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Link, router } from 'expo-router';
import { useRecoilState, useRecoilValue } from 'recoil';
import { filterAtom, onFilterApplyClickAtom, searchQueryState } from '@/src/global_state/recoil/atoms/search';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import { getProperty, searchAndFilters } from '@/src/data/network/services/property';
import { IFilters, IViewport } from '@/src/utilities/interfaces/search';
import { IGetPropertyParams, IProperty } from '@/src/data/network/models/property';
import { calculateDeltas } from '@/src/utilities/halper_functions/google_map';
import { formatNumberIndian } from '@/src/utilities/halper_functions/text';
import PropertyCard from '@/src/components/app/(tabs)/(home)/list/PropertyCard';
import { tabBarHeightAtom } from '@/src/global_state/recoil/atoms/layout';
import { Colors } from '@/src/constants/Colors';



const MapScreen = () => {
    const insets = useSafeAreaInsets()
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingProp, setLoadingProp] = useState<boolean>(false);
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [property, setProperty] = useState<IProperty | null>(null);
    const [filter, setFilter] = useRecoilState(filterAtom);
    const [onFilterApplyClick, setOnFilterApplyClick] = useRecoilState(onFilterApplyClickAtom);
    const tabBarHeight = useRecoilValue(tabBarHeightAtom);



    const searchAndFiltersHandle = async (viewport: IViewport, filters: IFilters) => {
        try {
            setLoading(true);
            const result = await searchAndFilters(viewport, filters);
            setProperties(result.data);


        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);

        }
    }

    const getPropertyHandle = async (propertyId: number, queryParams: IGetPropertyParams) => {
        try {
            setLoadingProp(true)
            const result = await getProperty(propertyId, queryParams);
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
            searchAndFiltersHandle(searchQuery?.result.geometry.viewport, {});
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



    return (

        <HomeLayout className='relative'>
            <Link href={'/builder_profile'}><Text className='font-mMedium text-red-500 text-sm text-center'>builder profile</Text></Link>
            <Link href={'/agent_profile'}><Text className='font-mMedium text-red-500 text-sm text-center'>Agent profile</Text></Link>

            <MapView
                provider={PROVIDER_GOOGLE}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                initialRegion={{
                    latitude: searchQuery?.result.geometry.location.lat || 21.1702401,
                    longitude: searchQuery?.result.geometry.location.lng || 72.83106070000001,
                    latitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).latitudeDelta : 0.2,
                    longitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).longitudeDelta : 0.2,
                }}
                region={{
                    latitude: searchQuery?.result.geometry.location.lat || 21.1702401,
                    longitude: searchQuery?.result.geometry.location.lng || 72.83106070000001,
                    latitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).latitudeDelta : 0.2,
                    longitudeDelta: searchQuery ? calculateDeltas(searchQuery?.result.geometry.viewport).longitudeDelta : 0.2,
                }}
            >
                {
                    properties.map((item, index) =>
                        <Marker
                            onPress={() => getPropertyHandle(item.id, { view: 'card' })}
                            key={index}
                            coordinate={{
                                latitude: item?.latitude || 0,
                                longitude: item?.longitude || 0,
                            }}
                        >
                            <Pressable

                                className='h-5 bg-red-500 rounded-[5px] items-center justify-center px-2'>
                                <Text className='font-mMedium text-white text-sm'>{item?.price ? '₹' + formatNumberIndian(item.price) : null}</Text>
                            </Pressable>
                        </Marker>
                    )
                }

            </MapView>
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