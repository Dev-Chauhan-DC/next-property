import { View, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TitleBar from '../components/common/title_bar'
import { Button } from '../components/ui/button'
import { Headset, LogOut, Mail, MessageCircleIcon } from 'lucide-react-native'
import { Colors } from '../constants/Colors'
import { Text } from '../components/ui/text'
import useLogout from '../hooks/useLogout'
import { router } from 'expo-router'
import * as Linking from 'expo-linking';


const settings = () => {
    const insets = useSafeAreaInsets();
    const logout = useLogout();



    const onLogoutPress = () => {
        Alert.alert('Are you sure', 'Do you want to Logout?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            {
                text: 'Logout',
                onPress: () => {
                    logout()
                }
            }
        ])
    }
    return (
        <View
            className='flex-1 bg-white'
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom,
            }}
        >
            <TitleBar title='More' />
            <View className='flex-1 p-2.5'>

                <View className='flex-1'>
                    <Button
                        onPress={() => router.push('/(chat)/user')}
                        variant={'secondary'}
                    >
                        <MessageCircleIcon
                            width={14}
                            height={14}
                            color={Colors.black[800]}
                        />
                        <Text>Chats</Text>
                    </Button>
                </View>
                <View className='flex gap-3'>

                    <Button
                        onPress={() => {
                            Linking.openURL(`tel:7863891121`)

                        }}
                        variant={'secondary'}
                    >
                        <Headset
                            width={14}
                            height={14}
                            color={Colors.black[800]}
                        />
                        <Text>+91 7863-8911-21</Text>
                    </Button>
                    <Button
                        onPress={() => {
                            Linking.openURL(`mailto:company@nexsyys.com`)

                        }}
                        variant={'secondary'}
                    >
                        <Mail
                            width={14}
                            height={14}
                            color={Colors.black[800]}
                        />
                        <Text>company@nexsyys.com</Text>
                    </Button>
                    <Button
                        onPress={onLogoutPress}
                        variant={'outlineDestructive'}
                        className='flex flex-row gap-3'>
                        <LogOut
                            width={14}
                            height={14}
                            color={Colors.red[500]}
                        />
                        <Text>Logout</Text>
                    </Button>
                </View>

            </View>

        </View>
    )
}

export default settings