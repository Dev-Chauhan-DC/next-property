import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import TitleBar from '@/src/components/common/title_bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui/avatar'
import { router } from 'expo-router'
import { getConversation } from '@/src/data/network/services/conversation'
import { IConversation } from '@/src/data/network/models/conversation'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import { getInitials } from '@/src/utilities/halper_functions/text'
import { userState } from '@/src/global_state/recoil/atoms/user'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedConvAtom } from '@/src/global_state/recoil/atoms/chats'

const User = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [conversation, setConversation] = useState<IConversation[]>([]);
    const user = useRecoilValue(userState)
    const [selectedConv, setSelectedConv] = useRecoilState(selectedConvAtom)






    const getConversationHandle = async () => {
        try {
            setLoading(true)
            const result = await getConversation();
            setConversation(result.data);
        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        } finally {
            setLoading(false);
        }
    }


    useEffect(() => {
        getConversationHandle()
    }, [])



    return (
        <SafeAreaView className='flex-1 bg-white'>
            <TitleBar title='Chats' />
            <ScrollView className='flex-1 px-2.5'>
                {
                    conversation.map((conv, index) => {
                        const otherUser = user?.id === conv.user1.id ? conv.user2 : conv.user1;

                        return (
                            <Pressable
                                key={conv.id}
                                onPress={() => {


                                    setSelectedConv(conv)
                                    router.push({ pathname: '/(chat)/chats', params: { id: conv.id } })
                                }

                                }
                                className=' flex flex-row gap-4 items-center p-3'>
                                <Avatar alt="Zach Nugent's Avatar" className='h-12 w-12'>
                                    <AvatarFallback>
                                        <Text>{getInitials(otherUser.first_name || '')}</Text>
                                    </AvatarFallback>
                                </Avatar>
                                <View>
                                    <Text className='text-black-800 text-sm truncate font-mMedium mb-1'>{otherUser.first_name}</Text>
                                    <Text className='text-gray-300 text-xs truncate font-mMedium'>id: {otherUser.id}</Text>
                                </View>
                            </Pressable>)
                    }
                    )
                }

            </ScrollView>
        </SafeAreaView>
    )
}

export default User