import React from 'react'
import { Stack } from 'expo-router'
import Header from '@/src/components/app/(tabs)/(home)/header'





const HomeLayout = () => {
    return (
        <Stack screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="list" />
        </Stack>
    )
}

export default HomeLayout