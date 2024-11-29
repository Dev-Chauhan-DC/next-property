import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import ArrowIcon from '../assets/svgs/ArrowIcon'
import IconBack from '../components/common/icon_back'
import { Colors } from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Link, useRouter } from 'expo-router'
import Input from '../components/input'
import Button from '../components/common/button/Button'
import TitleBar from '../components/common/title_bar'
import useLogout from '../hooks/useLogout'
import { useRecoilState } from 'recoil'
import { userState } from '../global_state/recoil/atoms/user'
import { getError } from '../utilities/halper_functions/service'
import { getUser, updateUser } from '../data/network/services/user'
import { IUpdateUser, IUser } from '../data/network/models/user'
import Toast from 'react-native-root-toast'

const ProfileInfoScreen = () => {
    const logout = useLogout();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const [user, setUser] = useRecoilState(userState);
    const [fName, setFName] = useState<string>('')
    const [lName, setLName] = useState<string>('')
    const [phone, setPhone] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [sNumber, setSNumber] = useState<string>('')
    const [aaNumber, setAaNumber] = useState<string>('')
    const [agency, setAgency] = useState<string>('')
    const [company, setCompany] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(false);




    const updateUserHandle = async (data: IUpdateUser) => {
        try {
            setLoading(true);
            await updateUser(data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }
    const getUserHandle = async () => {
        try {
            const result = await getUser();
            setUser(result.data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        }
    }

    const onPressUpdateHandle = async () => {
        await updateUserHandle({
            firstName: fName,
            lastName: lName,
            email: email,
            agencyName: agency,
            companyName: company,
            aadhaarNumber: aaNumber,
            secondaryNumber: sNumber
        })

        await getUserHandle();

    }








    useEffect(() => {

        if (user) {
            if (user.first_name) setFName(user.first_name);
            if (user.last_name) setLName(user.last_name);
            if (user.phone_number) setPhone(user.phone_number);
            if (user.email) setEmail(user.email);
            if (user.secondary_number) setSNumber(user.secondary_number);
            if (user.aadhaar_number) setAaNumber(user.aadhaar_number);
            if (user.agency_name) setAgency(user.agency_name);
            if (user.company_name) setCompany(user.company_name);

        }

    }, [])



    return (
        <View
            className='flex-1 bg-white'
            style={{
                paddingTop: insets.top,
            }}
        >
            <TitleBar title='Personal Information' />
            <View className='gap-4 px-[10px]'>

                <Input
                    onChangeText={(e) => setFName(e)}
                    value={fName}
                    placeholder='First Name'
                />
                <Input
                    onChangeText={(e) => setLName(e)}
                    value={lName}
                    placeholder='Last Name'
                />
                <Input
                    onChangeText={(e) => setPhone(e)}
                    value={phone}
                    placeholder='Phone'
                />
                <Input
                    onChangeText={(e) => setEmail(e)}
                    value={email}
                    placeholder='Email'
                />
                <Input
                    onChangeText={(e) => setSNumber(e)}
                    value={sNumber}
                    placeholder='Secondary Number'
                />
                <Input
                    onChangeText={(e) => setAaNumber(e)}
                    value={aaNumber}
                    placeholder='Aadhar Number'
                />
                <Input
                    onChangeText={(e) => setAgency(e)}
                    value={agency}
                    placeholder='Agency Name'
                />
                <Input
                    onChangeText={(e) => setCompany(e)}
                    value={company}
                    placeholder='Company Name'
                />
                <Button
                    loading={loading}
                    onPress={onPressUpdateHandle}
                    title='Update Information'
                />
                <Button
                    className='bg-red-500 '
                    onPress={() => logout()}
                    title='Delete Account'
                />
                <Text
                    onPress={() => logout()}
                    className='font-mMedium text-red-500 text-sm text-center'>Logout</Text>
            </View>


        </View>
    )
}

export default ProfileInfoScreen