import { View, Text } from 'react-native'
import React from 'react'
import MegniFineGlassIcon from '@/src/assets/svgs/MegniFineGlassIcon'



interface Props {
    title?: string
    text?: string
}

const NoData: React.FC<Props> = ({ title, text }) => {
    return (
        <View className='flex items-center py-10'>
            <MegniFineGlassIcon
                width={74}
                height={74}
                style={{
                    marginBottom: 40
                }}
            />
            <Text className='font-mBold text-xl text-black-800 mb-3'>{title ? title : "Oops! No Listings Found"}</Text>
            <Text className='font-mRegular text-xs text-black-800 text-center'>
                {text ? text : "Try searching in a different location or adjusting your filters to explore more options."}
            </Text>
        </View>
    )
}

export default NoData