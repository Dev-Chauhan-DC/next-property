import { View, Text, Pressable, Linking } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'


interface Props {
    name?: string,
    number?: string,
    className?: string
}

const Item: React.FC<Props> = ({ name, number, className }) => {
    return (
        <Pressable
            onPress={() => Linking.openURL(`tel:${number}`)}
            className={twMerge('flex-row gap-3 items-center px-5', className)}>
            <View className='h-11 w-11 rounded-full items-center justify-center bg-gray-100'>
                <Text className='capitalize text-gray-400 text-base font-mMedium '>{name ? name[0] : ''}</Text>
            </View>
            <View>
                <Text className='text-base text-black-800 font-mMedium capitalize'>{name ? name : 'Unknown'}</Text>
                <Text className='text-sm text-primary font-mMedium'>{number}</Text>
            </View>
        </Pressable>
    )
}

export default Item