import { View, Text } from 'react-native'
import React, { useState } from 'react'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { Colors } from '@/src/constants/Colors'
import UpdateAddressModal from './modals/update'
import AD from '@/src/components/common/profile/address'
import { IAgentAddress } from '@/src/data/network/models/agentAddress'

interface Props {
    agentAddress: IAgentAddress
    updated?: () => void
    deleted?: () => void
}

const Address: React.FC<Props> = ({ agentAddress, updated, deleted }) => {
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    return (
        <View>
            <AD
                address={agentAddress.address}
                onPressEdit={() => setUpdateModal(true)}
                title={agentAddress.title}
            />
            {
                updateModal &&
                <UpdateAddressModal
                    deleted={deleted}
                    agentAddress={agentAddress}
                    show={updateModal}
                    onOutsideClick={() => setUpdateModal(false)}
                    updated={() => {
                        setUpdateModal(false)
                        updated && updated()
                    }}
                />}
        </View>
    )
}

export default Address