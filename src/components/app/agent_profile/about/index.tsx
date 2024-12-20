import { View, Text } from 'react-native'
import React from 'react'
import Title from '../title'

const About = () => {
    return (
        <View className='px-5 py-3 bg-gray-100 mb-14'>
            <Title
                classNameView='mb-2.5'
                title='About' />
            <Text
                className='text-black-800 text-sm font-mRegular'
            >A problem isn't truly solved until it's solved for all. Googlers build products that help create opportunities for everyone, whether down the street or across the globe. Bring your insight, imagination and a healthy disregard for the impossible. Bring everything that makes you unique. Together, we can build for everyone.</Text>
        </View>
    )
}

export default About