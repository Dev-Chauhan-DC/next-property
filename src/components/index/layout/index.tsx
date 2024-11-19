import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import { getUser } from '@/src/data/network/services/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cookieName } from '@/src/data/local_storage/cookies'
import { useRecoilState } from 'recoil'
import { userState } from '@/src/global_state/recoil/atoms/user'


interface Props {
    children: React.ReactNode
}

const Index: React.FC<Props> = ({ children }) => {
    const [user, setUser] = useRecoilState(userState);


    const getUserHandle = async () => {
        try {
            const token = await AsyncStorage.getItem(cookieName.token);
            if (token) {
                const result = await getUser();
                setUser(result.data);
            }

        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        }
    }


    useEffect(() => {
        getUserHandle()
    }, [])
    return (
        <>{children}</>
    )
}

export default Index