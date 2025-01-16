import { View, Text, GestureResponderEvent } from 'react-native'
import React, { useEffect } from 'react'
import { IBuilder } from '@/src/data/network/models/builder';
import { builderUpdate } from '@/src/data/network/services/builder';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import Dialog from '@/src/components/modals/dialog';
import DialogHeader from '@/src/components/modals/dialog/dialog_header';
import DialogContent from '@/src/components/modals/dialog/dialog_content';
import DialogFooter from '@/src/components/modals/dialog/dialog_footer';
import Input from '@/src/components/input';



interface Props {
    show?: boolean;
    builder?: IBuilder
    getBuilderHandle?: () => Promise<void>
    updated?: () => void
    onPressClose?: (event: GestureResponderEvent) => void

}

const UpdateAbout: React.FC<Props> = ({ onPressClose, show, builder, getBuilderHandle, updated }) => {

    const [formData, setFormData] = React.useState<Partial<IBuilder>>({})
    const [loading, setLoading] = React.useState<boolean>(false);


    const builderUpdateHandle = async (data: Partial<IBuilder>) => {
        try {
            await builderUpdate(data)
        } catch (error) {
            console.error(error);
            Toast.show(getError(error));
        }
    }

    useEffect(() => {
        if (builder?.about) {
            setFormData(prevValue => ({ ...prevValue, about: builder.about }))
        }
    }, [builder])



    return (
        <Dialog>
            <DialogHeader
                onPressClose={onPressClose}
                title='About'
            />
            <DialogContent>
                <View>
                    <Input
                        multiline
                        onChangeText={(e) => setFormData({ ...formData, about: e })}
                        placeholder='About'
                        value={formData.about || ''}
                    />
                </View>
            </DialogContent>
            <DialogFooter
                loading={loading}
                disabled={loading}
                onPress={async () => {
                    setLoading(true)
                    await builderUpdateHandle(formData)
                    getBuilderHandle && await getBuilderHandle()
                    setLoading(false)
                    updated && updated()
                }}
            />
        </Dialog>
    )
}

export default UpdateAbout