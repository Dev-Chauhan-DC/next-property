import { View, Text, ScrollView, FlatList, Modal, Pressable, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from '@/src/components/app/(tabs)/(home)/header';
import HomeLayout from '@/src/components/app/(tabs)/(home)/layout';
import PropertyCard from '@/src/components/app/(tabs)/(home)/list/PropertyCard';
import ButtonIcon from '@/src/components/common/button/ButtonIcon';
import SortIcon from '@/src/assets/svgs/SortIcon';
import { Colors } from '@/src/constants/Colors';
import SortModal from '@/src/components/modals/sort';
import { IFilters, IViewport } from '@/src/utilities/interfaces/search';
import { searchAndFilters } from '@/src/data/network/services/property';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import { IProperty } from '@/src/data/network/models/property';
import { useRecoilState } from 'recoil';
import { filterAtom, onFilterApplyClickAtom, searchQueryState } from '@/src/global_state/recoil/atoms/search';
import LoadMoreButton from '@/src/components/common/button/LoadMoreButton';
import { sort } from '@/src/constants/app/Property';
import { result } from 'lodash';
import { saveProperty } from '@/src/data/network/services/saveProperty';
import { userState } from '@/src/global_state/recoil/atoms/user';
export const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68abrfc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-str471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0bsf-3da1-471f-bd96-145571e29d72fw',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3dsrta1-471f-bd96-145571fe29d72fw',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd9srtb6-145571e29d72fwe',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd9w6r-145571e29d72fwvw',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96rthbr-145571e29d72df',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96s-1sb45571e29d72',
        title: 'Third Item',
    },
    {
        id: '58694a0f-3da1-471f-bsbd96-145571e29d72',
        title: 'Third Item',
    },
];

const ListScreen = () => {
    const insets = useSafeAreaInsets();
    const [sortModal, setSortModal] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [properties, setProperties] = useState<IProperty[]>([]);
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);
    const [page, setPage] = useState<number>(1);
    const [filter, setFilter] = useRecoilState(filterAtom);
    const [onFilterApplyClick, setOnFilterApplyClick] = useRecoilState(onFilterApplyClickAtom);
    const [refreshing, setRefreshing] = useState(false);



    const onRefresh = async () => {
        if (searchQuery?.result.geometry.viewport) {
            searchAndFiltersHandle(searchQuery?.result.geometry.viewport, { ...filter, page: 1 });
            setPage(1);
        }
    };





    const searchAndFiltersHandle = useCallback(async (viewport: IViewport, filters: IFilters) => {
        try {
            setLoading(true);
            const result = await searchAndFilters(viewport, filters);

            setProperties(prevState => (filters.page === 1 ? result.data : [...prevState, ...result.data]));

        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);

        }
    }, [setLoading, setProperties])


    const loadMorePressHandle = async () => {
        if (searchQuery?.result.geometry.viewport) {
            searchAndFiltersHandle(searchQuery?.result.geometry.viewport, { ...filter, page: page + 1 });
            setPage(page + 1);
        }
    }




    useEffect(() => {
        if (searchQuery?.result.geometry.viewport) {
            searchAndFiltersHandle(searchQuery?.result.geometry.viewport, { ...filter, page: 1 });
            setPage(1);
        }

    }, [searchQuery])

    useEffect(() => {

        const filterFunction = () => {
            if (searchQuery?.result.geometry.viewport) {
                searchAndFiltersHandle(searchQuery?.result.geometry.viewport, { ...filter, page: 1 });
            }
        }

        if (onFilterApplyClick) {
            filterFunction();
            setOnFilterApplyClick(false)
        }



    }, [onFilterApplyClick])


    return (
        <HomeLayout>
            <View className='pb-[10] flex flex-row justify-end px-[10px]'>
                <ButtonIcon
                    onPress={() => setSortModal(true)}
                    icon={<SortIcon />}
                    title='Sort By'
                />
            </View>
            <FlatList
                refreshing={refreshing}
                onRefresh={onRefresh}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingHorizontal: 10,
                }}
                data={properties}
                renderItem={({ item }) =>
                    <PropertyCard
                        isActiveHeart={item.saved_properties?.length ? true : false}
                        property={item}
                        onPress={() => {
                            router.push({ pathname: '/property_info', params: { id: item?.id } });
                        }}
                        image={item?.property_photos?.[0]?.photos}
                        price={item.price}
                        ba={item.bathroom_count}
                        bd={item.bedroom_count}
                        hall={item.hall_count}
                        kitchen={item.kitchen_count}
                        sqft={item.built_up_area}
                        address={item.address}
                        role={item.user?.user_role?.role}
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

            <SortModal
                onPressClose={() => setSortModal(false)}
                onPressOutSide={() => setSortModal(false)}
                visible={sortModal}
                onSelect={(index) => {
                    if (searchQuery?.result.geometry.viewport) {
                        searchAndFiltersHandle(searchQuery?.result.geometry.viewport, { ...filter, sorting: sort[index].name, page: 1 });
                        setFilter((prevState) => ({ ...prevState, sorting: sort[index].name, page: 1 }));
                        setPage(1);
                        setSortModal(false);
                    }
                }}
            />

        </HomeLayout>
    )
}

export default ListScreen