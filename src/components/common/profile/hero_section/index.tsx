import React, { useState } from 'react'
import { GestureResponderEvent, View } from 'react-native'
import { Image } from 'expo-image'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { Colors } from '@/src/constants/Colors'
import { getError } from '@/src/utilities/halper_functions/service'
import { createFileHandle } from '@/src/utilities/halper_functions/file/create_file'
import { builderUpdate } from '@/src/data/network/services/builder'
import { IBuilder } from '@/src/data/network/models/builder'
import Toast from 'react-native-root-toast'


interface Props {
    sourceBg: string
    onPressEditBg?: (event: GestureResponderEvent) => void
    sourceAvatar?: string
    onPressEditAvatar?: (event: GestureResponderEvent) => void
}

const HeroSection: React.FC<Props> = ({ sourceBg, onPressEditBg, sourceAvatar, onPressEditAvatar }) => {


    return (
        <View>
            <View
                className='relative'
                style={{
                    aspectRatio: 402 / 139,
                    width: '100%',
                }}
            >
                <Image
                    style={{
                        aspectRatio: 402 / 139,
                        width: '100%',
                        objectFit: 'contain'
                    }}

                    source={sourceBg}
                />
                {onPressEditBg && <IconBack
                    onPress={onPressEditBg}
                    className='border border-gray-200 absolute m-4 right-0 top-0'
                    icon={<EditIcon
                        width={12}
                        height={12}
                        fill={Colors.black[800]}
                    />}
                />}

            </View>
            <View
                className='relative'
                style={{
                    width: 100,
                    height: 100,
                    marginTop: -50,
                    marginLeft: 20
                }}
            >
                <Image
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 200,
                    }}
                    source={sourceAvatar}
                />
                {
                    onPressEditAvatar && <IconBack
                        onPress={onPressEditAvatar}
                        className='border border-gray-200 absolute  right-0 bottom-0'
                        icon={<EditIcon
                            width={12}
                            height={12}
                            fill={Colors.black[800]}
                        />}
                    />
                }

            </View>
        </View>
    )
}

export default HeroSection