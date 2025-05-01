import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Certificate from './item'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreateCertificateModal from './modals/create'
import { agentCertificateGet } from '@/src/data/network/services/agentCertificate'
import { IAgentCertificate } from '@/src/data/network/models/agentCertificate'

const Certificates = () => {
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [agentCertificates, setAgentCertificates] = useState<IAgentCertificate[]>([])




    const agentCertificateGetHandle = async () => {
        try {
            const result = await agentCertificateGet();
            setAgentCertificates(result.data);

        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        }
    }

    useEffect(() => {
        agentCertificateGetHandle()
    }, [])
    return (
        <View className='px-5 mb-14'>
            <Title
                onPressPlus={() => setCreateModal(true)}
                icon='plus'
                className='mb-5'
                title='Certificates' />
            <View className='gap-1'>
                {
                    agentCertificates.map((agentCertificate) =>
                        <Certificate
                            updated={agentCertificateGetHandle}
                            deleted={agentCertificateGetHandle}
                            agentCertificate={agentCertificate}
                            key={agentCertificate.id} />
                    )
                }
            </View>
            {
                createModal &&
                <CreateCertificateModal
                    onRequestClose={() => setCreateModal(false)}
                    show={createModal}
                    onPressClose={() => setCreateModal(false)}
                    updated={() => {
                        agentCertificateGetHandle()
                        setCreateModal(false)
                    }}
                />}
        </View>
    )
}

export default Certificates