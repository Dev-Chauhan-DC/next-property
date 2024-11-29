import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import TitleBar from '../components/common/title_bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import Item from '../components/app/interested_people/item'
import { useLocalSearchParams } from 'expo-router'
import { getInterestedPeople } from '../data/network/services/interestedPeople'
import Toast from 'react-native-root-toast'
import { getError } from '../utilities/halper_functions/service'
import { IUser } from '../data/network/models/user'
import { IInterestedPeople } from '../data/network/models/interestedPeople'
import LoadMoreButton from '../components/common/button/LoadMoreButton'

const interestedPeople = () => {
    const { id } = useLocalSearchParams();
    const [users, setUsers] = useState<IInterestedPeople[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [page, setPage] = useState<number>(1);



    const getInterestedPeopleHandle = async (propertyId: number, params: { page: number; }) => {
        try {
            setLoading(true)
            const result = await getInterestedPeople(propertyId, params);



            if (params.page === 1) {
                setUsers(prevState => []);
                setUsers(result.data);
            } else {
                setUsers(prevState => [...prevState, ...result.data])
            }




        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }




    useEffect(() => {
        const numericId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10); // Ensure it's a number
        if (!isNaN(numericId)) {
            getInterestedPeopleHandle(numericId, { page: 1 })
        }
    }, [id])

    return (
        <SafeAreaView className='bg-white flex-1'>
            <TitleBar title='People who have seen your number' />
            <ScrollView className='flex-1'>

                {
                    users.map((item, index) =>

                        <Item
                            key={index}
                            name={(item.user.first_name ? (item.user.first_name + ' ') : '') + (item.user.last_name ? item.user.last_name : '')}
                            number={item.user.phone_number}
                        />
                    )
                }

                <View className='mx-5 mt-5'>
                    <LoadMoreButton
                        onPress={() => {
                            const numericId = Array.isArray(id) ? parseInt(id[0], 10) : parseInt(id, 10); // Ensure it's a number
                            if (!isNaN(numericId)) {
                                setPage(page + 1)
                                getInterestedPeopleHandle(numericId, { page: page + 1 })
                            }
                        }}
                        loading={loading}
                    />
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

export default interestedPeople