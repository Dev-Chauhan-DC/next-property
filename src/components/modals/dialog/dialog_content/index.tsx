import { View, Text } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'



interface Props {
    className?: string
    children: React.ReactNode
}

const DialogContent: React.FC<Props> = ({ className, children }) => {
    return (
        <View className={twMerge(`flex-1 px-5`, className)}>
            {children}
        </View>
    )
}

export default DialogContent