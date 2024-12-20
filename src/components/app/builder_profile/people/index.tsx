import { View, Text } from 'react-native'
import React from 'react'
import Title from '../title'
import Item from './item'

const People = () => {
    return (
        <View className='px-5 mb-14'>
            <Title
                className='mb-5'
                title='People' />
            <View className='gap-1'>
                <Item />
                <Item />
                <Item />
            </View>
        </View>
    )
}

export default People