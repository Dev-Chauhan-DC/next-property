import { useSetRecoilState } from 'recoil'
import { userState } from '../global_state/recoil/atoms/user'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { cookieName } from '../data/local_storage/cookies'
import { router } from 'expo-router'

const useLogout = () => {
    const setUser = useSetRecoilState(userState);

    const logout = async () => {
        await AsyncStorage.removeItem(cookieName.token);
        setUser(null);
        router.push('/');
    }

    return logout
}

export default useLogout