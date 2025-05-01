import { View, Text } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import { getUser } from '@/src/data/network/services/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cookieName } from '@/src/data/local_storage/cookies'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { tokenState, userState } from '@/src/global_state/recoil/atoms/user'
import { StatusBar } from 'expo-status-bar';
import ConfirmtionModal from '../../modals/confirmation'
import { AlertDialogProvider } from '@/src/hooks/alert/confirmation'
import { router, usePathname, useRouter } from 'expo-router'
import { PortalHost } from '@rn-primitives/portal';
import * as SplashScreen from 'expo-splash-screen';





interface Props {
    children: React.ReactNode
    loaded: boolean
    error: Error | null
}

const Index: React.FC<Props> = ({ children, loaded, error }) => {
    const [user, setUser] = useRecoilState(userState);
    const setToken = useSetRecoilState(tokenState);
    const router = useRouter()
    const pathname = usePathname()
    const [loading, setLoading] = useState<boolean>(true);
    const [appIsReady, setAppIsReady] = useState<boolean>(false);


    const getUserHandle = async () => {
        try {
            setLoading(true)
            const token = await AsyncStorage.getItem(cookieName.token);
            setToken(token)
            if (token) {
                const result = await getUser();
                setUser(result.data);
            }

        } catch (e) {
            // Toast.show(getError(e));
        } finally {

            setLoading(false);


            setAppIsReady(true);
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

    // useEffect(() => {
    //     if (!loading) {
    //         SplashScreen.hideAsync();
    //     }
    // }, [loading]);


    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady) {
    //         await SplashScreen.hideAsync();
    //     }
    // }, [appIsReady]);

    // if (!appIsReady) {
    //     return null;
    // }
    return (
        <AlertDialogProvider>
            <View className='flex-1' >
                {children}
                <StatusBar style="dark" animated hideTransitionAnimation='fade' translucent />
            </View>
            <PortalHost />
        </AlertDialogProvider>
    )
}

export default Index