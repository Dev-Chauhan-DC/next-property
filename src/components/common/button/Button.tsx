import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge';

interface Props {
    title: string
    className?: string;
    classNameTitle?: string
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined
    loading?: boolean
    disabled?: boolean
    type?: 'borderd' | 'primary'
    size?: 'sm' | 'normal'
}

const Button: React.FC<Props> = ({ size, type, disabled, loading, title, className, classNameTitle, onPress }) => {
    return (
        <Pressable
            disabled={disabled}
            onPress={loading ? null : onPress}
            className={twMerge(`
                ${type === 'borderd' ? 'bg-white' : 'bg-black-800'}
                ${type === 'borderd' ? 'border border-gray-200' : ''}
                ${size === 'sm' ? ' h-9 ' : ' h-[38px]'}
                ${size === 'sm' ? ' px-5 ' : ' '}
                 flex items-center justify-center rounded-[5px]`,
                className,
                loading && 'bg-gray-300')}
        >
            <Text className={twMerge(`
                ${type === 'borderd' ? 'text-black-800' : 'text-white'}
                 font-mMedium text-sm`, classNameTitle)}>{loading ? "Loading..." : title}</Text>
        </Pressable>
    )
}

export default Button