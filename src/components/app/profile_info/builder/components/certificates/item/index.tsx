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
    const [updateModal, setUpdateModal] = useState<boolean>(false);

    const handleCopyClick = () => {

        if (!(builderCertificate?.certificate_id)) return Toast.show('Failed to copy');

        navigator.clipboard.writeText(builderCertificate.certificate_id)
            .then(() => {
                Toast.show('Copied to clipboard');
            })
            .catch(err => {
                Toast.show('Failed to copy');
            });
    };

    return (
        <View >
            <CT
                certificate_id={builderCertificate.certificate_id}
                file={builderCertificate.file || ''}
                onPressEdit={() => setUpdateModal(true)}
                title={builderCertificate.title}
            />
            {
                updateModal &&
                <UpdateCertificateModal
                    deleted={() => {
                        deleted && deleted()
                        setUpdateModal(false)
                    }} builderCertificate={builderCertificate}
                    show={updateModal}
                    onPressClose={() => setUpdateModal(false)}
                    updated={() => {
                        updated && updated()
                        setUpdateModal(false)
                    }}
                />}

        </View>
    )
}

export default Certificate