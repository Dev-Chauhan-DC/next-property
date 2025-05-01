import { View, Text, NativeSyntheticEvent } from 'react-native'
import React, { useEffect, useState } from 'react'
import Dialog from '@/src/components/modals/dialog';
import DialogHeader from '@/src/components/modals/dialog/dialog_header';
import DialogContent from '@/src/components/modals/dialog/dialog_content';
import DialogFooter from '@/src/components/modals/dialog/dialog_footer';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import { createFileHandle } from '@/src/utilities/halper_functions/file/create_file';
import { gray200 } from '@/src/constants/Images';
import { Image } from 'expo-image'
import IconBack from '@/src/components/common/icon_back';
import EditIcon from '@/src/assets/svgs/EditIcon';
import { Colors } from '@/src/constants/Colors';
import Input from '@/src/components/input';
import { agentCertificateCreate } from '@/src/data/network/services/agentCertificate';
import { IAgentCertificate } from '@/src/data/network/models/agentCertificate';


interface Props {
    show?: boolean;
    onPressClose?: () => void;
    updated?: () => void
    onRequestClose?: ((event: NativeSyntheticEvent<any>) => void) | undefined


}

const CreateCertificateModal: React.FC<Props> = ({ onRequestClose, onPressClose, show, updated }) => {
    const [formData, setFormData] = React.useState<IAgentCertificate>({})
    const [certificate, setCertificate] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);




    const agentCertificateCreateHandle = async (data: IAgentCertificate) => {
        try {
            setLoading(true)
            await agentCertificateCreate(data)
            updated && updated()
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setLoading(false)

        }
    }


    const certificateChangeHandle = async () => {
        try {


            const file = await createFileHandle();
            setFormData(e => ({ ...e, file: file.fileId.toString() }))
            setCertificate(file.url)




        } catch (error) {
            console.error(error);
            Toast.show(getError(error));
        }
    };



    return (
        <Dialog show={show} onRequestClose={onRequestClose}>
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
                            source={certificate || gray200}
                        />

                        <IconBack
                            onPress={certificateChangeHandle}
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


                </View>
            </DialogContent>
            <DialogFooter
                onPress={async () => {

                    await agentCertificateCreateHandle(formData)

                }}
            />
        </Dialog>
    )
}

export default CreateCertificateModal