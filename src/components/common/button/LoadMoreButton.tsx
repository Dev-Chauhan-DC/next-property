import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'


interface Props {
    onPress?: (event: GestureResponderEvent) => void,
    className?: string
}

const LoadMoreButton: React.FC<Props> = ({ onPress, className }) => {
    return (
        <Pressable

            onPress={onPress}
            className={twMerge(`w-full h-8 flex items-center justify-center border border-dashed border-gray-300 rounded-[5px]`, className)}>
            <Text className='font-mRegular text-sm text-gray-300'>Load More</Text>
        </Pressable>
    )
}

export default LoadMoreButton