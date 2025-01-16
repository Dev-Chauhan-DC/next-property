import { View, Text, Modal } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Button from '../../common/button/Button'

const ConfirmtionModal = () => {
    const insets = useSafeAreaInsets()
    return (
        <Modal
            animationType='slide'
            transparent={true}
            visible={true}>
            <View
                style={{
                    paddingTop: insets.top,
                    paddingBottom: insets.bottom,
                    backgroundColor: '#000000b0',
                    paddingHorizontal: 20
                }}
                className='flex-1 flex-row flex items-center justify-center'>
                <View className='bg-white rounded p-6 flex-1'>
                    <Text className='text-lg font-semibold text-black-800'>Delete Item</Text>
                    <Text className='text-sm text-gray-400 dark:text-neutral-400 mb-4'>Are you sure you want to delete this item?</Text>
                    <View className='flex flex-row items-center justify-end gap-2'>
                        <Button size='sm' type='borderd' title='Cancel' />
                        <Button size='sm' title='Delete' />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default ConfirmtionModal