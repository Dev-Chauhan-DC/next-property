import { View, Text, Pressable, Linking } from 'react-native'
import React, { useState } from 'react'
import VerifiedIcon from '@/src/assets/svgs/VerifiedIcon'
import { Colors } from '@/src/constants/Colors'
import Button from '@/src/components/common/button/Button'
import FacebookIcon from '@/src/assets/svgs/FacebookIcon'
import InstagramIcon from '@/src/assets/svgs/InstagramIcon'
import LinkedinIcon from '@/src/assets/svgs/LinkedinIcon'
import YoutubeIcon from '@/src/assets/svgs/YoutubeIcon'
import InfoIcon from '@/src/assets/svgs/InfoIcon'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import UpdateInfoModal from './modals/update_info'
import { IBuilder } from '@/src/data/network/models/builder'
import InfoProfile from '@/src/components/common/profile/info'


interface Props {
    builder?: IBuilder
    getBuilderHandle?: () => Promise<void>
}
const Info: React.FC<Props> = ({ builder, getBuilderHandle }) => {
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    return (
        <View>

            <InfoProfile
                name={builder?.name}
                onPressEdit={() => setUpdateModal(true)}
                employee_size={builder?.employee_size + ' ' + 'Employee'}
                facebook_link={builder?.facebook_link}
                instagram_link={builder?.instagram_link}
                linkedin_link={builder?.linkedin_link}
                youtube_link={builder?.youtube_link}
                website_link={builder?.website_link}
                founded={'Founded in 1940'}
            />
            {/* Modals */}
            {
                updateModal &&
                <UpdateInfoModal
                    onPressClose={() => setUpdateModal(false)}
                    show={updateModal}
                    builder={builder}
                    getBuilderHandle={getBuilderHandle}
                    updated={() => setUpdateModal(false)}
                />
            }

        </View>
    )
}

export default Info