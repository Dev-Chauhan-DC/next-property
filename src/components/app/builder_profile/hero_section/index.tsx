import React from 'react'
import { View } from 'react-native'
import { Image } from 'expo-image'

const HeroSection = () => {
    return (
        <View>
            <Image
                style={{
                    aspectRatio: 402 / 139,
                    width: '100%',
                    objectFit: 'contain'
                }}
                source={'https://picsum.photos/200/300?grayscale'}
            />
            <Image
                style={{
                    width: 100,
                    height: 100,
                    objectFit: 'contain',
                    borderRadius: 200,
                    marginTop: -50,
                    marginLeft: 20
                }}
                source={'https://picsum.photos/id/237/200/300'}
            />
        </View>
    )
}

export default HeroSection