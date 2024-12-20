import { View, Text } from 'react-native'
import React from 'react'
import YoutubeIcon from '@/src/assets/svgs/YoutubeIcon'
import { Colors } from '@/src/constants/Colors'

interface Props {
    title?: string
}

const Item: React.FC<Props> = ({ title }) => {

    if (!title) {
        return null
    }

    return (
        <View className='bg-gray-100 flex-row items-center gap-1.5 h-8 rounded-full px-3 text-wrap'>
            <YoutubeIcon
                width={14}
                height={14}
                fill={Colors.gray[400]}
            />

            <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                className='text-xs font-mRegular text-gray-400 underline'>{title}</Text>

        </View>
    )
}

export default Item