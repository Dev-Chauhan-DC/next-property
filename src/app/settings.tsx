import { View, ScrollView, Alert } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import TitleBar from '../components/common/title_bar'
import { Button } from '../components/ui/button'
import { LogOut } from 'lucide-react-native'
import { Colors } from '../constants/Colors'
import { Text } from '../components/ui/text'
import useLogout from '../hooks/useLogout'

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
            <TitleBar title='Settings' />
            <ScrollView className='flex-1 px-5'>
                <Button
                    onPress={onLogoutPress}
                    variant={'outline'}
                    className='flex flex-row gap-3'>
                    <LogOut
                        width={14}
                        height={14}
                        color={Colors.black[800]}
                    />
                    <Text>Logout</Text>
                </Button>
            </ScrollView>

        </View>
    )
}

export default settings