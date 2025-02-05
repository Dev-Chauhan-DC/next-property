import { View, Text } from 'react-native'
import React, { useState } from 'react'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { Colors } from '@/src/constants/Colors'
import { IBuilderAddress } from '@/src/data/network/models/builderAddress'
import UpdateAddressModal from './modals/update'
import AD from '@/src/components/common/profile/address'

interface Props {
    builderAddress: IBuilderAddress
    updated?: () => void
    deleted?: () => void
}

const Address: React.FC<Props> = ({ builderAddress, updated, deleted }) => {
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    return (
        <View>
            <AD
                address={builderAddress.address}
                onPressEdit={() => setUpdateModal(true)}
                title={builderAddress.title}
            />
            {
                updateModal &&
                <UpdateAddressModal
                    deleted={deleted}
                    builderAddress={builderAddress}
                    show={updateModal}
                    onOutsideClick={() => setUpdateModal(false)}
                    onRequestClose={() => setUpdateModal(false)}
                    updated={() => {
                        setUpdateModal(false)
                        updated && updated()
                    }}
                />}
        </View>
    )
}

export default Address