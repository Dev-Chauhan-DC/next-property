import { View, Text, NativeSyntheticEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import { IBuilderCertificate } from '@/src/data/network/models/builderCertificate';
import Dialog from '@/src/components/modals/dialog';
import DialogHeader from '@/src/components/modals/dialog/dialog_header';
import DialogContent from '@/src/components/modals/dialog/dialog_content';
import DialogFooter from '@/src/components/modals/dialog/dialog_footer';
import { builderCertificateDelete, builderCertificateUpdate } from '@/src/data/network/services/builderCertificate';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import { createFileHandle } from '@/src/utilities/halper_functions/file/create_file';
import { gray200 } from '@/src/constants/Images';
import { Image } from 'expo-image'
import IconBack from '@/src/components/common/icon_back';
import EditIcon from '@/src/assets/svgs/EditIcon';
import { Colors } from '@/src/constants/Colors';
import Input from '@/src/components/input';


interface Props {
    show?: boolean;
    onPressClose?: () => void;
    updated?: () => void
    deleted?: () => void
    builderCertificate?: IBuilderCertificate
    onRequestClose?: ((event: NativeSyntheticEvent<any>) => void) | undefined


}

const UpdateCertificateModal: React.FC<Props> = ({ onRequestClose, deleted, onPressClose, show, updated, builderCertificate }) => {
    const [formData, setFormData] = React.useState<Partial<IBuilderCertificate>>({})
    const [avatar, setAvatar] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);
    const [avatarloading, setAvatarLoading] = useState<boolean>(false);

    const [deleteLoading, setDeleteLoading] = useState<boolean>(false);






    const builderTeamUpdateHandle = async (id: number, data: IBuilderCertificate) => {
        try {
            setLoading(true);
            const result = await builderCertificateUpdate(id, data);
            updated && updated();
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setLoading(false);
        }
    }


    const avatarChangeHandle = async () => {
        try {
            setAvatarLoading(true)

            const file = await createFileHandle();
            setFormData(e => ({ ...e, avatar: file.fileId.toString() }))
            setAvatar(file.url)

        } catch (error) {
            console.error(error);
            Toast.show(getError(error));
        } finally {
            setAvatarLoading(false)
        }
    };


    const builderCertificateDeleteHandle = async () => {
        try {
            if (!builderCertificate?.id) return
            setDeleteLoading(true)
            await builderCertificateDelete(builderCertificate?.id)
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setDeleteLoading(false)
        }
    }



    useEffect(() => {
        if (builderCertificate?.file) {
            setAvatar(builderCertificate?.file)
        }
        if (builderCertificate?.title) {
            setFormData(e => ({ ...e, title: builderCertificate.title }))
        }
        if (builderCertificate?.certificate_id) {
            setFormData(e => ({ ...e, certificate_id: builderCertificate.certificate_id }))
        }
    }, [builderCertificate])


    return (
        <Dialog show={show}
            onRequestClose={onRequestClose}
        >
            <DialogHeader
                onPressClose={onPressClose}
                title='Update Certificate'
            />
            <DialogContent>
                <View className='flex-1 overflow-auto flex flex-col gap-4 items-center w-full'>

                    <View className='relative w-[150px] h-[200px]'>

                        <Image
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'contain',
                                borderRadius: 5,
                            }}
                            source={avatar || gray200}
                        />

                        <IconBack
                            onPress={avatarChangeHandle}
                            className='absolute bottom-0 right-0 border border-gray-200'
                            icon={<EditIcon
                                width={12}
                                height={12}
                                fill={Colors.black[800]}
                            />}
                        />

                    </View>
                    <Input
                        className='w-full'
                        onChangeText={(e) => setFormData({ ...formData, title: e })}
                        placeholder='Title'
                        value={formData.title || ''}
                    />
                    <Input
                        className='w-full'
                        onChangeText={(e) => setFormData({ ...formData, certificate_id: e })}
                        placeholder='Certificate ID'
                        value={formData.certificate_id || ''}
                    />
                    <Text
                        onPress={async () => {

                            await builderCertificateDeleteHandle()
                            deleted && deleted()

                        }}
                        className='cursor-pointer w-full text-red-500 underline text-sm font-mMedium text-right'>Delete</Text>


                </View>
            </DialogContent>
            <DialogFooter
                loading={loading}
                onPress={async () => {
                    if (!builderCertificate?.id) return Toast.show('ID Not Found');
                    await builderCertificateUpdate(builderCertificate?.id, formData);
                }} />
        </Dialog>
    )
}

export default UpdateCertificateModal