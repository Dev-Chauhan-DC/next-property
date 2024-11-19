import { View, Text, ScrollView, Pressable } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'expo-image'
import ArrowIcon from '../assets/svgs/ArrowIcon'
import { Colors } from '../constants/Colors'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import IconBack from '../components/common/icon_back'
import LikeIcon from '../assets/svgs/LikeIcon'
import { propMetaClassName } from '../components/app/(tabs)/(home)/list/PropertyCard'
import IconBox from '../components/common/icon_box'
import IconTitle from '../components/common/icon_title'
import Button from '../components/common/button/Button'
import { useLocalSearchParams, useRouter } from 'expo-router'
import SellIcon from '../assets/svgs/SellIcon'
import PlotAreaIcon from '../assets/svgs/PlotAreaIcon'
import BuiltUpAreaIcon from '../assets/svgs/BuiltUpAreaIcon'
import CarpetAreaIcon from '../assets/svgs/CarpetAreaIcon'
import CalenderCheckIcon from '../assets/svgs/CalenderCheckIcon'
import ParkingIcon from '../assets/svgs/ParkingIcon'
import BikeParkingIcon from '../assets/svgs/BikeParkingIcon'
import CornerIcon from '../assets/svgs/CornerIcon'
import NegotiableIcon from '../assets/svgs/NegotiableIcon'
import TenantIcon from '../assets/svgs/TenantIcon'
import FurnishIcon from '../assets/svgs/FurnishIcon'
import FacingIcon from '../assets/svgs/FacingIcon'
import FlooringIcon from '../assets/svgs/FlooringIcon'
import TimerIcon from '../assets/svgs/TimerIcon'
import MaintenanceIcon from '../assets/svgs/MaintenanceIcon'
import OwnershipIcon from '../assets/svgs/OwnershipIcon'
import PowerBackupIcon from '../assets/svgs/PowerBackupIcon'
import WaterSupplyIcon from '../assets/svgs/WaterSupplyIcon'
import KitchenIcon from '../assets/svgs/KitchenIcon'
import CupboardIcon from '../assets/svgs/CupboardIcon'
import CalenderIcon from '../assets/svgs/CalenderIcon'
import KeyIcon from '../assets/svgs/KeyIcon'
import { getError } from '../utilities/halper_functions/service'
import { getProperty } from '../data/network/services/property'
import { IGetPropertyParams, IProperty } from '../data/network/models/property'
import { calculateDaysAgo } from '../utilities/halper_functions/text'
import { amenities } from '../constants/app/Property'
import { useRecoilValue } from 'recoil'
import { userState } from '../global_state/recoil/atoms/user'
import { getUserByID } from '../data/network/services/user'
import { IUser } from '../data/network/models/user'
import Toast from 'react-native-root-toast'
import { saveProperty } from '../data/network/services/saveProperty'
import LikeActiveIcon from '../assets/svgs/LikeActiveIcon'

