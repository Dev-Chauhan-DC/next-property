import { View, Text } from 'react-native'
import React from 'react'


interface Props {
    children: React.ReactNode
    title?: string
}

const TitleLayout: React.FC<Props> = ({ children, title }) => {
    return (
        <View>
            <Text className='text-sm text-black-800 font-mMedium mb-3'>{title}</Text>
            {children}
        </View>
    )
}

export default TitleLayout