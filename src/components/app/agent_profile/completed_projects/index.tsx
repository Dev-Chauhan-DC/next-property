import { View, Text } from 'react-native'
import React from 'react'
import Title from '../title'
import PropertyCard from '../../(tabs)/(home)/list/PropertyCard'

const CompletedProjects = () => {
    return (
        <View className='px-5 mb-14'>
            <Title
                classNameView='mb-5'
                title='Completed Projects'
                rightTitle='View All' />
            <PropertyCard />
        </View>
    )
}

export default CompletedProjects