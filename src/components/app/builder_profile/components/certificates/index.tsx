import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Certificate from './item'
import { IBuilderCertificate } from '@/src/data/network/models/builderCertificate'
import { builderCertificateGet } from '@/src/data/network/services/builderCertificate'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreateCertificateModal from './modals/create'


interface Props {
    builderCertificates?: IBuilderCertificate[]
}

const Certificates: React.FC<Props> = ({ builderCertificates }) => {



    return (
        <View className='px-5 mb-14'>
            <Title
                icon='plus'
                className='mb-5'
                title='Certificates' />
            <View className='gap-1'>
                {
                    builderCertificates && builderCertificates.map((builderCertificate) =>
                        <Certificate
                            builderCertificate={builderCertificate}
                            key={builderCertificate.id} />
                    )
                }
            </View>

        </View>
    )
}

export default Certificates