import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TitleBar from '../components/common/title_bar';
import { Image } from 'expo-image';
import IconBox from '../components/common/icon_box';
import { useLocalSearchParams } from 'expo-router';
import { getPropertiesByIds } from '../data/network/services/property';
import { IProperty } from '../data/network/models/property';
import Toast from 'react-native-root-toast';
import { getError } from '../utilities/halper_functions/service';
import SellIcon from '../assets/svgs/SellIcon';
import PlotAreaIcon from '../assets/svgs/PlotAreaIcon';
import BuiltUpAreaIcon from '../assets/svgs/BuiltUpAreaIcon';
import CarpetAreaIcon from '../assets/svgs/CarpetAreaIcon';
import CalenderCheckIcon from '../assets/svgs/CalenderCheckIcon';
import ParkingIcon from '../assets/svgs/ParkingIcon';
import BikeParkingIcon from '../assets/svgs/BikeParkingIcon';
import CornerIcon from '../assets/svgs/CornerIcon';
import NegotiableIcon from '../assets/svgs/NegotiableIcon';
import KeyIcon from '../assets/svgs/KeyIcon';
import CalenderIcon from '../assets/svgs/CalenderIcon';
import { calculateDaysAgo } from '../utilities/halper_functions/text';
import CupboardIcon from '../assets/svgs/CupboardIcon';
import KitchenIcon from '../assets/svgs/KitchenIcon';
import WaterSupplyIcon from '../assets/svgs/WaterSupplyIcon';
import PowerBackupIcon from '../assets/svgs/PowerBackupIcon';
import OwnershipIcon from '../assets/svgs/OwnershipIcon';
import MaintenanceIcon from '../assets/svgs/MaintenanceIcon';
import TimerIcon from '../assets/svgs/TimerIcon';
import FlooringIcon from '../assets/svgs/FlooringIcon';
import FacingIcon from '../assets/svgs/FacingIcon';
import FurnishIcon from '../assets/svgs/FurnishIcon';
import TenantIcon from '../assets/svgs/TenantIcon';
import LoadingScreen from '../components/common/loading/loading_screen';

