import { View, Text, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'
import LocationIcon from '@/src/assets/svgs/LocationIcon'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import { Colors } from '@/src/constants/Colors'




interface Props {
    title?: string;
    message?: string;
    onPress?: (event: GestureResponderEvent) => void
}

const Item: React.FC<Props> = ({ title, message, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            className='flex flex-row gap-3 items-center'>
            <View className='w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center'>
                <LocationIcon
                    width={14}
                    height={14}
                    fill={Colors.black[800]}
                />
            </View>
            <View
                className='flex-1'
            >
                <Text className='text-base font-mRegular text-black-800'>{title}</Text>
                <Text className='text-gray-400 font-mRegular text-sm'>{message}</Text>
            </View>
            <ArrowIcon
                style={{
                    transform: [{ rotate: '45deg' }]
                }}
                width={14}
                height={14}
                fill={Colors.black[800]}
            />
        </Pressable>
    )
}

export default Item