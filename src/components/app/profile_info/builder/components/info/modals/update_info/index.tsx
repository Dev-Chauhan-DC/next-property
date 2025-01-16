import { View, Text, Modal, GestureResponderEvent, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { IBuilder } from '@/src/data/network/models/builder';
import CloseIcon from '@/src/assets/svgs/CloseIcon';
import { Colors } from '@/src/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@/src/components/common/button/Button';
import Dialog from '@/src/components/modals/dialog';
import DialogHeader from '@/src/components/modals/dialog/dialog_header';
import DialogContent from '@/src/components/modals/dialog/dialog_content';
import DialogFooter from '@/src/components/modals/dialog/dialog_footer';
import Input from '@/src/components/input';
import { builderUpdate } from '@/src/data/network/services/builder';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';

interface Props {
    show?: boolean;
    onOutsideClick?: () => void;
    builder?: IBuilder
    getBuilderHandle?: () => Promise<void>
    updated?: () => void
    onPressClose?: (event: GestureResponderEvent) => void
}




const UpdateInfoModal: React.FC<Props> = ({ onPressClose, show, onOutsideClick, builder, getBuilderHandle, updated }) => {
    const [formData, setFormData] = React.useState<Partial<IBuilder>>({})
    const [loading, setLoading] = React.useState<boolean>(false);
    const insets = useSafeAreaInsets()

    const builderUpdateHandle = async (data: Partial<IBuilder>) => {
        try {
            setLoading(true)
            await builderUpdate(data)
        } catch (error) {
            console.error(error);
            Toast.show(getError(error));
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (builder?.name) {
            setFormData(prevValue => ({ ...prevValue, name: builder.name }))
        }
        if (builder?.employee_size) {
            setFormData(prevValue => ({ ...prevValue, employee_size: builder.employee_size }))
        }
        if (builder?.facebook_link) {
            setFormData(prevValue => ({ ...prevValue, facebook_link: builder.facebook_link }))
        }
        if (builder?.instagram_link) {
            setFormData(prevValue => ({ ...prevValue, instagram_link: builder.instagram_link }))
        }
        if (builder?.linkedin_link) {
            setFormData(prevValue => ({ ...prevValue, linkedin_link: builder.linkedin_link }))
        }
        if (builder?.youtube_link) {
            setFormData(prevValue => ({ ...prevValue, youtube_link: builder.youtube_link }))
        }
        if (builder?.website_link) {
            setFormData(prevValue => ({ ...prevValue, website_link: builder.website_link }))
        }
    }, [builder])


    return (
        <Dialog show={show}>
            <DialogHeader
                onPressClose={onPressClose}
                title='Edit Info' />
            <DialogContent>
                <ScrollView>
                    <View className='flex flex-col gap-4'>
                        <Input
                            onChangeText={(e) => setFormData({ ...formData, name: e })}
                            placeholder='Enter your name'
                            value={formData.name || ''}
                        />
                        <Input
                            keyboardType='numeric'
                            placeholder='Employee Size'
                            onChangeText={(e) => setFormData({ ...formData, employee_size: e })}
                            value={formData.employee_size as string}
                        />
                        <Input
                            placeholder='Website URL'
                            onChangeText={(e) => setFormData({ ...formData, website_link: e })}
                            value={formData.website_link || ''}
                        />
                        <Input
                            placeholder='Facebook URL'
                            onChangeText={(e) => setFormData({ ...formData, facebook_link: e })}
                            value={formData.facebook_link || ''}
                        />
                        <Input
                            placeholder='Instagram URL'
                            onChangeText={(e) => setFormData({ ...formData, instagram_link: e })}
                            value={formData.instagram_link || ''}
                        />
                        <Input
                            placeholder='Linkedin URL'
                            onChangeText={(e) => setFormData({ ...formData, linkedin_link: e })}
                            value={formData.linkedin_link || ''}
                        />
                        <Input
                            placeholder='Youtube URL'
                            onChangeText={(e) => setFormData({ ...formData, youtube_link: e })}
                            value={formData.youtube_link || ''}
                        />
                    </View>
                </ScrollView>
            </DialogContent>
            <DialogFooter
                disabled={loading}
                loading={loading}
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

export default UpdateInfoModal