import { View, Text } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'

interface Props {
    title: string
    className?: string
    classNameTitle?: string
}

const Badge: React.FC<Props> = ({ title, className, classNameTitle }) => {
    return (
        <View className={twMerge(`bg-gray-100 rounded-full py-1.5 px-3`, className)}>
            <Text className={twMerge(`text-xs font-mRegular text-black-800`, classNameTitle)}>{title}</Text>
        </View>
    )
}

export default Badge