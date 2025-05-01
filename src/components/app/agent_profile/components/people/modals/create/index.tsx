import { View, Text, NativeSyntheticEvent } from 'react-native'
import React, { useState } from 'react'
import { IBuilderTeam } from '@/src/data/network/models/builderTeam'
import { builderTeamCreate } from '@/src/data/network/services/builderTeam'
import { getError } from '@/src/utilities/halper_functions/service'
import Toast from 'react-native-root-toast'
import { createFileHandle } from '@/src/utilities/halper_functions/file/create_file'
import Dialog from '@/src/components/modals/dialog'
import DialogHeader from '@/src/components/modals/dialog/dialog_header'
import DialogContent from '@/src/components/modals/dialog/dialog_content'
import DialogFooter from '@/src/components/modals/dialog/dialog_footer'
import { Image } from 'expo-image'
import IconBack from '@/src/components/common/icon_back'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import EditIcon from '@/src/assets/svgs/EditIcon'
import Input from '@/src/components/input'
import { gray200 } from '@/src/constants/Images'


interface Props {
    show?: boolean;
    onPressClose?: () => void;
    updated?: () => void
    onRequestClose?: ((event: NativeSyntheticEvent<any>) => void) | undefined
}


const CreatePeopleModal: React.FC<Props> = ({ onRequestClose, onPressClose, show, updated }) => {
    const [formData, setFormData] = React.useState<Partial<IBuilderTeam>>({})
    const [avatar, setAvatar] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);




    const builderTeamCreateHandle = async (data: Partial<IBuilderTeam>) => {
        try {
            const result = await builderTeamCreate(data);
        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        }
    }


    const avatarChangeHandle = async () => {
        try {
            const file = await createFileHandle();
            if (file.fileId && file.url) {
                setFormData(e => ({ ...e, avatar: file.fileId.toString() }))
                setAvatar(file.url)
            }


        } catch (error) {
            console.error(error);
            Toast.show(getError(error));
        }
    };



    return (
        <Dialog onRequestClose={onRequestClose}>
            <DialogHeader
                title='Add Role'
                onPressClose={onPressClose}
            />
            <DialogContent>
                <View className='flex-1 flex flex-col gap-4 items-center w-full '>

                    <View className='relative  w-24 h-24 '>
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: 'contain',
                                borderRadius: 200,
                            }}
                            source={avatar || gray200}

                        />
                        <IconBack
                            onPress={avatarChangeHandle}
                            className='border border-gray-200 absolute bottom-0 right-0 m-0 p-0'
                            icon={<EditIcon
                                width={12}
                                height={12}
                                fill={Colors.black[800]}
                            />}
                        />


                    </View>
                    <Input
                        className='w-full'
                        onChangeText={(e) => setFormData({ ...formData, name: e })}
                        placeholder='Enter your name'
                        value={formData.name || ''}
                    />
                    <Input
                        className='w-full'
                        onChangeText={(e) => setFormData({ ...formData, linkedin_link: e })}
                        placeholder='Linkedin URL'
                        value={formData.linkedin_link || ''}
                    />
                    <Input
                        className='w-full'
                        // onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder='Select Position'
                    // value={formData.name || ''}
                    />

                </View>
            </DialogContent>
            <DialogFooter
                onPress={async () => {
                    setLoading(true)
                    await builderTeamCreateHandle(formData)
                    setLoading(false)
                    updated && updated()
                }}
            />
        </Dialog>
    )
}

export default CreatePeopleModal