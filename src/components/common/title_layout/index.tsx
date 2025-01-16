import { View, Text } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'


interface Props {
    children: React.ReactNode
    title?: string
    className?: string
}

const TitleLayout: React.FC<Props> = ({ className, children, title }) => {
    return (
        <View className={twMerge(``, className)}>
            <Text className='text-sm text-black-800 font-mMedium mb-3'>{title}</Text>
            {children}
        </View>
    )
}

export default TitleLayout