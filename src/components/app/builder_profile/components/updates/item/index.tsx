import { View, Text, Pressable, Linking } from 'react-native'
import React, { useState } from 'react'
import YoutubeIcon from '@/src/assets/svgs/YoutubeIcon'
import { Colors } from '@/src/constants/Colors'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { IBuilderUpdate } from '@/src/data/network/models/builderUpdate'
import BuilderUpdatesUpdate from './modals/update'
import UD from '@/src/components/common/profile/update'

interface Props {
    builderUpdate: IBuilderUpdate
    updated?: () => void;
    deleted?: () => void;

}

const Update: React.FC<Props> = ({ builderUpdate, updated, deleted }) => {


    return (
        <View>

            <UD
                onPress={() => Linking.openURL(builderUpdate.link || '')}
                title={builderUpdate.title || ''}
            />


        </View>
    )
}

export default Update