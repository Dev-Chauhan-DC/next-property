import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import { Colors } from '@/src/constants/Colors';
import { Button } from '../../ui/button';
import { twMerge } from 'tailwind-merge';


interface Props {
    icon: React.ReactNode;
    title: string
    onPress?: (event: GestureResponderEvent) => void
    className?: string
}

const ButtonIcon: React.FC<Props> = ({ icon, title, onPress, className }) => {
    return (
        <Button
            variant={'secondary'}
            size={'sm'}
            onPress={onPress}
            className={twMerge('rounded-full px-[14px] py-[5px] flex flex-row items-center gap-2 bg-white border border-gray-200  ', className)}>
            {
                icon ?
                    React.cloneElement(icon as React.ReactElement, {
                        width: 16,
                        height: 16,
                        fill: Colors.black[800]
                    }) : null
            }
            <Text className='text-base text-black-800 font-mRegular'>{title}</Text>
        </Button>
    )
}

export default ButtonIcon