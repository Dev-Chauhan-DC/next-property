import { View, Text, Pressable, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge';


interface Props {
    style?: StyleProp<ViewStyle>;
    icon: React.ReactNode;
    className?: string;
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined
}

const IconBack: React.FC<Props> = ({ style, icon, className, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={style}
            className={twMerge(`w-7 h-7 rounded-full bg-white flex items-center justify-center`, className)}>
            {icon}
        </Pressable>
    )
}

export default IconBack