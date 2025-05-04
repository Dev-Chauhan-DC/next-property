import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import { Image } from 'expo-image'
import { Colors } from '@/src/constants/Colors'
import { twMerge } from 'tailwind-merge'


interface Props {
    avatar?: string
    name?: string
    role?: string
    onPress?: (event: GestureResponderEvent) => void
    className?: string
}

const UserCard: React.FC<Props> = ({ className, onPress, name, role, avatar }) => {
    return (
        <Pressable
            onPress={onPress}
            className={twMerge(`flex flex-row items-center gap-1.5 cursor-pointer bg-gray-100 pl-2 pr-3 py-2 rounded-[5px]`, className)}>
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
                <Text className='text-black-800 text-base font-mMedium capitalize'>{name}</Text>
                <Text className='text-gray-400 text-xs font-mRegular capitalize' >{role}</Text>
            </View>
        </Pressable>
    )
}

export default UserCard