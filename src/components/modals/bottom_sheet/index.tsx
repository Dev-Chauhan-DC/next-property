import { View, Text, Modal, Pressable, GestureResponderEvent, NativeSyntheticEvent } from 'react-native'
import React from 'react'


interface Props {
    children: React.ReactNode;
    className?: string;
    visible?: boolean;
    onPressOutSide?: (event: GestureResponderEvent) => void;
    onRequestClose?: ((event: NativeSyntheticEvent<any>) => void) | undefined
}

const BottomSheet: React.FC<Props> = ({ onRequestClose, children, visible, onPressOutSide }) => {
    return (
        <Modal
            onRequestClose={onRequestClose}
            animationType='slide'
            visible={visible}
            transparent={true}
        >
            <Pressable onPress={onPressOutSide} className='flex-1 '>
                <View className=' absolute bottom-0 left-0 bg-white w-full rounded-t-[20px]'>
                    {children}
                </View>
            </Pressable>
        </Modal>
    )
}

export default BottomSheet