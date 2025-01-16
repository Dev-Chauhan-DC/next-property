import { View, Text, GestureResponderEvent } from 'react-native'
import React from 'react'
import Button from '@/src/components/common/button/Button'



interface Props {
    title?: string
    disabled?: boolean
    loading?: boolean
    onPress?: (event: GestureResponderEvent) => void
}
const DialogFooter: React.FC<Props> = ({ loading, disabled, onPress, title = "Save Changes" }) => {
    return (
        <View className='px-5'>
            <Button
                loading={loading}
                disabled={disabled}
                onPress={onPress}
                title={title}
            />
        </View>
    )
}

export default DialogFooter