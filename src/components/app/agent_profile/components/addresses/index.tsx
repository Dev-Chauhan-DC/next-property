import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Address from './item.tsx'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreateAddress from './modals/create'
import { agentAddressGet } from '@/src/data/network/services/agentAddress'
import { IAgentAddress } from '@/src/data/network/models/agentAddress'


interface Props {
    agentAddresses?: IAgentAddress[]
}

const Addresses: React.FC<Props> = ({ agentAddresses }) => {




    return (
        <View className='px-5 mb-14'>
            <Title
                className='mb-5'
                title='Addresses' />
            <View className=' gap-2 overflow-hidden'>
                {
                    agentAddresses?.map((agentAddress) =>
                        <Address
                            agentAddress={agentAddress}
                            key={agentAddress.id} />
                    )
                }
            </View>

        </View>
    )
}

export default Addresses