const PropertyInformationScreen = () => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [getUserLoading, setGetUserLoading] = useState<boolean>(false);
    const [property, setProperty] = useState<IProperty | null>(null);
    const user = useRecoilValue(userState);
    const [owner, setOwner] = useState<IUser | null>(null);
    const [saveLoading, setSaveLoading] = useState(false);
    const [like, setLike] = useState<boolean>(false);



    const className = {
        infoView: 'w-[50%] p-2'
    }

    const getPropertyHandle = async (propertyId: number, queryParams: IGetPropertyParams) => {
        try {
            setLoading(true)
            const result = await getProperty(propertyId, queryParams);
            setProperty(result.data);

        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false);
        }
    }

    const getUserByIDHandle = async (id: number) => {
        try {
            setGetUserLoading(true);
            const result = await getUserByID(id);
            setOwner(result.data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setGetUserLoading(false)
        }
    }

    const onPressGetNumberHandle = async () => {

        if (!user) return router.push('/login');
        if (property?.user_id && !owner) {
            await getUserByIDHandle(property.user_id)
        }

    }

    const savePropertyHandle = async (propertyId: number) => {
        try {

            if (!user) {
                return router.push('/login');
            }
            setSaveLoading(true);



            const result = await saveProperty(propertyId);
            if (result.data == 1) {
                setLike(false);
                Toast.show('Property Removed Successfully')
            } else {
                setLike(true)
                Toast.show('Property Saved Successfully')
            }





        } catch (e) {
            console.error(e);
            Toast.show(getError(e))
        } finally {
            setSaveLoading(false);
        }
    }


    useEffect(() => {
        if (id) {
            getPropertyHandle(parseInt(id as string), { view: 'full' })
        }
    }, [id])

    useEffect(() => {
        setLike(property?.saved_properties?.length ? true : false)
    }, [property])



    return (
        <ScrollView showsVerticalScrollIndicator={false} className='bg-white'>
            <View className='relative'>
                <Image
                    style={{
                        width: '100%',
                        aspectRatio: 271 / 178,
                    }}
                    placeholder={'wefwef'}
                    source={property?.property_photos?.[0].photos}
                    contentFit="cover"
                    transition={1000}
                />
                <IconBack
                    onPress={() => router.back()}
                    style={{
                        marginTop: insets.top,
                    }}
                    className='mx-5 absolute top-0 left-0 '
                    icon={<ArrowIcon
                        width={11}
                        height={11}
                        fill={Colors.black[800]}
                    />}
                />
                <IconBack
                    onPress={() => property?.id && savePropertyHandle(property?.id)}
                    style={{
                        marginTop: insets.top,
                    }}
                    className='mx-5 absolute top-0 right-0 '
                    icon={
                        like ? <LikeActiveIcon
                            width={11}
                            height={11}
                            fill={Colors.black[800]}
                        /> : <LikeIcon

                            width={11}
                            height={11}
                            fill={Colors.black[800]}
                        />}
                />

            </View>
            <View className='flex gap-[5px] px-3.5 pt-[18px]'>
                <Text className='font-mSemiBold text-black-800 text-base '>₹{property?.price?.toLocaleString('en-IN')}</Text>
                <View className='flex flex-row gap-1'>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{property?.bedroom_count?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>bd</Text>
                        <Text className={propMetaClassName.line}>|</Text>
                    </View>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{property?.bathroom_count?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>ba</Text>
                        <Text className={propMetaClassName.line}>|</Text>
                    </View>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{property?.hall_count?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>hall</Text>
                        <Text className={propMetaClassName.line}>|</Text>
                    </View>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{property?.kitchen_count?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>kitchen</Text>
                        <Text className={propMetaClassName.line}>|</Text>
                    </View>
                    <View className={propMetaClassName.container}>
                        <Text className={propMetaClassName.number}>{property?.built_up_area?.toLocaleString('en-IN')}</Text>
                        <Text className={propMetaClassName.label}>sqft</Text>
                        {/* <Text className={propMetaClassName.line}>|</Text> */}
                    </View>
                </View>
                <Text className='text-sm font-mRegular text-gray-400 capitalize'>{property?.address}</Text>
                <Text className='text-xs font-mBold text-gray-400'>Listed by {property?.user?.user_role?.role || 'NP User'}</Text>
            </View>
            <View className='flex flex-row flex-wrap px-2 pt-9 mb-9'>
                {property?.purpose?.purpose ? <View className={className.infoView}><IconBox icon={<SellIcon />} title={property.purpose.purpose} subTitle='purpose' /></View> : null}
                {property?.plot_area ? <View className={className.infoView}><IconBox icon={<PlotAreaIcon />} title={`${property.plot_area.toLocaleString('en-IN')} sq ft`} subTitle='plot area' /></View> : null}
                {property?.built_up_area ? <View className={className.infoView}><IconBox icon={<BuiltUpAreaIcon />} title={`${property.built_up_area.toLocaleString('en-IN')} sq ft`} subTitle="built up area" /></View> : null}
                {property?.carpet_area ? <View className={className.infoView}><IconBox icon={<CarpetAreaIcon />} title={`${property.carpet_area.toLocaleString('en-IN')} sq ft`} subTitle="carpet area" /></View> : null}
                {property?.availability_type?.availability_type ? <View className={className.infoView}><IconBox icon={<CalenderCheckIcon />} title={property.availability_type.availability_type} subTitle="Availability" /></View> : null}
                {property?.parking_slot_four_wheeler_count ? <View className={className.infoView}><IconBox icon={<ParkingIcon />} title={`${property.parking_slot_four_wheeler_count} Car`} subTitle="Parking Slot" /></View> : null}
                {property?.parking_slot_two_wheeler_count ? <View className={className.infoView}><IconBox icon={<BikeParkingIcon />} title={`${property.parking_slot_two_wheeler_count} Bike`} subTitle="Parking Slot" /></View> : null}
                {property?.corner_property ? <View className={className.infoView}><IconBox icon={<CornerIcon />} title={property.corner_property ? "Yes" : "No"} subTitle="Corner Property" /></View> : null}
                {property?.negotiable ? <View className={className.infoView}><IconBox icon={<NegotiableIcon />} title={property.negotiable ? "Yes" : "No"} subTitle="Negotiable" /></View> : null}
                {property?.tenant?.tenant ? <View className={className.infoView}><IconBox icon={<TenantIcon />} title={property.tenant.tenant} subTitle="Tenant" /></View> : null}
                {property?.furnishing?.furnishing ? <View className={className.infoView}><IconBox icon={<FurnishIcon />} title={property.furnishing.furnishing} subTitle="Furnishing" /></View> : null}
                {property?.facing?.facing ? <View className={className.infoView}><IconBox icon={<FacingIcon />} title={property.facing.facing} subTitle="Facing" /></View> : null}
                {property?.flooring_type?.flooring_type ? <View className={className.infoView}><IconBox icon={<FlooringIcon />} title={property.flooring_type.flooring_type} subTitle="Flooring" /></View> : null}
                {property?.property_age ? <View className={className.infoView}><IconBox icon={<TimerIcon />} title={`${property.property_age} Years`} subTitle="Property Age" /></View> : null}
                {property?.maintenance ? <View className={className.infoView}><IconBox icon={<MaintenanceIcon />} title={'₹' + property.maintenance.toLocaleString('en-IN')} subTitle="Maintenance" /></View> : null}
                {property?.ownership_type?.ownership_type ? <View className={className.infoView}><IconBox icon={<OwnershipIcon />} title={property?.ownership_type?.ownership_type} subTitle="Ownership Type" /></View> : null}
                {property?.power_backup?.power_backup ? <View className={className.infoView}><IconBox icon={<PowerBackupIcon />} title={property?.power_backup?.power_backup} subTitle="Power Backup" /></View> : null}
                {property?.water_supply?.water_supply ? <View className={className.infoView}><IconBox icon={<WaterSupplyIcon />} title={property?.water_supply?.water_supply} subTitle="Water Supply" /></View> : null}
                {property?.kitchen_type?.kitchen_type ? <View className={className.infoView}><IconBox icon={<KitchenIcon />} title={property?.kitchen_type?.kitchen_type} subTitle="Kitchen Type" /></View> : null}
                {property?.cupboard ? <View className={className.infoView}><IconBox icon={<CupboardIcon />} title={property?.cupboard.toString()} subTitle="Cupboards" /></View> : null}
                {property?.createdAt ? <View className={className.infoView}><IconBox icon={<CalenderIcon />} title={calculateDaysAgo(property.createdAt).toString()} /></View> : null}
                {property?.possession?.possession ? <View className={className.infoView}><IconBox icon={<KeyIcon />} title={property.possession.possession} subTitle="Possession" /></View> : null}
            </View>

            {/* </View> */}
            <View className='px-3.5 mb-9'>
                <Text className='font-mSemiBold text-base text-black-800 mb-6'>Amenities</Text>
                <View className='gap-4'>
                    {
                        property?.property_amenities?.map((item, index) => {

                            if (item?.amenity?.amenitie) {
                                return (<IconTitle
                                    key={index}
                                    title={item?.amenity?.amenitie}
                                    icon={amenities.find(i => i.title === item.amenity?.amenitie)?.icon}
                                />)
                            }


                        }
                        )
                    }


                </View>
            </View>
            <View className='px-3.5 mb-9'>
                <Text className='font-mSemiBold text-base text-black-800 mb-6'>Description</Text>
                <Text
                    className='text-xs font-mRegular text-black-800'
                >{property?.property_description} </Text>
            </View>
            <View className='px-3.5 mb-9'>
                <Button
                    loading={getUserLoading}
                    onPress={onPressGetNumberHandle}
                    title={owner?.phone_number ? owner?.phone_number : 'Get a Number'} />
            </View>
        </ScrollView>
    )
}

export default PropertyInformationScreen