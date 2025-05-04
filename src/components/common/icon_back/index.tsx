import { View, Text, Pressable, StyleProp, ViewStyle, GestureResponderEvent } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge';
import { Colors } from '@/src/constants/Colors';
import { Button } from '../../ui/button';


interface Props {
    style?: StyleProp<ViewStyle>;
    icon: React.ReactElement;
    className?: string;
    onPress?: ((event: GestureResponderEvent) => void) | null | undefined
}

const IconBack: React.FC<Props> = ({ style, icon, className, onPress }) => {
    return (
        <Button
            size={'icon'}
            onPress={onPress}
            style={style}
            className={twMerge(` rounded-full bg-white `, className)}>
            {
                React.cloneElement(icon, {
                    width: 16,
                    height: 16,
                    color: Colors.black[800],
                    ...icon.props,

                })
            }
        </Button>
    )
}

export default IconBack