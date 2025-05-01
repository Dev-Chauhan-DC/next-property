import { View, Text, GestureResponderEvent, NativeSyntheticEvent } from 'react-native'
import React, { useEffect } from 'react'
import Toast from 'react-native-root-toast';
import { getError } from '@/src/utilities/halper_functions/service';
import Dialog from '@/src/components/modals/dialog';
import DialogHeader from '@/src/components/modals/dialog/dialog_header';
import DialogContent from '@/src/components/modals/dialog/dialog_content';
import DialogFooter from '@/src/components/modals/dialog/dialog_footer';
import Input from '@/src/components/input';
import { IAgent } from '@/src/data/network/models/agent';
import { agentUpdate } from '@/src/data/network/services/agent';



interface Props {
    show?: boolean;
    agent?: IAgent
    getAgentHandle?: () => Promise<void>
    updated?: () => void
    onPressClose?: (event: GestureResponderEvent) => void
    onRequestClose?: ((event: NativeSyntheticEvent<any>) => void) | undefined

}

const UpdateAbout: React.FC<Props> = ({ onRequestClose, onPressClose, show, agent, getAgentHandle, updated }) => {

    const [formData, setFormData] = React.useState<Partial<IAgent>>({})
    const [loading, setLoading] = React.useState<boolean>(false);


    const agentUpdateHandle = async (data: Partial<IAgent>) => {
        try {
            await agentUpdate(data)
        } catch (error) {
            console.error(error);
            Toast.show(getError(error));
        }
    }

    useEffect(() => {
        if (agent?.about) {
            setFormData(prevValue => ({ ...prevValue, about: agent.about }))
        }
    }, [agent])



    return (
        <Dialog onRequestClose={onRequestClose}>
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
                    await agentUpdateHandle(formData)
                    getAgentHandle && await getAgentHandle()
                    setLoading(false)
                    updated && updated()
                }}
            />
        </Dialog>
    )
}

export default UpdateAbout