import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Certificate from './item'
import { IBuilderCertificate } from '@/src/data/network/models/builderCertificate'
import { builderCertificateGet } from '@/src/data/network/services/builderCertificate'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreateCertificateModal from './modals/create'

const Certificates = () => {
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [builderCertificates, setBuilderCertificates] = useState<IBuilderCertificate[]>([])




    const builderCertificateGetHandle = async () => {
        try {
            const result = await builderCertificateGet();
            setBuilderCertificates(result.data);

        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        }
    }

    useEffect(() => {
        builderCertificateGetHandle()
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
                    builderCertificates.map((builderCertificate) =>
                        <Certificate
                            updated={builderCertificateGetHandle}
                            deleted={builderCertificateGetHandle}
                            builderCertificate={builderCertificate}
                            key={builderCertificate.id} />
                    )
                }
            </View>
            {
                createModal &&
                <CreateCertificateModal
                    show={createModal}
                    onPressClose={() => setCreateModal(false)}
                    onRequestClose={() => setCreateModal(false)}
                    updated={() => {
                        builderCertificateGetHandle()
                        setCreateModal(false)
                    }}
                />}
        </View>
    )
}

export default Certificates