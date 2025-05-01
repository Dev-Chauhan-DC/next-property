import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Textarea } from '@/src/components/ui/textarea'
import { Button } from '@/src/components/ui/button'
import { SendHorizonal } from 'lucide-react-native'
import { io, Socket } from 'socket.io-client';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cookieName } from '@/src/data/local_storage/cookies'
import { IConversation } from '@/src/data/network/models/conversation'
import { IChat } from '@/src/data/network/models/chat'


const token = async () => await AsyncStorage.getItem(cookieName.token);


const socket = io(process.env.EXPO_PUBLIC_API_BASE_URL_SOCKET, {
    path: '/api/socket.io',
    transports: ["websocket", "polling"],
    auth: { token: async () => await token() }
});

interface Props {
    selectedConv?: IConversation

    chats: IChat[]
    setChats: React.Dispatch<React.SetStateAction<IChat[]>>
}

const Input: React.FC<Props> = ({ selectedConv, chats, setChats }) => {
    const [newMessage, setNewMessage] = useState("");
    const [socket, setSocket] = useState<Socket | null>(null);


    const sendMessage = () => {
        if (!newMessage.trim()) return;

        // Emit message to server
        socket?.emit('sendMessage', {
            conversation_id: selectedConv?.id,
            message: newMessage,
        });

        setNewMessage('');
    };


    useEffect(() => {
        const initializeSocket = async () => {
            const token = await AsyncStorage.getItem(cookieName.token);

            const newSocket = io(process.env.EXPO_PUBLIC_API_BASE_URL_SOCKET, {
                path: '/api/socket.io',
                transports: ["websocket", "polling"],
                auth: { token },
            });

            setSocket(newSocket);

            newSocket.on(`receiveMessage-${selectedConv?.id}`, (chat) => {
                setChats((prev) => [chat, ...prev]);
            });

            return () => {
                newSocket.off(`receiveMessage-${selectedConv?.id}`);
                newSocket.disconnect();
            };
        };

        initializeSocket();
    }, [selectedConv?.id]);
    return (
        <View className='border-t border-gray-100 flex flex-row gap-2 items-start p-2.5'>
            <Textarea
                className='flex-1 border-0 max-h-36'
                placeholder='Type your message here...'
                value={newMessage}
                onChangeText={setNewMessage}
            />
            <Button
                onPress={sendMessage}
                variant={'default'}
                size={'icon'}
            >
                <SendHorizonal
                    width={16}
                    height={16}
                    color={'white'}
                />
            </Button>
        </View>
    )
}

export default Input