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
}

const Address: React.FC<Props> = ({ agentAddress }) => {
    return (
        <View>
            <AD
                address={agentAddress.address}
                title={agentAddress.title}
            />
        </View>
    )
}

export default Address