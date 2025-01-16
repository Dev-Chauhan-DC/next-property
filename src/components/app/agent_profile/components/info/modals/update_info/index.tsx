import { View, Text, Modal, GestureResponderEvent, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import CloseIcon from '@/src/assets/svgs/CloseIcon';
import { Colors } from '@/src/constants/Colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Button from '@/src/components/common/button/Button';
import Dialog from '@/src/components/modals/dialog';
import DialogHeader from '@/src/components/modals/dialog/dialog_header';
import DialogContent from '@/src/components/modals/dialog/dialog_content';
import DialogFooter from '@/src/components/modals/dialog/dialog_footer';
import Input from '@/src/components/input';
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import { IAgent } from '@/src/data/network/models/agent';
import { agentUpdate } from '@/src/data/network/services/agent';

interface Props {
    show?: boolean;
    onOutsideClick?: () => void;
    agent?: IAgent
    getAgentHandle?: () => Promise<void>
    updated?: () => void
    onPressClose?: (event: GestureResponderEvent) => void
}




const UpdateInfoModal: React.FC<Props> = ({ onPressClose, show, onOutsideClick, agent, getAgentHandle, updated }) => {
    const [formData, setFormData] = React.useState<Partial<IAgent>>({})
    const [loading, setLoading] = React.useState<boolean>(false);
    const insets = useSafeAreaInsets()

    const agentUpdateHandle = async (data: Partial<IAgent>) => {
        try {
            setLoading(true)
            await agentUpdate(data)
        } catch (error) {
            console.error(error);
            Toast.show(getError(error));
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (agent?.name) {
            setFormData(prevValue => ({ ...prevValue, name: agent.name }))
        }
        if (agent?.employee_size) {
            setFormData(prevValue => ({ ...prevValue, employee_size: agent.employee_size }))
        }
        if (agent?.facebook_link) {
            setFormData(prevValue => ({ ...prevValue, facebook_link: agent.facebook_link }))
        }
        if (agent?.instagram_link) {
            setFormData(prevValue => ({ ...prevValue, instagram_link: agent.instagram_link }))
        }
        if (agent?.linkedin_link) {
            setFormData(prevValue => ({ ...prevValue, linkedin_link: agent.linkedin_link }))
        }
        if (agent?.youtube_link) {
            setFormData(prevValue => ({ ...prevValue, youtube_link: agent.youtube_link }))
        }
        if (agent?.website_link) {
            setFormData(prevValue => ({ ...prevValue, website_link: agent.website_link }))
        }
    }, [agent])


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
                    await agentUpdateHandle(formData)
                    getAgentHandle && await getAgentHandle()
                    setLoading(false)
                    updated && updated()
                }}
            />
        </Dialog>
    )
}

export default UpdateInfoModal