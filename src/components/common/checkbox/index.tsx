import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import CheckIcon from '@/src/assets/svgs/CheckIcon'


interface Props {
    title?: string
    check?: boolean
    onPress?: (event: GestureResponderEvent) => void
}

const Checkbox: React.FC<Props> = ({ title, check, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            className='flex flex-row items-center gap-3'>
            <View
                className={`
                    ${check ? 'bg-primary' : 'bg-gray-200'}
                    w-6 h-6 rounded-[5px]  flex items-center justify-center`}
            >
                {
                    check ? <CheckIcon
                        width={14}
                        height={14}
                        fill={'white'}
                    /> :
                        <></>
                }


            </View>
            <Text className='text-base font-mRegular text-gray-400'>{title}</Text>
        </Pressable>
    )
}

export default Checkbox