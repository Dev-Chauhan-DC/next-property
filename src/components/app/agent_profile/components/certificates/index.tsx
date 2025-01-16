import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Certificate from './item'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreateCertificateModal from './modals/create'
import { agentCertificateGet } from '@/src/data/network/services/agentCertificate'
import { IAgentCertificate } from '@/src/data/network/models/agentCertificate'



interface Props {
    agentCertificates?: IAgentCertificate[]
}

const Certificates: React.FC<Props> = ({ agentCertificates }) => {



    return (
        <View className='px-5 mb-14'>
            <Title
                className='mb-5'
                title='Certificates' />
            <View className='gap-1'>
                {
                    agentCertificates?.map((agentCertificate) =>
                        <Certificate
                            agentCertificate={agentCertificate}
                            key={agentCertificate.id} />
                    )
                }
            </View>
        </View>
    )
}

export default Certificates