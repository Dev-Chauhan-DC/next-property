import { View, Text, Pressable, Linking } from 'react-native'
import React, { useState } from 'react'
import { Image } from 'expo-image'
import FacebookIcon from '@/src/assets/svgs/FacebookIcon'
import { Colors } from '@/src/constants/Colors'
import LinkedinIcon from '@/src/assets/svgs/LinkedinIcon'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { IBuilderTeam } from '@/src/data/network/models/builderTeam'
import { gray200 } from '@/src/constants/Images'
import UpdatePeopleModal from './modals/update'
import People from '@/src/components/common/profile/people'



interface Props {
    builderTeam?: IBuilderTeam
    deleted?: () => void
    updated?: () => void
}

const Item: React.FC<Props> = ({ builderTeam, deleted, updated }) => {

    return (
        <View className=''>

            <People
                avatar={builderTeam?.avatar || gray200}
                name={builderTeam?.name}
                linkedin_link={builderTeam?.linkedin_link || ''}

            />


        </View>
    )
}

export default Item