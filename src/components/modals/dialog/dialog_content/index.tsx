import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'



interface Props {
    className?: string
    children: React.ReactNode
}

const DialogContent: React.FC<Props> = ({ className, children }) => {
    return (
        <ScrollView className={twMerge(`flex-1 px-5`, className)}>
            {children}
        </ScrollView>
    )
}

export default DialogContent