import { View, Text, FlatList, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ArrowLeft, SendHorizonal } from 'lucide-react-native'
import { Avatar, AvatarFallback } from '@/src/components/ui/avatar'
import { Colors } from '@/src/constants/Colors'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import { Text as TextUI } from '@/src/components/ui/text'
import { router, useLocalSearchParams } from 'expo-router'
import { getChats } from '@/src/data/network/services/chat'
import { IChat } from '@/src/data/network/models/chat'
import { IMeta } from '@/src/data/network/models'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import { userState } from '@/src/global_state/recoil/atoms/user'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedConvAtom } from '@/src/global_state/recoil/atoms/chats'
import { getInitials } from '@/src/utilities/halper_functions/text'
import Input from '@/src/components/app/(chat)/chats/input'
import moment from "moment-timezone";


const chats = () => {
    const params = useLocalSearchParams();
    const id = parseInt(params.id as string);
    const [message, setMessage] = useState<string>('');
    const [chatsload, setChatsload] = useState<boolean>(false);
    const [chats, setChats] = useState<IChat[]>([])
    const [chatsMeta, setChatsMeta] = useState<IMeta>();
    const [page, setPage] = useState<number>(1);
    const user = useRecoilValue(userState)
    const [selectedConv, setSelectedConv] = useRecoilState(selectedConvAtom)






    const getChatsHandle = async (conversation_id: number, page: number = 1) => {
        try {
            setChatsload(true)
            const result = await getChats(conversation_id, page, 20);

            if (page === 1) {
                setChats(result.data);
                setChatsMeta(result.meta)
            } else {
                setChats([...chats, ...result.data]);
                setChatsMeta(result.meta)
            }





        } catch (error) {
            console.error(error);
            Toast.show(getError(error));
        } finally {
            setChatsload(false)
        }
    }



    useEffect(() => {

        if (id) {
            getChatsHandle(id)
        }

    }, [id])

    const secondUser = selectedConv?.user1_id === user?.id ? selectedConv?.user2 : selectedConv?.user1;

    return (
        <SafeAreaView className='flex-1 bg-white'>
            <View className='border-b border-gray-100'>
                <View className='flex flex-row items-center p-3 gap-4'>
                    <Pressable
                        onPress={() => router.back()}
                        className='flex flex-row items-center gap-3'>
                        <ArrowLeft
                            width={16}
                            height={16}
                            color={Colors.black[800]}
                        />
                        <Avatar alt="Zach Nugent's Avatar" className='h-12 w-12'>
                            <AvatarFallback>
                                <TextUI>{secondUser?.first_name ? getInitials(secondUser?.first_name) : null}</TextUI>
                            </AvatarFallback>
                        </Avatar>
                    </Pressable>
                    <View>
                        <Text className='text-black-800 text-base truncate font-mMedium mb-1'>{secondUser?.first_name}</Text>
                        <Text className='text-gray-300 text-xs truncate font-mMedium'>id: {secondUser?.id}</Text>
                    </View>
                </View>
            </View>
            <View className='flex-1 bg-white'>
                <FlatList
                    inverted
                    data={chats}
                    renderItem={(chat) =>
                        <View className={`
                        ${chat.item.sender_id === user?.id ? 'justify-end' : 'justify-start'}
                        flex flex-row  p-2.5`}>
                            <View className={`
                                ${chat.item.sender_id === user?.id ? 'flex flex-col items-end' : 'flex flex-col items-start'}
                                bg-gray-100 p-2 rounded-lg max-w-[70%]`}>
                                <Text className='text-black-800 text-base font-mRegular'>{chat.item.message}</Text>
                                <Text className='text-xs font-mMedium text-gray-300'>{moment(chat.item.createdAt).tz("Asia/Kolkata").format("hh:mm A")}</Text>
                            </View>
                        </View>
                    }
                    onEndReached={() => {
                        if (selectedConv && chatsMeta && chatsMeta?.page <= chatsMeta?.totalPages) {
                            getChatsHandle(selectedConv?.id, page + 1)
                            setPage(page + 1)
                        }

                    }}  // Call API when reaching top
                    onEndReachedThreshold={0.1} // Adjust for when to trigger API call
                // ListFooterComponent={isLoading && <ActivityIndicator />} // Show loader
                />
            </View>
            <Input
                chats={chats}
                setChats={setChats}

                selectedConv={selectedConv}
            />
        </SafeAreaView>
    )
}

export default chats