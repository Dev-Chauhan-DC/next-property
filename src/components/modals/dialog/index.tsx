import { View, Text, Modal, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


interface Props {
    show?: boolean
    children?: React.ReactNode
    animationType?: "none" | "slide" | "fade"
}

const Dialog: React.FC<Props> = ({ show, children, animationType = 'slide' }) => {
    const insets = useSafeAreaInsets()
    return (
        <Modal animationType={animationType} visible={show} className='bg-white'>
            <View
                style={{
                    paddingBottom: insets.bottom + (Platform.OS === 'android' ? 20 : 0),
                    paddingTop: Platform.OS === 'android' ? 0 : insets.top,
                    flex: 1
                }}
            >
                {children}
            </View>
        </Modal>
    )
}

export default Dialog