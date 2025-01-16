import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import CloseIcon from '@/src/assets/svgs/CloseIcon'
import { Colors } from '@/src/constants/Colors'
import IconBack from '@/src/components/common/icon_back'
import { twMerge } from 'tailwind-merge'



interface Props {
    title?: string
    className?: string
    onPressClose?: (event: GestureResponderEvent) => void
}
const DialogHeader: React.FC<Props> = ({ title = "title", onPressClose, className }) => {
    return (
        <View className={twMerge('flex flex-row items-center justify-between px-5 py-2 mb-3', className)}>
            <Text className='text-base font-mMedium text-black-800'>{title}</Text>
            <IconBack
                onPress={onPressClose}
                icon={<CloseIcon
                    width={12}
                    height={12}
                    fill={Colors.black[800]}
                />} />


        </View>
    )
}

export default DialogHeader