import { View, Text, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '@/src/components/common/button/Button'
import { DATA } from '../(home)/list'
import PropertyCard from '@/src/components/app/(tabs)/(home)/list/PropertyCard'
import { useRecoilValue } from 'recoil'
import { userState } from '@/src/global_state/recoil/atoms/user'
import { getError } from '@/src/utilities/halper_functions/service'
import { getUserProperties } from '@/src/data/network/services/property'
import { IProperty } from '@/src/data/network/models/property'
import { Colors } from '@/src/constants/Colors'
import LoadMoreButton from '@/src/components/common/button/LoadMoreButton'
import Toast from 'react-native-root-toast'

const ProfileScreen = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState<boolean>(false);
    const [properties, setProperties] = useState<IProperty[]>([])
    const [page, setPage] = useState<number>(1);





    const getUserPropertiesHandle = async (page: number, limit: number = 6) => {
        try {
            setLoading(true);
            const result = await getUserProperties(page, limit);

            if (page === 1) {
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
        getUserPropertiesHandle(page + 1);
        setPage(page + 1);
    }


    useEffect(() => {
        getUserPropertiesHandle(page);
    }, [])



    return (
        <View
            style={{
                paddingTop: insets.top
            }}
            className='flex-1 bg-white'>
            <Pressable
                onPress={() => router.push('/profile_info')}
                className=' px-[16px] mx-[10px] h-[67px] rounded-[10px] bg-gray-100 justify-center'>
                <View className='gap-3.5 flex flex-row items-center'>
                    <View className='w-[45px] h-[45px] rounded-full bg-gray-200 '></View>
                    <View className='gap-1'>
                        <Text className='text-sm font-mRegular text-black-800'>{user?.first_name + ' ' + user?.last_name}</Text>
                        <Text className='text-[10px] text-gray-400 font-mRegular'>Show Profile</Text>
                    </View>
                </View>


            </Pressable>
            <Button
                onPress={() => router.push('/(listing)/first')}
                className='mx-[10px] mt-[28px]'
                title='List Property' />

            <Text className='font-mSemiBold text-black-800 text-base mt-[20px] mb-[10px] px-[10px]'>Listed Properties</Text>
            <FlatList
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                style={{
                    paddingHorizontal: 10,
                }}
                data={properties}
                renderItem={({ item }) =>
                    <PropertyCard
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
        </View>
    )
}

export default ProfileScreen