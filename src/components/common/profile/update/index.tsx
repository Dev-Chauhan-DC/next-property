import { View, Text, Pressable, Linking, GestureResponderEvent } from 'react-native'
import React, { useState } from 'react'
import YoutubeIcon from '@/src/assets/svgs/YoutubeIcon'
import { Colors } from '@/src/constants/Colors'
import IconBack from '@/src/components/common/icon_back'
import EditIcon from '@/src/assets/svgs/EditIcon'
import { IBuilderUpdate } from '@/src/data/network/models/builderUpdate'

interface Props {
    onPress?: (event: GestureResponderEvent) => void
    onPressEdit?: (event: GestureResponderEvent) => void
    title?: string
}

const Update: React.FC<Props> = ({ onPress, title, onPressEdit }) => {


    return (
        <Pressable
            onPress={onPress}
            className='bg-gray-100 flex-row items-start gap-1.5 rounded'>


            <Text
                className='text-xs font-mRegular text-gray-400 underline py-2 px-3 flex-1'>{title}</Text>
            {
                onPressEdit && <IconBack
                    onPress={onPressEdit}
                    className='border border-gray-200 m-2'
                    icon={<EditIcon
                        width={12}
                        height={12}
                        fill={Colors.black[800]}
                    />}
                />
            }



        </Pressable>
    )
}

export default Update