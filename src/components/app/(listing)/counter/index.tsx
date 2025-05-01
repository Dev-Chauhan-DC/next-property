import { View, Text, LayoutChangeEvent, GestureResponderEvent, ActivityIndicator } from 'react-native'
import React from 'react'
import Button from '@/src/components/common/button/Button'
import { twMerge } from 'tailwind-merge'
import { router } from 'expo-router'
import { Button as ButtonUI } from '@/src/components/ui/button'
import { Text as TextUI } from '@/src/components/ui/text'
import { Loader2 } from 'lucide-react-native'


interface Props {
    total: number
    completed: number
    rightTitle?: string
    leftTitle?: string
    className?: string
    onLayout?: (event: LayoutChangeEvent) => void
    onPressRight?: (event: GestureResponderEvent) => void
    loading?: boolean
}

const Counter: React.FC<Props> = ({ loading, onPressRight, onLayout, total, rightTitle, leftTitle, completed, className }) => {
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
                <ButtonUI
                    variant={'ghost'}
                    size={'default'}
                    onPress={() => router.back()}
                >

                    <TextUI>{leftTitle ? leftTitle : 'Back'}</TextUI>
                </ButtonUI>
                <ButtonUI
                    size={'default'}
                    onPress={onPressRight}
                >
                    {loading &&
                        <ActivityIndicator
                            size={'small'}
                            color={'white'}
                        />}
                    <TextUI>{rightTitle ? rightTitle : 'Next'}</TextUI>
                </ButtonUI>
            </View>
        </View>
    )
}

export default Counter