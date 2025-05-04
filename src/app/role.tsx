import { View, Text, Platform, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import TitleLayout from '../components/common/title_layout';
import SingleSelect from '../components/common/select/single_select';
import Button from '../components/common/button/Button';
import { getUser, updateRole, updateUserV2 } from '../data/network/services/user';
import { router } from 'expo-router';
import TitleBar from '../components/common/title_bar';
import { useRecoilState } from 'recoil';
import { userState } from '../global_state/recoil/atoms/user';
import Input from '../components/input';
import { Button as ButtonUI } from '../components/ui/button';
import { Text as TextUI } from '../components/ui/text';
import Toast from 'react-native-root-toast';
import { getError } from '../utilities/halper_functions/service';
const RoleScreen = () => {
    const insets = useSafeAreaInsets();
    const [role, setRole] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false)
    const [user, setUser] = useRecoilState(userState);
    const [name, setName] = useState<string>('')




    const getUserHandle = async () => {
        try {
            const result = await getUser();
            setUser(result.data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e))
        }
    }


    const updateRoleHandle = async (roleId: number) => {
        try {
            setLoading(true)
            await updateRole(roleId);
            await updateUserV2({ first_name: name })
            await getUserHandle();
            router.push('/(home)');
        } catch (e) {
            console.error(e)
            Toast.show(getError(e))
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {

        if (user?.user_roles_id) {
            setRole(user?.user_roles_id)
        }

        if (user?.first_name) {
            setName(user?.first_name)
        }

    }, [user])


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

            <View className='flex-1 gap-7'>
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

                <Input
                    placeholder='Please Enter Full Name'
                    value={name}
                    onChangeText={(e) => setName(e)}
                />

                <TitleLayout
                    title='Select Role'
                    className='mb-5'
                >
                    <SingleSelect
                        classNameItem='flex-1'
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
            <ButtonUI
                size='default'
                disabled={loading}
                onPress={() => updateRoleHandle(role)}

            >
                {
                    loading ? <ActivityIndicator size={'small'} color={'white'} /> : null
                }
                <TextUI>Let’s Start</TextUI>
            </ButtonUI>

        </View>
    )
}

export default RoleScreen