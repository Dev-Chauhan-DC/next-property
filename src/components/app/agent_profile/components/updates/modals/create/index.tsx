import { View, Text, GestureResponderEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IBuilderUpdate } from '@/src/data/network/models/builderUpdate'
import { builderUpdateCreate, builderUpdateDelete, builderUpdateUpdate } from '@/src/data/network/services/builderUpdate'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import Dialog from '@/src/components/modals/dialog'
import DialogHeader from '@/src/components/modals/dialog/dialog_header'
import DialogFooter from '@/src/components/modals/dialog/dialog_footer'
import Input from '@/src/components/input'

interface Props {
    open: boolean
    onOpenChange?: (event: GestureResponderEvent) => void
    updated?: () => void
}


const BuilderUpdatesCreate: React.FC<Props> = ({ open, onOpenChange, updated }) => {
    const [formData, setFormData] = useState<IBuilderUpdate>({});
    const [loading, setLoading] = useState<boolean>(false);


    const builderUpdateCreateHandle = async (data: IBuilderUpdate) => {
        try {
            setLoading(true)
            await builderUpdateCreate(data)
            updated && updated()
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setLoading(false)

        }
    }


    return (
        <Dialog show={open} >
            <DialogHeader onPressClose={onOpenChange} title='Create Update Tag' />

            <View className='flex-1 px-6  overflow-auto flex flex-col gap-4 items-center w-full mt-3'>
                <Input
                    className='w-full'
                    onChangeText={(e) => setFormData({ ...formData, title: e })}
                    placeholder='Title'
                    value={formData.title || ''}
                />
                <Input
                    className='w-full'
                    onChangeText={(e) => setFormData({ ...formData, link: e })}
                    placeholder='Link'
                    value={formData.link || ''}
                />



            </View>
            <DialogFooter
                disabled={loading}
                loading={loading}
                onPress={async () => {
                    await builderUpdateCreateHandle(formData)
                }} />
        </Dialog>
    )
}

export default BuilderUpdatesCreate