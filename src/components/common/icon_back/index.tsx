import { View, Text, Pressable, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge';
import { Colors } from '@/src/constants/Colors';


interface Props {
    style?: StyleProp<ViewStyle>;
    icon: React.ReactElement;
    className?: string;
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined
}

const IconBack: React.FC<Props> = ({ style, icon, className, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={style}
            className={twMerge(`w-7 h-7 rounded-full bg-white flex items-center justify-center`, className)}>
            {
                React.cloneElement(icon, {
                    width: 12,
                    height: 12,
                    color: Colors.black[800],
                    ...icon.props,

                })
            }
        </Pressable>
    )
}

export default IconBack