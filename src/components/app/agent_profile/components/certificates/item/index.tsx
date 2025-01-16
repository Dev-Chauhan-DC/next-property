import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import CopyIcon from '@/src/assets/svgs/CopyIcon'
import { Colors } from '@/src/constants/Colors'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import UpdateCertificateModal from './modals/update'
import Toast from 'react-native-root-toast'
import CT from '@/src/components/common/profile/certificate'
import { IAgentCertificate } from '@/src/data/network/models/agentCertificate'


interface Props {
    agentCertificate: IAgentCertificate
}

const Certificate: React.FC<Props> = ({ agentCertificate }) => {


    return (
        <View >
            <CT
                certificate_id={agentCertificate.certificate_id}
                file={agentCertificate.file || ''}
                title={agentCertificate.title}
            />
        </View>
    )
}

export default Certificate