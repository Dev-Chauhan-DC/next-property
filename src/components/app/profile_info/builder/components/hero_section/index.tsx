import React, { useState } from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { Colors } from '@/src/constants/Colors'
import { getError } from '@/src/utilities/halper_functions/service'
import { createFileHandle } from '@/src/utilities/halper_functions/file/create_file'
import { builderUpdate } from '@/src/data/network/services/builder'
import { IBuilder } from '@/src/data/network/models/builder'
import Toast from 'react-native-root-toast'
import HS from '@/src/components/common/profile/hero_section'
import { defaultBanner, gray200 } from '@/src/constants/Images'


interface Props {
    builder?: IBuilder
    getBuilderHandle?: () => Promise<void>
}

const HeroSection: React.FC<Props> = ({ builder, getBuilderHandle }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [avatarLoading, setAvatarLoading] = useState<boolean>(false);




    const updateBgHandle = async () => {
        try {
            setLoading(true)
            const { fileId, url } = await createFileHandle();
            await builderUpdate({ background: fileId.toString() })
            getBuilderHandle && getBuilderHandle()

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
            await builderUpdate({ avatar: fileId.toString() })
            getBuilderHandle && getBuilderHandle()

        } catch (error) {
            console.error(error)
            Toast.show(getError(error))
        } finally {
            setAvatarLoading(false)
        }
    }



    return (
        <HS
            sourceBg={builder?.background || defaultBanner}
            onPressEditBg={updateBgHandle}
            sourceAvatar={builder?.avatar || gray200}
            onPressEditAvatar={updateAvatarHandle}
        />
    )
}

export default HeroSection