import { View, Text, useWindowDimensions, FlatList, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconBox from '@/src/components/common/icon_box'
import CompareIcon from '@/src/assets/svgs/CompareIcon'
import { Colors } from '@/src/constants/Colors'
import ButtonIcon from '@/src/components/common/button/ButtonIcon'
import { DATA } from '../(home)/list'
import PropertyCard from '@/src/components/app/(tabs)/(home)/list/PropertyCard'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import { IProperty } from '@/src/data/network/models/property'
import { getSavedProperty } from '@/src/data/network/services/saveProperty'
import { IFilters } from '@/src/utilities/interfaces/search'
import LoadMoreButton from '@/src/components/common/button/LoadMoreButton'
import { ISaveProperty } from '@/src/data/network/models/saveProperty'
import Button from '@/src/components/common/button/Button'

const LikeScreen = () => {
    const insets = useSafeAreaInsets();
    const [loading, setLoading] = useState<boolean>(false);
    const [properties, setProperties] = useState<ISaveProperty[]>([]);
    const [params, setParams] = useState<IFilters>({
        page: 1,
        limit: 6
    });
    const [comparePropertyList, setComparePropertyList] = useState<number[]>([]);
    const [submitHeight, setSubmitHeight] = useState<number>(0);
    const [showCompare, setShowCompare] = useState<boolean>(false);





    const getSavedPropertyHandle = async (params: IFilters) => {
        try {
            setLoading(true);
            const result = await getSavedProperty(params);

            if (params.page === 1) {
                setProperties(prevState => []);
                setProperties(result.data);
            } else {
                setProperties(prevState => [...prevState, ...result.data])
            }



        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);

        }
    }


    const loadMorePressHandle = async () => {
        if (params?.page) {
            getSavedPropertyHandle({ ...params, page: params.page + 1 });
            setParams({ ...params, page: params.page + 1 });
        }
    }

    const compareHandle = (id: number) => {

        setComparePropertyList(prevList => {

            if (prevList.includes(id)) {
                return prevList.filter(item => item !== id)
            } else {
                if (prevList.length >= 3) {
                    return prevList
                }
                return [...prevList, id]
            }


        });
    };


    useEffect(() => {
        getSavedPropertyHandle(params);
    }, [])



    return (
        <View
            style={{
                paddingTop: insets.top
            }}
            className='flex-1 bg-white'>
            <View className='pb-[10] flex flex-row justify-end px-[10px]'>
                <ButtonIcon
                    onPress={() => setShowCompare(true)}
                    icon={<CompareIcon width={12} height={12} fill={Colors.gray[400]} />}
                    title='Compare'
                />
            </View>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingHorizontal: 10,
                }}
                data={properties}
                renderItem={({ item }) =>
                    <PropertyCard
                        compareActive={item?.property?.id ? comparePropertyList.includes(item.property.id) : false}
                        onPressCompare={() => { item?.property?.id ? compareHandle(item.property.id) : null }}
                        compare={showCompare}
                        onPress={() => {
                            router.push({ pathname: '/property_info', params: { id: item?.property?.id } });
                        }}
                        image={item?.property?.property_photos?.[0]?.photos}
                        price={item?.property?.price}
                        ba={item?.property?.bathroom_count}
                        bd={item?.property?.bedroom_count}
                        hall={item?.property?.hall_count}
                        kitchen={item?.property?.kitchen_count}
                        sqft={item?.property?.built_up_area}
                        address={item?.property?.address}
                        role={item?.property?.user?.user_role?.role}
                    />}
                keyExtractor={(item) => item.id.toString()}
                ListFooterComponent={
                    loading ?
                        <View className='h-8 mb-3 items-center justify-center'>
                            <ActivityIndicator size={'small'} color={Colors.black[800]} />
                        </View>
                        :
                        <LoadMoreButton
                            className='mb-3'
                            onPress={loadMorePressHandle} />
                }
            />
            {
                showCompare ?
                    <View
                        onLayout={(e) => setSubmitHeight(e.nativeEvent.layout.height)}

                        className='border-t border-t-gray-100 bg-white py-2 px-7 flex flex-row justify-between items-center absolute bottom-0 left-0 w-full'>
                        <Text
                            onPress={() => setShowCompare(false)}
                        >Cancel</Text>
                        <Button
                            onPress={() => {
                                router.push({ pathname: '/compare', params: { ids: comparePropertyList.join(',') } });
                            }}
                            className='px-8 bg-black-800 '
                            title='Compare' />
                    </View> : null
            }

        </View>
    )
}

export default LikeScreen