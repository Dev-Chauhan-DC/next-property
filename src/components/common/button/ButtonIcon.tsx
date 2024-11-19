import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'


interface Props {
    icon: React.ReactNode;
    title: string
    onPress?: (event: GestureResponderEvent) => void
}

const ButtonIcon: React.FC<Props> = ({ icon, title, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            className='rounded-full px-[14px] py-[5px] flex flex-row items-center gap-[3px] border border-gray-100  '>
            {icon}
            <Text className='text-xs text-gray-400 font-mRegular'>{title}</Text>
        </Pressable>
    )
}

export default ButtonIcon