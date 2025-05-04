import { View, Text, ScrollView, Image, Linking, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Input from '../components/input';
import Button from '../components/common/button/Button';
import TitleBar from '../components/common/title_bar';
import Toast from 'react-native-root-toast';
import { sendOtp, verifyOtp } from '../data/network/services/auth';
import { getError } from '../utilities/halper_functions/service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AsyncStorageKey } from '../constants/AsyncStorageKeys';
import { router } from 'expo-router';
import { useRecoilState } from 'recoil';
import { userState } from '../global_state/recoil/atoms/user';
import { Button as ButtonUI } from '../components/ui/button';
import { Text as TextUI } from '../components/ui/text';

const login = () => {
    const insets = useSafeAreaInsets();
    const [phone, setPhone] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [showOtp, setShowOtp] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [user, setUser] = useRecoilState(userState);



    const sendOtpHandle = async () => {
        try {
            setLoading(true);
            await sendOtp({ phone });
            Toast.show('Otp Sent Successfully');
            setShowOtp(true);
        } catch (e: any) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }

    const verifyOtpHandle = async () => {
        try {
            setLoading(true);
            const result = await verifyOtp({ phone, otp });
            setUser(result.data.dataValues);
            await AsyncStorage.setItem(AsyncStorageKey.token, result.data.token);
            router.back();
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }




    return (
        <View
            className='bg-white flex-1'
            style={{
                paddingTop: insets.top
            }}
        >
            <View className='flex px-[10px]'>
                <TitleBar />
                <View className='flex items-center'>
                    <Image
                        style={{
                            width: 100,
                            height: 34,
                            objectFit: 'contain',
                            marginBottom: 35
                        }}
                        source={require('../assets/images/nextProperty(full).png')} />
                </View>
                <View className='gap-3 w-full'>
                    <Input
                        keyboardType='phone-pad'
                        onChangeText={(e) => setPhone(e)}
                        className='w-full'
                        placeholder='Phone Number' />
                    {
                        showOtp ?
                            <Input
                                keyboardType='numeric'
                                value={otp}
                                onChangeText={(e) => setOtp(e)}
                                className='w-full'
                                placeholder='Enter OTP' /> :
                            null
                    }
                    <ButtonUI
                        disabled={loading}
                        onPress={showOtp ? verifyOtpHandle : sendOtpHandle}
                        className='w-full '
                    >
                        {
                            loading ? <ActivityIndicator size={'small'} color={'white'} /> : null
                        }
                        <TextUI>Send OTP</TextUI>
                    </ButtonUI>
                </View>
                <Text className='text-sm text-black-800 font-mRegular mt-[52px] text-center'>
                    By continuing, you agree to the
                    <Text
                        onPress={() => Linking.openURL('https://real-estate-properties.s3.us-east-2.amazonaws.com/REM/TermsofService_REM_.html')}
                        className='text-primary'> Terms of Services </Text>
                    and
                    <Text
                        onPress={() => Linking.openURL('https://real-estate-properties.s3.us-east-2.amazonaws.com/REM/Privacypolicy_REM_.html')}
                        className='text-primary'> Privacy Policy </Text>
                </Text>
            </View>



        </View>
    )
}

export default login