const CompareScreen = () => {
    const insets = useSafeAreaInsets();
    const { ids } = useLocalSearchParams();
    const [loading, setLoading] = useState<boolean>(false);
    const [properties, setProperties] = useState<IProperty[]>();



    const comparePropertyHandle = async (params: { ids: number[]; }) => {
        try {
            setLoading(true)
            const result = await getPropertiesByIds(params);
            setProperties(result.data);
        } catch (e) {
            console.error(e);
            Toast.show(getError(e));
        } finally {
            setLoading(false)
        }
    }



    useEffect(() => {

        if (typeof ids === 'string') {
            comparePropertyHandle({ ids: ids.split(',').map(e => parseInt(e)) })
        }

    }, [ids])


    if (loading) {
        return (
            <LoadingScreen />
        )
    }


    return (
        <View
            style={{
                paddingTop: insets.top
            }}
            className='flex-1 bg-white'>
            <TitleBar
                title='Compare'
            />
            <ScrollView showsVerticalScrollIndicator={false} className='px-[10px]'>
                <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                    <View className='flex flex-row gap-3'>
                        {
                            properties?.map((property, index) =>
                                <View
                                    key={index}
                                    className='items-start gap-3'>
                                    <Image

                                        style={{
                                            aspectRatio: 155 / 102,
                                            width: 155,
                                            borderRadius: 10
                                        }}
                                        source={property?.property_photos?.[0]?.photos}
                                    />
                                    <IconBox
                                        className='w-[155px]'
                                        title={'₹' + property?.price?.toLocaleString('en-IN') || ''}
                                        subTitle='Price'
                                    />
                                    <IconBox
                                        className='w-[155px]'
                                        title={property?.bedroom_count?.toLocaleString('en-IN') || ''}
                                        subTitle='bedroom'
                                    />
                                    <IconBox
                                        className='w-[155px]'
                                        title={property?.bathroom_count?.toLocaleString('en-IN') || ''}
                                        subTitle='bathroom'
                                    />
                                    <IconBox
                                        className='w-[155px]'
                                        title={property?.hall_count?.toLocaleString('en-IN') || ''}
                                        subTitle='hall'
                                    />
                                    <IconBox
                                        className='w-[155px]'
                                        title={property?.kitchen_count?.toLocaleString('en-IN') || ''}
                                        subTitle='kitchen'
                                    />
                                    <IconBox
                                        className='w-[155px]'
                                        title={property?.balcony_count?.toLocaleString('en-IN') || ''}
                                        subTitle='balcony'
                                    />
                                    {property?.purpose?.purpose ? <IconBox className='w-[155px]' icon={<SellIcon />} title={property.purpose.purpose} subTitle='purpose' /> : null}
                                    {property?.plot_area ? <IconBox className='w-[155px]' icon={<PlotAreaIcon />} title={`${property.plot_area.toLocaleString('en-IN')} sq ft`} subTitle='plot area' /> : null}
                                    {property?.built_up_area ? <IconBox className='w-[155px]' icon={<BuiltUpAreaIcon />} title={`${property.built_up_area.toLocaleString('en-IN')} sq ft`} subTitle="built up area" /> : null}
                                    {property?.carpet_area ? <IconBox className='w-[155px]' icon={<CarpetAreaIcon />} title={`${property.carpet_area.toLocaleString('en-IN')} sq ft`} subTitle="carpet area" /> : null}
                                    {property?.availability_type?.availability_type ? <IconBox className='w-[155px]' icon={<CalenderCheckIcon />} title={property.availability_type.availability_type} subTitle="Availability" /> : null}
                                    {property?.parking_slot_four_wheeler_count ? <IconBox className='w-[155px]' icon={<ParkingIcon />} title={`${property.parking_slot_four_wheeler_count} Car`} subTitle="Parking Slot" /> : null}
                                    {property?.parking_slot_two_wheeler_count ? <IconBox className='w-[155px]' icon={<BikeParkingIcon />} title={`${property.parking_slot_two_wheeler_count} Bike`} subTitle="Parking Slot" /> : null}
                                    {property?.corner_property ? <IconBox className='w-[155px]' icon={<CornerIcon />} title={property.corner_property ? "Yes" : "No"} subTitle="Corner Property" /> : null}
                                    {property?.negotiable ? <IconBox className='w-[155px]' icon={<NegotiableIcon />} title={property.negotiable ? "Yes" : "No"} subTitle="Negotiable" /> : null}
                                    {property?.tenant?.tenant ? <IconBox className='w-[155px]' icon={<TenantIcon />} title={property.tenant.tenant} subTitle="Tenant" /> : null}
                                    {property?.furnishing?.furnishing ? <IconBox className='w-[155px]' icon={<FurnishIcon />} title={property.furnishing.furnishing} subTitle="Furnishing" /> : null}
                                    {property?.facing?.facing ? <IconBox className='w-[155px]' icon={<FacingIcon />} title={property.facing.facing} subTitle="Facing" /> : null}
                                    {property?.flooring_type?.flooring_type ? <IconBox className='w-[155px]' icon={<FlooringIcon />} title={property.flooring_type.flooring_type} subTitle="Flooring" /> : null}
                                    {property?.property_age ? <IconBox className='w-[155px]' icon={<TimerIcon />} title={`${property.property_age} Years`} subTitle="Property Age" /> : null}
                                    {property?.maintenance ? <IconBox className='w-[155px]' icon={<MaintenanceIcon />} title={'₹' + property.maintenance.toLocaleString('en-IN')} subTitle="Maintenance" /> : null}
                                    {property?.ownership_type?.ownership_type ? <IconBox className='w-[155px]' icon={<OwnershipIcon />} title={property?.ownership_type?.ownership_type} subTitle="Ownership Type" /> : null}
                                    {property?.power_backup?.power_backup ? <IconBox className='w-[155px]' icon={<PowerBackupIcon />} title={property?.power_backup?.power_backup} subTitle="Power Backup" /> : null}
                                    {property?.water_supply?.water_supply ? <IconBox className='w-[155px]' icon={<WaterSupplyIcon />} title={property?.water_supply?.water_supply} subTitle="Water Supply" /> : null}
                                    {property?.kitchen_type?.kitchen_type ? <IconBox className='w-[155px]' icon={<KitchenIcon />} title={property?.kitchen_type?.kitchen_type} subTitle="Kitchen Type" /> : null}
                                    {property?.cupboard ? <IconBox className='w-[155px]' icon={<CupboardIcon />} title={property?.cupboard.toString()} subTitle="Cupboards" /> : null}
                                    {property?.createdAt ? <IconBox className='w-[155px]' icon={<CalenderIcon />} title={calculateDaysAgo(property.createdAt).toString()} /> : null}
                                    {property?.possession?.possession ? <IconBox className='w-[155px]' icon={<KeyIcon />} title={property.possession.possession} subTitle="Possession" /> : null}


                                </View>
                            )
                        }

                    </View>
                </ScrollView>
            </ScrollView>
        </View>
    )
}

export default CompareScreen