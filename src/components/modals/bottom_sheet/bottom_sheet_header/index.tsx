import { View, Text, GestureResponderEvent, Pressable } from 'react-native'
import React from 'react'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import { Colors } from '@/src/constants/Colors'
import CloseIcon from '@/src/assets/svgs/CloseIcon';



interface Props {
    title?: string;
    onPressClose?: (event: GestureResponderEvent) => void;
}

const BottomSheetHeader: React.FC<Props> = ({ title, onPressClose }) => {
    return (
        <View className='flex-row justify-between items-center mb-2'>
            <Text className='text-base font-medium text-black-800'>{title}</Text>
            <Pressable onPress={onPressClose} className='w-[24px] h-[24px] items-center justify-between'>
                <CloseIcon
                    width={16}
                    height={16}
                    fill={Colors.black[800]}
                />
            </Pressable>
        </View>
    )
}

export default BottomSheetHeader