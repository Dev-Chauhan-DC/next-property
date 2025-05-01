import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors';


interface Props {
    icon: React.ReactNode;
    title: string
    onPress?: (event: GestureResponderEvent) => void
}

const ButtonIcon: React.FC<Props> = ({ icon, title, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            className='rounded-full px-[14px] py-[5px] flex flex-row items-center gap-[3px] border border-gray-300  '>
            {
                icon ?
                    React.cloneElement(icon as React.ReactElement, {
                        width: 12,
                        height: 12,
                        fill: Colors.black[800]
                    }) : null
            }
            <Text className='text-xs text-black-800 font-mRegular'>{title}</Text>
        </Pressable>
    )
}

export default ButtonIcon