import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { router, Tabs } from 'expo-router'
import SearchIcon from '@/src/assets/svgs/SearchIcon'
import { Colors } from '@/src/constants/Colors'
import SearchActiveIcon from '@/src/assets/svgs/SearchActiveIcon'
import LikeIcon from '@/src/assets/svgs/LikeIcon'
import LikeActiveIcon from '@/src/assets/svgs/LikeActiveIcon'
import ProfileIcon from '@/src/assets/svgs/ProfileIcon'
import ProfileActiveIcon from '@/src/assets/svgs/ProfileActiveIcon'
import { useRecoilValue } from 'recoil'
import { userState } from '@/src/global_state/recoil/atoms/user'
import LoginIcon from '@/src/assets/svgs/LoginIcon'

const TabLayout = () => {
    const user = useRecoilValue(userState);
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false
            }}>
            <Tabs.Screen
                name="(home)"
                options={{
                    title: 'home',
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <SearchActiveIcon
                                width={20}
                                height={20}
                                fill={Colors.black[800]}
                            /> :
                            <SearchIcon
                                width={20}
                                height={20}
                                fill={Colors.black[800]}
                            />
                    ),
                }}

            />
            <Tabs.Screen
                name="(like)"
                options={{
                    title: 'like',
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <LikeActiveIcon
                                width={20}
                                height={20}
                                fill={Colors.black[800]}
                            /> :
                            <LikeIcon
                                width={20}
                                height={20}
                                fill={Colors.black[800]}
                            />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            onPress={() => {
                                if (user) {
                                    router.push('/(tabs)/(like)')
                                } else {
                                    router.push('/login')
                                }
                            }}
                        />
                    ),

                }} />
            <Tabs.Screen
                name="(profile)"
                options={{
                    title: 'Profile',
                    tabBarIcon: ({ focused }) => (
                        focused ?
                            <ProfileActiveIcon
                                width={20}
                                height={20}
                                fill={Colors.black[800]}
                            />
                            : !user ?
                                <LoginIcon
                                    width={20}
                                    height={20}
                                    fill={Colors.black[800]}
                                /> :
                                <ProfileIcon
                                    width={20}
                                    height={20}
                                    fill={Colors.black[800]}
                                />
                    ),
                    tabBarButton: (props) => (
                        <Pressable
                            {...props}
                            onPress={() => {
                                if (user) {
                                    router.push('/(tabs)/(profile)')
                                } else {
                                    router.push('/login')
                                }
                            }}
                        />
                    ),
                }} />
        </Tabs>
    )
}

export default TabLayout