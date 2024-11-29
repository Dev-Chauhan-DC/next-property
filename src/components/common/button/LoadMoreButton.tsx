import { View, Text, Pressable, GestureResponderEvent, ActivityIndicator } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Colors } from '@/src/constants/Colors'


interface Props {
    onPress?: (event: GestureResponderEvent) => void,
    className?: string
    loading?: boolean
}

const LoadMoreButton: React.FC<Props> = ({ onPress, className, loading = false }) => {


    if (loading) {
        return (
            <View className='flex-row items-center justify-center w-full h-8'>
                <ActivityIndicator color={Colors.black[800]} size={'small'} />
            </View>
        )
    }

    return (
        <Pressable
            onPress={onPress}
            className={twMerge(`w-full h-8 flex items-center justify-center border border-dashed border-black-800 rounded-[5px]`, className)}>
            <Text className='font-mRegular text-sm text-black-800'>Load More</Text>
        </Pressable>
    )
}

export default LoadMoreButton