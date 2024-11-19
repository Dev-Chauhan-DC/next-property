import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge';

interface Props {
    title: string
    className?: string;
    classNameTitle?: string
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined
    loading?: boolean
}

const Button: React.FC<Props> = ({ loading, title, className, classNameTitle, onPress }) => {
    return (
        <Pressable
            onPress={loading ? null : onPress}
            className={twMerge(`h-[38px] bg-black-800 flex items-center justify-center rounded-[5px]`,
                className,
                loading && 'bg-gray-300')}
        >
            <Text className={twMerge(`text-white font-mMedium text-sm`, classNameTitle)}>{loading ? "Loading..." : title}</Text>
        </Pressable>
    )
}

export default Button