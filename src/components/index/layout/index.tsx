import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import { getUser } from '@/src/data/network/services/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cookieName } from '@/src/data/local_storage/cookies'
import { useRecoilState } from 'recoil'
import { userState } from '@/src/global_state/recoil/atoms/user'
import { StatusBar } from 'expo-status-bar';
import ConfirmtionModal from '../../modals/confirmation'
import { AlertDialogProvider } from '@/src/hooks/alert/confirmation'
import { router, usePathname, useRouter } from 'expo-router'
import { PortalHost } from '@rn-primitives/portal';




interface Props {
    children: React.ReactNode
}

const Index: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useRecoilState(userState);
    const router = useRouter()
    const pathname = usePathname()


    const getUserHandle = async () => {
        try {
            const token = await AsyncStorage.getItem(cookieName.token);
            if (token) {
                const result = await getUser();
                setUser(result.data);
            }

        } catch (e) {
            // Toast.show(getError(e));
        }
    }

    useEffect(() => {
        if (user) {
            if (!(user.user_roles_id)) {
                if (pathname !== '/role')
                    router.push('/role')
            }
        }

    }, [pathname, user])


    useEffect(() => {
        getUserHandle()
    }, [])
    return (
        <AlertDialogProvider>
            <View className='flex-1'>
                {children}
                <StatusBar style="dark" animated hideTransitionAnimation='fade' translucent />
            </View>
            <PortalHost />
        </AlertDialogProvider>
    )
}

export default Index