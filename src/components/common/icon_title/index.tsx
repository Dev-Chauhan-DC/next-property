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
                    width: 24,
                    height: 24,
                    color: Colors.black[800],
                    strokeWidth: '1.3'
                })
            }
            <Text className='font-mMedium text-base text-black-800 capitalize'>{title}</Text>
        </View>
    )
}

export default IconTitle