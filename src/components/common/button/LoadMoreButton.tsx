import { View, Text, Pressable, GestureResponderEvent, ActivityIndicator } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { Colors } from '@/src/constants/Colors'
import { Button } from '../../ui/button'


interface Props {
    onPress?: (event: GestureResponderEvent) => void,
    className?: string
    loading?: boolean
}

const LoadMoreButton: React.FC<Props> = ({ onPress, className, loading = false }) => {


    if (loading) {
        return (
            <View className='flex-row items-center justify-center w-full h-10'>
                <ActivityIndicator color={Colors.black[800]} size={'small'} />
            </View>
        )
    }

    return (
        <Button
            variant={'ghost'}
            size={'sm'}
            onPress={onPress}
            className={twMerge(`p-0 m-0 w-full h-10 flex items-center justify-center border border-dashed border-black-800 rounded-[5px]`, className)}>
            <Text className='font-mRegular text-base text-black-800'>Load More</Text>
        </Button>
    )
}

export default LoadMoreButton