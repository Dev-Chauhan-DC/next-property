import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ListingLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name='first' />
            <Stack.Screen name='second' />
            <Stack.Screen name='third' />
            <Stack.Screen name='fourth' />
            <Stack.Screen name='fifth' />
        </Stack>
    )
}

export default ListingLayout