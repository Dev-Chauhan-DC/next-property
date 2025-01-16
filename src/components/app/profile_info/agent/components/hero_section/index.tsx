import React, { useState } from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { Colors } from '@/src/constants/Colors'
import { getError } from '@/src/utilities/halper_functions/service'
import { createFileHandle } from '@/src/utilities/halper_functions/file/create_file'
import Toast from 'react-native-root-toast'
import HS from '@/src/components/common/profile/hero_section'
import { IAgent } from '@/src/data/network/models/agent'
import { agentUpdate } from '@/src/data/network/services/agent'
import { defaultBanner, gray200 } from '@/src/constants/Images'


interface Props {
    agent?: IAgent
    getAgentHandle?: () => Promise<void>
}

const HeroSection: React.FC<Props> = ({ agent, getAgentHandle }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [avatarLoading, setAvatarLoading] = useState<boolean>(false);




    const updateBgHandle = async () => {
        try {
            setLoading(true)
            const { fileId, url } = await createFileHandle();
            await agentUpdate({ background: fileId.toString() })
            getAgentHandle && getAgentHandle()

        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setLoading(false)
        }
    }
    const updateAvatarHandle = async () => {
        try {
            setAvatarLoading(true)
            const { fileId, url } = await createFileHandle();
            await agentUpdate({ avatar: fileId.toString() })
            getAgentHandle && getAgentHandle()

        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setAvatarLoading(false)
        }
    }



    return (
        <HS
            sourceBg={agent?.background || defaultBanner}
            onPressEditBg={updateBgHandle}
            sourceAvatar={agent?.avatar || gray200}
            onPressEditAvatar={updateAvatarHandle}
        />
    )
}

export default HeroSection