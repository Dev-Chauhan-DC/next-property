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
import InfoProfile from '@/src/components/common/profile/info'
import { IAgent } from '@/src/data/network/models/agent'


interface Props {
    agent?: IAgent
    getAgentHandle?: () => Promise<void>
}
const Info: React.FC<Props> = ({ agent, getAgentHandle }) => {
    const [updateModal, setUpdateModal] = useState<boolean>(false);
    return (
        <View>

            <InfoProfile
                name={agent?.name}
                onPressEdit={() => setUpdateModal(true)}
                employee_size={agent?.employee_size + ' ' + 'Employee'}
                facebook_link={agent?.facebook_link}
                instagram_link={agent?.instagram_link}
                linkedin_link={agent?.linkedin_link}
                youtube_link={agent?.youtube_link}
                website_link={agent?.website_link}
                founded={'Founded in 1940'}
            />
            {/* Modals */}
            {
                updateModal &&
                <UpdateInfoModal
                    onPressClose={() => setUpdateModal(false)}
                    show={updateModal}
                    agent={agent}
                    getAgentHandle={getAgentHandle}
                    updated={() => setUpdateModal(false)}
                />
            }

        </View>
    )
}

export default Info