import { View, Text, FlatList, Pressable, ActivityIndicator, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '@/src/components/common/button/Button'
import { DATA } from '../(home)/list'
import PropertyCard from '@/src/components/app/(tabs)/(home)/list/PropertyCard'
import { useRecoilValue } from 'recoil'
import { userState } from '@/src/global_state/recoil/atoms/user'
import { getError } from '@/src/utilities/halper_functions/service'
import { deleteProperty, getUserProperties, getUserPropertiesV2 } from '@/src/data/network/services/property'
import { IProperty } from '@/src/data/network/models/property'
import { Colors } from '@/src/constants/Colors'
import LoadMoreButton from '@/src/components/common/button/LoadMoreButton'
import Toast from 'react-native-root-toast'
import { Cog, Grip, LogOut } from 'lucide-react-native'
import IconBack from '@/src/components/common/icon_back'
import useLogout from '@/src/hooks/useLogout'
import { IMeta } from '@/src/data/network/models'
import NoData from '@/src/components/common/ui/no_data'
import * as AvatarPrimitive from '@rn-primitives/avatar';
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar'
import { Text as TextUI } from '@/src/components/ui/text'
import { getInitials } from '@/src/utilities/halper_functions/text'

const ProfileScreen = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const user = useRecoilValue(userState);
    const [loading, setLoading] = useState<boolean>(false);
    const [properties, setProperties] = useState<IProperty[]>([])
    const [page, setPage] = useState<number>(1);
    const [refreshing, setRefreshing] = useState(false);
    const [meta, setMeta] = useState<IMeta>()



    const onRefresh = async () => {
        setRefreshing(true);
        await getUserPropertiesHandle(1); // Call your API function to reload data
        setRefreshing(false);
    };


    const getUserPropertiesHandle = async (page: number, limit: number = 6) => {
        try {
            setLoading(true);
            const result = await getUserPropertiesV2(page, limit);

            if (page === 1) {
                setProperties([]);
                setProperties(result.data);
                setMeta(result.meta)
            } else {
                setProperties(prevState => [...prevState, ...result.data])
                setMeta(result.meta)
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


    const deletePropertyHandle = async (propertyId: number) => {
        try {
            Alert.alert("Are you sure", "Do you want to delete?", [{
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    await deleteProperty(propertyId);
                    await getUserPropertiesHandle(1);
                    setPage(1);
                }
            }
            ])

        } catch (e) {
            console.error(e)
        }
    }

    useEffect(() => {
        getUserPropertiesHandle(page);
    }, [])


    const userName = (user?.first_name ? user?.first_name + ' ' : '') + (user?.last_name ? user?.last_name : '') + (!user?.first_name && !user?.last_name ? 'Update Profile' : '')

    return (
        <View
            style={{
                paddingTop: insets.top
            }}
            className='flex-1 bg-white'>
            {/* <Text
                onPress={() => logout()}
                className='font-mMedium text-red-500 text-sm text-right p-4'>Logout</Text> */}
            <View

                className=' px-[16px] mx-[10px] h-[67px] rounded-[10px] bg-gray-100 justify-center'>
                <View className='flex flex-row items-center justify-between'>
                    <Pressable onPress={() => router.push('/profile_info')} className='flex flex-row items-center gap-3.5'>
                        <Avatar alt='Profile Avatar'>
                            <AvatarFallback><TextUI className='text-black-800 font-mMedium'>{getInitials((userName))}</TextUI></AvatarFallback>
                        </Avatar>
                        <View className='gap-0.5'>
                            <Text className='text-base font-mMedium text-black-800'>
                                {user?.first_name ? user?.first_name + ' ' : ''}
                                {user?.last_name ? user?.last_name : ''}
                                {!user?.first_name && !user?.last_name ? 'Update Profile' : ''}
                            </Text>
                            <Text className='text-[10px] text-gray-300 font-mMedium'>Show Profile</Text>
                        </View>
                    </Pressable>
                    <IconBack
                        className='bg-transparent'
                        onPress={() => router.push('/settings')}
                        icon={<Grip
                            width={20}
                            height={20}
                            color={Colors.gray[400]}
                        />}
                    />

                </View>


            </View>
            <Button
                onPress={() => router.push('/(listing)/first')}
                className='mx-[10px] mt-[28px]'
                title='List Your Property for Free' />

            <Text className='font-mSemiBold text-black-800 text-base mt-[20px] mb-[10px] px-[10px]'>Listed Properties</Text>
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
                        onPressDelete={() => {
                            if (item.id) {
                                deletePropertyHandle(item.id)
                            }
                        }

                        }
                        isDelete={true}
                        isEdit={true}
                        property={item}
                        onPress={() => {
                            router.push({ pathname: '/property_info', params: { id: item?.id } });
                        }}
                        onPressEdit={() => {
                            router.push({ pathname: '/(update)/first', params: { id: item?.id } });
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
                        interestedPeople={true}
                        onPressInterestedPeople={() => router.push({ pathname: '/interested_people', params: { id: item.id } })}
                    />}
                keyExtractor={(item) => item?.id?.toString() || ''}
                ListHeaderComponent={
                    !loading && properties?.length === 0 ?
                        <NoData
                            text='List your property for free to sell or rent effortlessly'
                        /> : null
                }
                ListFooterComponent={
                    loading ?
                        <View className='h-8 mb-3 items-center justify-center'>
                            <ActivityIndicator size={'small'} color={Colors.black[800]} />
                        </View>
                        : meta?.page && meta?.totalPages && meta?.page < meta?.totalPages ?
                            <LoadMoreButton
                                className='mb-3'
                                onPress={loadMorePressHandle} /> : null
                }
            />
        </View>
    )
}

export default ProfileScreen