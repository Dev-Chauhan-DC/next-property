import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors';


interface Props {
    title: string;
    icon: React.ReactNode;
}

const IconTitle: React.FC<Props> = ({ title, icon }) => {
    return (
        <View className='flex flex-row gap-3 items-center'>
            {
                React.cloneElement(icon as React.ReactElement, {
                    width: 20,
                    height: 20,
                    fill: Colors.black[800]
                })
            }
            <Text className='font-mRegular text-sm text-black-800'>{title}</Text>
        </View>
    )
}

export default IconTitle