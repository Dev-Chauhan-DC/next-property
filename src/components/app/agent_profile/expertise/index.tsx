import { View, Text } from 'react-native'
import React from 'react'
import Title from '../title'
import Badge from '@/src/components/common/badges/badge'

const Expertise = () => {
    return (
        <View className='px-5 mb-14'>
            <Title
                className='mb-5'
                title='Expertise' />
            <View className='flex-row gap-2 flex-wrap'>
                <Badge title='Residential' />
                <Badge title='Commercial' />
                <Badge title='Land' />
            </View>
        </View>
    )
}

export default Expertise