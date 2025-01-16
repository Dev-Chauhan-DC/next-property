import { View, Text, Platform } from 'react-native'
import React, { useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import TitleLayout from '../components/common/title_layout';
import SingleSelect from '../components/common/select/single_select';
import Button from '../components/common/button/Button';
import { getUser, updateRole } from '../data/network/services/user';
import { router } from 'expo-router';
import TitleBar from '../components/common/title_bar';
import { useRecoilState } from 'recoil';
import { userState } from '../global_state/recoil/atoms/user';

const RoleScreen = () => {
    const insets = useSafeAreaInsets();
    const [role, setRole] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useRecoilState(userState);



    const getUserHandle = async () => {
        try {
            const result = await getUser();
            setUser(result.data);
        } catch (e) {
            console.error(e);
        }
    }


    const updateRoleHandle = async (roleId: number) => {
        try {
            setLoading(true)
            await updateRole(roleId);
            await getUserHandle()
            router.push('/(home)')
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }


    return (
        <View
            className='bg-white flex-1 px-5 '
            style={{
                paddingTop: insets.top,
                paddingBottom: insets.bottom + (Platform.OS === 'android' ? 20 : 0),
            }}
        >
            <TitleBar
                title='Select Your Role'
                className='px-0 mb-10' />

            <View className='flex-1'>
                {/* <View className='flex flex-row justify-center'>
                    <Image
                        style={{
                            width: 100,
                            height: 34,
                            objectFit: 'contain',
                            marginBottom: 35
                        }}
                        source={require('../assets/images/nextProperty(full).png')} />
                </View> */}
                <TitleLayout
                    title='Select Role'
                    className='mb-5'
                >
                    <SingleSelect
                        classNameItem='p-auto py-1 px-5'
                        selected={role - 1}
                        onSelect={(index) => setRole(index + 1)}
                        list={[
                            { title: 'User' },
                            { title: 'Builder' },
                            { title: 'Agent' },
                        ]}
                    />
                </TitleLayout>
            </View>
            <Button
                size='sm'
                disabled={loading}
                loading={loading}
                onPress={() => updateRoleHandle(role)}
                title='Let’s Start'
                className='w-full bg-primary ' />

        </View>
    )
}

export default RoleScreen