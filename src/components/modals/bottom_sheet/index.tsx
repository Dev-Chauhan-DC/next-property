import { View, Text, Modal, Pressable, GestureResponderEvent } from 'react-native'
import React from 'react'


interface Props {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
    onPressOutSide?: (event: GestureResponderEvent) => void;
}

const BottomSheet: React.FC<Props> = ({ children, visible, onPressOutSide }) => {
    return (
        <Modal
            animationType='slide'
            visible={visible}
            transparent={true}
        >
            <Pressable onPress={onPressOutSide} className='flex-1'>
                <View className='border-t border-t-gray-100 absolute bottom-0 left-0 gap-5 p-5 bg-white w-full rounded-t-[20px]'>
                    {children}
                </View>
            </Pressable>
        </Modal>
    )
}

export default BottomSheet