import { View, Text, LayoutChangeEvent, GestureResponderEvent } from 'react-native'
import React from 'react'
import Button from '@/src/components/common/button/Button'
import { twMerge } from 'tailwind-merge'
import { router } from 'expo-router'


interface Props {
    total: number
    completed: number
    rightTitle?: string
    leftTitle?: string
    className?: string
    onLayout?: (event: LayoutChangeEvent) => void
    onPressRight?: (event: GestureResponderEvent) => void
}

const Counter: React.FC<Props> = ({ onPressRight, onLayout, total, rightTitle, leftTitle, completed, className }) => {
    return (
        <View
            onLayout={onLayout}
            className={twMerge(``, className)}>
            <View className='flex flex-row h-[5px] gap-[2px]'>
                {
                    Array(total).fill(0).map((item, index) =>
                        <View
                            className={`
                                ${index + 1 <= completed ? 'bg-primary' : 'bg-gray-100'}
                                flex-1 `}
                            key={index} />
                    )
                }
            </View>
            <View className='flex flex-row justify-between px-7 h-[70px] items-center bg-white'>
                <Text
                    onPress={() => router.back()}
                    className=''>{leftTitle ? leftTitle : 'Back'}</Text>
                <Button
                    onPress={onPressRight}
                    className='bg-primary w-[70px]'
                    title={rightTitle ? rightTitle : 'Next'}
                />
            </View>
        </View>
    )
}

export default Counter