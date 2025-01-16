import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import CopyIcon from '@/src/assets/svgs/CopyIcon'
import { Colors } from '@/src/constants/Colors'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { IBuilderCertificate } from '@/src/data/network/models/builderCertificate'
import UpdateCertificateModal from './modals/update'
import Toast from 'react-native-root-toast'
import CT from '@/src/components/common/profile/certificate'


interface Props {
    builderCertificate: IBuilderCertificate
    updated?: () => void;
    deleted?: () => void;
}

const Certificate: React.FC<Props> = ({ deleted, builderCertificate, updated }) => {


    return (
        <View >
            <CT
                certificate_id={builderCertificate.certificate_id}
                file={builderCertificate.file || ''}
                title={builderCertificate.title}
            />


        </View>
    )
}

export default Certificate