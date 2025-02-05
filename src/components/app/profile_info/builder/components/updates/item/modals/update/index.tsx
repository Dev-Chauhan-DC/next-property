import { View, Text, GestureResponderEvent, NativeSyntheticEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IBuilderUpdate } from '@/src/data/network/models/builderUpdate'
import { builderUpdateDelete, builderUpdateUpdate } from '@/src/data/network/services/builderUpdate'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import Dialog from '@/src/components/modals/dialog'
import DialogHeader from '@/src/components/modals/dialog/dialog_header'
import DialogFooter from '@/src/components/modals/dialog/dialog_footer'
import Input from '@/src/components/input'

interface Props {
    builderUpdate: IBuilderUpdate
    open: boolean
    onOpenChange?: (event: GestureResponderEvent) => void
    updated?: () => void
    deleted?: () => void
    onRequestClose?: (event: NativeSyntheticEvent<any>) => void

}

const BuilderUpdatesUpdate: React.FC<Props> = ({ builderUpdate, open, onOpenChange, updated, deleted, onRequestClose }) => {
    const [formData, setFormData] = useState<IBuilderUpdate>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);




    const builderUpdateUpdateHandle = async (id: number, data: IBuilderUpdate) => {
        try {
            setLoading(true)
            builderUpdateUpdate(id, data)
            updated && updated()
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setLoading(false)

        }
    }

    const builderUpdateDeleteHandle = async () => {
        try {
            if (!builderUpdate?.id) return
            setDeleteLoading(true)
            await builderUpdateDelete(builderUpdate?.id)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setDeleteLoading(false)
        }
    }



    useEffect(() => {

        if (builderUpdate.link) {
            setFormData(e => ({ ...e, link: builderUpdate.link }))
        }
        if (builderUpdate.title) {
            setFormData(e => ({ ...e, title: builderUpdate.title }))
        }

    }, [builderUpdate])






    return (
        <Dialog show={open} onRequestClose={onRequestClose}>
            <DialogHeader onPressClose={onOpenChange} title='Edit Tag' />

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
                <Text
                    onPress={async () => {

                        await builderUpdateDeleteHandle()
                        deleted && deleted()

                    }}
                    className='cursor-pointer w-full text-red-500 underline text-sm font-mMedium text-right'>Delete</Text>


            </View>
            <DialogFooter
                loading={loading}
                onPress={async () => {
                    if (!builderUpdate.id) return;
                    await builderUpdateUpdateHandle(builderUpdate.id, formData)
                }} />
        </Dialog>
    )
}

export default BuilderUpdatesUpdate