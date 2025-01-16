import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Address from './item.tsx'
import { IBuilderAddress } from '@/src/data/network/models/builderAddress'
import { builderAddressGet } from '@/src/data/network/services/builderAddress'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreateAddress from './modals/create'

const Addresses = () => {
    const [createAddressModal, setCreateAddressModal] = useState<boolean>(false);
    const [builderAddresses, setBuilderAddresses] = useState<IBuilderAddress[]>([])






    const builderAddressGetHandle = async () => {
        try {
            const result = await builderAddressGet();
            setBuilderAddresses(result.data);

        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        }
    }

    useEffect(() => {
        builderAddressGetHandle()
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
                    builderAddresses.map((builderAddress) =>
                        <Address
                            updated={() => builderAddressGetHandle()}
                            deleted={() => builderAddressGetHandle()}
                            builderAddress={builderAddress}
                            key={builderAddress.id} />
                    )
                }
            </View>
            {
                createAddressModal &&
                <CreateAddress
                    show={createAddressModal}
                    onOutsideClick={() => setCreateAddressModal(false)}
                    updated={() => {
                        builderAddressGetHandle()
                        setCreateAddressModal(false)
                    }}
                />}
        </View>
    )
}

export default Addresses