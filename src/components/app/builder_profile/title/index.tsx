import { View, Text } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'



interface Props {
    title: string
    className?: string
    classNameView?: string
}

const Title: React.FC<Props> = ({ title, className, classNameView }) => {
    return (
        <View className={twMerge(``, classNameView)}>
            <Text className={twMerge('text-base font-mMedium text-gray-400', className)}>{title}</Text>
        </View>
    )
}

export default Title