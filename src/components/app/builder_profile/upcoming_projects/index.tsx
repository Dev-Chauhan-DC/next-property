import { View, Text } from 'react-native'
import React from 'react'
import Title from '../title'
import PropertyCard from '../../(tabs)/(home)/list/PropertyCard'

const UpcomingProjects = () => {
    return (
        <View className='px-5 mb-14'>
            <Title
                classNameView='mb-5'
                title='Upcoming Projects'
                rightTitle='View All' />
            <PropertyCard />
        </View>
    )
}

export default UpcomingProjects