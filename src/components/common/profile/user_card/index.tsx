import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { Colors } from '@/src/constants/Colors'


interface Props {
    avatar?: string
    name?: string
    role?: string
    onPress?: (event: GestureResponderEvent) => void
}

const UserCard: React.FC<Props> = ({ onPress, name, role, avatar }) => {
    return (
        <Pressable
            onPress={onPress}
            className='flex flex-row items-end gap-1.5 cursor-pointer bg-gray-100 px-2 py-2 rounded-[5px]'>
            <View className='w-9 h-9 rounded-full'>
                <Image
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 100,
                        backgroundColor: Colors.gray[300]
                    }}
                    source={avatar || ''}
                />
            </View>
            <View className='flex flex-col gap-px'>
                <Text className='text-black-800 text-sm font-mMedium capitalize'>{name}</Text>
                <Text className='text-gray-400 text-[10px] font-mRegular capitalize' >{role}</Text>
            </View>
        </Pressable>
    )
}

export default UserCard