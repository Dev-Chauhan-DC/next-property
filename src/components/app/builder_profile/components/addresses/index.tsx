import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Address from './item.tsx'
import { IBuilderAddress } from '@/src/data/network/models/builderAddress'
import { builderAddressGet } from '@/src/data/network/services/builderAddress'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreateAddress from './modals/create'


interface Props {
    builderAddresses?: IBuilderAddress[]
}

const Addresses: React.FC<Props> = ({ builderAddresses }) => {




    return (
        <View className='px-5 mb-14'>
            <Title
                icon='plus'
                className='mb-5'
                title='Addresses' />
            <View className=' gap-2 overflow-hidden'>
                {
                    builderAddresses && builderAddresses.map((builderAddress) =>
                        <Address

                            builderAddress={builderAddress}
                            key={builderAddress.id} />
                    )
                }
            </View>

        </View>
    )
}

export default Addresses