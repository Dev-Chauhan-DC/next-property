import { View, Text, GestureResponderEvent, Pressable } from 'react-native'
import React from 'react'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import { Colors } from '@/src/constants/Colors'
import CloseIcon from '@/src/assets/svgs/CloseIcon';
import { X } from 'lucide-react-native';



interface Props {
    title?: string;
    onPressClose?: (event: GestureResponderEvent) => void;
}

const BottomSheetHeader: React.FC<Props> = ({ title, onPressClose }) => {
    return (
        <View className='flex-row justify-between items-center mb-2 px-5 pt-5 '>
            <Text className='text-base font-mMedium text-black-800'>{title}</Text>
            <Pressable onPress={onPressClose} className='w-[12px] h-[12px] items-center justify-between'>
                <X
                    width={16}
                    height={16}
                    color={Colors.black[800]}
                />
            </Pressable>
        </View>
    )
}

export default BottomSheetHeader