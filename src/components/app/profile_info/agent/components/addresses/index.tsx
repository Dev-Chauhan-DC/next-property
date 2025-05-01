import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Address from './item.tsx'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreateAddress from './modals/create'
import { agentAddressGet } from '@/src/data/network/services/agentAddress'
import { IAgentAddress } from '@/src/data/network/models/agentAddress'

const Addresses = () => {
    const [createAddressModal, setCreateAddressModal] = useState<boolean>(false);
    const [agentAddresses, setAgentAddresses] = useState<IAgentAddress[]>([])






    const agentAddressGetHandle = async () => {
        try {
            const result = await agentAddressGet();
            setAgentAddresses(result.data);

        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        }
    }

    useEffect(() => {
        agentAddressGetHandle()
    }, [])



    return (
        <View className='px-5 mb-14'>
            <Title
                onPressPlus={() => setCreateAddressModal(true)}
                icon='plus'
                className='mb-5'
                title='Addresses' />
            <View className=' gap-2 overflow-hidden'>
                {
                    agentAddresses.map((agentAddress) =>
                        <Address
                            updated={() => agentAddressGetHandle()}
                            deleted={() => agentAddressGetHandle()}
                            agentAddress={agentAddress}
                            key={agentAddress.id} />
                    )
                }
            </View>
            {
                createAddressModal &&
                <CreateAddress
                    onRequestClose={() => setCreateAddressModal(false)}

                    show={createAddressModal}
                    onOutsideClick={() => setCreateAddressModal(false)}
                    updated={() => {
                        agentAddressGetHandle()
                        setCreateAddressModal(false)
                    }}
                />}
        </View>
    )
}

export default Addresses