import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toggle from '../components/common/toggle';
import TitleLayout from '../components/common/title_layout';
import MultipleSelect from '../components/common/select/multiple_select';
import ArrowIcon from '../assets/svgs/ArrowIcon';
import TitleBar from '../components/common/title_bar';
import Input from '../components/input';
import Checkbox from '../components/common/checkbox';
import Button from '../components/common/button/Button';
import { useRecoilState } from 'recoil';
import { filterAtom, fltAtom, onFilterApplyClickAtom } from '../global_state/recoil/atoms/search';
import { IFilters } from '../utilities/interfaces/search';
import { availability, balcony, bathroom, bedroom, ElementEnum, elementManagement, facing, furnishing, hall, houseType, HouseTypeEnum, IElementManagement, kitchen, parkingSlotFourWheel, parkingSlotTwoWheel, possesion, roles, tenants } from '../constants/app/Property';
import { router } from 'expo-router';
import { Button as ButtonUI } from '@/src/components/ui/button'
import { Text as TextUI } from '@/src/components/ui/text'
import { twMerge } from 'tailwind-merge';
import { useFocusEffect } from '@react-navigation/native';
import MultipleSelectV2 from '../components/common/select/multiple_select_v2';
import ToggleV2 from '../components/common/toggleV2';








export const numberSelectClass = 'w-14 h-14 p-0'
export const textSelectClass = 'text-lg'


const FilterScreen = () => {
    const insets = useSafeAreaInsets();
    const [corner, setCorner] = useState<boolean>(false);
    const [submitHeight, setSubmitHeight] = useState<number>(0);
    const [filter, setFilter] = useRecoilState(filterAtom);
    const [onFilterApplyClick, setOnFilterApplyClick] = useRecoilState(onFilterApplyClickAtom);
    const [eleManager, setEleManager] = useState<IElementManagement>(HouseTypeEnum.Apartment)
    const [flt, setFlt] = useState<IFilters>({ purposeId: 1 });


    const [homeTypeId, setHomeTypeId] = useState<number[]>([]);
    const [userRoleId, setUserRoleId] = useState<number[]>([]);
    const [availabilityTypeId, setAvailabilityTypeId] = useState<number[]>([]);
    const [furnishingsId, setFurnishingsId] = useState<number[]>([]);
    const [facingId, setFacingId] = useState<number[]>([]);
    const [possessionsId, setPossessionsId] = useState<number[]>([]);
    const [tenantsId, setTenantsId] = useState<number[]>([]);
    const [bedroomCount, setBedroomCount] = useState<number[]>([]);
    const [bathroomCount, setBathroomCount] = useState<number[]>([]);
    const [hallCount, setHallCount] = useState<number[]>([]);
    const [kitchenCount, setKitchenCount] = useState<number[]>([]);
    const [balconyCount, setBalconyCount] = useState<number[]>([]);
    const [purposeId, setPurposeId] = useState<number>(0);



    // 
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    // 
    const [minBuilt, setMinBuilt] = useState('');
    const [maxBuilt, setMaxBuilt] = useState('');
    //   
    const [minMainT, setMinMainT] = useState('');
    const [maxMainT, setMaxMainT] = useState('');
    //   
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    //   
    const [minDay, setMinDay] = useState('');
    const [maxDay, setMaxDay] = useState('');
    //   
    const [minFloor, setMinFloor] = useState('');
    const [maxFloor, setMaxFloor] = useState('');
    //   
    const [minPFloor, setMinPFloor] = useState('');
    const [maxPFloor, setMaxPFloor] = useState('');


    const deleteKey = (key: keyof IFilters) => {
        setFlt((prevState) => {
            let obj = { ...prevState };
            delete obj[key];
            return obj;
        })
    }


    // Generalized function to handle min-max range updates for any range type
    const handleRangeChange = (
        minValue: string,
        maxValue: string,
        minSetter: React.Dispatch<React.SetStateAction<string>>,
        maxSetter: React.Dispatch<React.SetStateAction<string>>,
        rangeKey: keyof IFilters
    ) => {
        minSetter(minValue);
        maxSetter(maxValue);

        if (minValue === '' || maxValue === '') {
            deleteKey(rangeKey); // Remove range if min or max is empty
        } else {
            setFlt((prevState) => ({
                ...prevState,
                [rangeKey]: `${minValue}-${maxValue}`,
            }));
        }
    };

    // Specific handlers for each range type (price, built, maintenance, etc.)
    const handleMinPriceChange = (value: string) => handleRangeChange(value, maxPrice, setMinPrice, setMaxPrice, 'priceRange');
    const handleMaxPriceChange = (value: string) => handleRangeChange(minPrice, value, setMinPrice, setMaxPrice, 'priceRange');

    const handleMinBuiltChange = (value: string) => handleRangeChange(value, maxBuilt, setMinBuilt, setMaxBuilt, 'builtUpArea');
    const handleMaxBuiltChange = (value: string) => handleRangeChange(minBuilt, value, setMinBuilt, setMaxBuilt, 'builtUpArea');

    const handleMinMainTChange = (value: string) => handleRangeChange(value, maxMainT, setMinMainT, setMaxMainT, 'maintenance');
    const handleMaxMainTChange = (value: string) => handleRangeChange(minMainT, value, setMinMainT, setMaxMainT, 'maintenance');

    const handleMinAgeChange = (value: string) => handleRangeChange(value, maxAge, setMinAge, setMaxAge, 'propertyAge');
    const handleMaxAgeChange = (value: string) => handleRangeChange(minAge, value, setMinAge, setMaxAge, 'propertyAge');

    const handleMinDayChange = (value: string) => handleRangeChange(value, maxDay, setMinDay, setMaxDay, 'daysOnApp');
    const handleMaxDayChange = (value: string) => handleRangeChange(minDay, value, setMinDay, setMaxDay, 'daysOnApp');

    const handleMinFloorChange = (value: string) => handleRangeChange(value, maxFloor, setMinFloor, setMaxFloor, 'totalFloor');
    const handleMaxFloorChange = (value: string) => handleRangeChange(minFloor, value, setMinFloor, setMaxFloor, 'totalFloor');

    const handleMinPFloorChange = (value: string) => handleRangeChange(value, maxPFloor, setMinPFloor, setMaxPFloor, 'propertyFloor');
    const handleMaxPFloorChange = (value: string) => handleRangeChange(minPFloor, value, setMinPFloor, setMaxPFloor, 'propertyFloor');



    useEffect(() => {



        setFlt(filter)

        if (filter?.purposeId) {
            setPurposeId(filter.purposeId - 1)
        }

        setHomeTypeId(filter?.homeTypeId?.split(',')?.map(e => parseInt(e) - 1) || [])
        setUserRoleId(filter?.userRoleId?.split(',')?.map(e => parseInt(e) - 1) || [])
        setAvailabilityTypeId(filter?.availabilityTypeId?.split(',')?.map(e => parseInt(e) - 1) || [])
        setFurnishingsId(filter?.furnishingsId?.split(',')?.map(e => parseInt(e) - 1) || [])
        setFacingId(filter?.facingId?.split(',')?.map(e => parseInt(e) - 1) || [])
        setPossessionsId(filter?.possessionsId?.split(',')?.map(e => parseInt(e) - 1) || [])
        setTenantsId(filter?.tenantsId?.split(',')?.map(e => parseInt(e) - 1) || [])


        setBedroomCount(filter?.bedroomCount?.split(',')?.map(e => parseInt(e)) || [])
        setBathroomCount(filter?.bathroomCount?.split(',')?.map(e => parseInt(e)) || [])
        setHallCount(filter?.hallCount?.split(',')?.map(e => parseInt(e)) || [])
        setKitchenCount(filter?.kitchenCount?.split(',')?.map(e => parseInt(e)) || [])
        setBalconyCount(filter?.balconyCount?.split(',')?.map(e => parseInt(e)) || [])




        if (filter?.priceRange) setMinPrice(filter?.priceRange?.split('-')[0]);
        if (filter?.priceRange) setMaxPrice(filter?.priceRange?.split('-')[1]);



        if (filter?.builtUpArea) setMinBuilt(filter?.builtUpArea?.split('-')[0]);
        if (filter?.builtUpArea) setMaxBuilt(filter?.builtUpArea?.split('-')[1]);




        if (filter?.maintenance) setMinMainT(filter?.maintenance?.split('-')[0]);
        if (filter?.maintenance) setMaxMainT(filter?.maintenance?.split('-')[1]);


        if (filter?.propertyAge) setMinAge(filter?.propertyAge?.split('-')[0]);
        if (filter?.propertyAge) setMaxAge(filter?.propertyAge?.split('-')[1]);



        if (filter?.daysOnApp) setMinDay(filter?.daysOnApp?.split('-')[0]);
        if (filter?.daysOnApp) setMaxDay(filter?.daysOnApp?.split('-')[1]);



        if (filter?.totalFloor) setMinFloor(filter?.totalFloor?.split('-')[0]);
        if (filter?.totalFloor) setMaxFloor(filter?.totalFloor?.split('-')[1]);




        if (filter?.propertyFloor) setMinPFloor(filter?.propertyFloor?.split('-')[0]);
        if (filter?.propertyFloor) setMaxPFloor(filter?.propertyFloor?.split('-')[1]);


        if (filter.cornerProperty) setCorner(true)




    }, [])




    const clearFilterHandle = () => {


        setPurposeId(0)


        setHomeTypeId([])
        setUserRoleId([])
        setAvailabilityTypeId([])
        setFurnishingsId([])
        setFacingId([])
        setPossessionsId([])
        setTenantsId([])


        setBedroomCount([])
        setBathroomCount([])
        setHallCount([])
        setKitchenCount([])
        setBalconyCount([])




        setMinPrice('');
        setMaxPrice('');



        setMinBuilt('');
        setMaxBuilt('');




        setMinMainT('');
        setMaxMainT('');


        setMinAge('');
        setMaxAge('');



        setMinDay('');
        setMaxDay('');



        setMinFloor('');
        setMaxFloor('');




        setMinPFloor('');
        setMaxPFloor('');


        setCorner(false)

        setFlt({ purposeId: 1 })
        applyFilter({ purposeId: 1 })


    }


    const applyFilter = (fl: IFilters) => {
        setFilter(fl)
        setOnFilterApplyClick(true)
        router.back()
    }




    return (
        <View
            className='flex-1 bg-white'
            style={{
                paddingTop: insets.top
            }}
        >
            <TitleBar title='Filter' />
            <ScrollView showsVerticalScrollIndicator={false}>

                <View
                    style={{
                        paddingBottom: submitHeight + 20
                    }}
                    className='px-[10px] gap-[40px]'>

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.purposeEle) &&
                        <View className='flex flex-row justify-center'>
                            <ToggleV2
                                selected={purposeId}
                                setSelected={setPurposeId}
                                onSelect={(index) => {
                                    setFlt(prevState => ({ ...prevState, purposeId: index + 1 }))
                                }}
                                list={['Buy', 'Rent']} />
                        </View>
                    }




                    <TitleLayout
                        title='Home Type'
                    >
                        <MultipleSelectV2
                            selected={homeTypeId}
                            setSelected={setHomeTypeId}
                            list={houseType}
                            onSelect={(e) => {
                                const arr = e.map(e => e + 1).join(',');
                                if (!arr) {
                                    deleteKey('homeTypeId')
                                }
                                if (arr) {
                                    setFlt(prevState => ({ ...prevState, homeTypeId: arr }));
                                }

                                if (e.includes(4)) {
                                    setEleManager(HouseTypeEnum.Room)
                                } else if (e.includes(5)) {
                                    setEleManager(HouseTypeEnum.PG)
                                } else {
                                    setEleManager(HouseTypeEnum.Apartment)
                                }
                            }}

                        />
                    </TitleLayout>





                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.listedByEle) &&
                        <TitleLayout
                            title='Listed By'
                        >
                            <MultipleSelectV2
                                classNameItem='flex-1'
                                selected={userRoleId}
                                setSelected={setUserRoleId}
                                onSelect={(e) => {
                                    const arr = e.map(e => e + 1).join(',');
                                    if (!arr) {
                                        deleteKey('userRoleId')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, userRoleId: arr }));
                                    }
                                }}
                                list={roles}
                            />
                        </TitleLayout>
                    }




                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.priceEle) &&
                        <TitleLayout
                            title='Price Range'
                        >
                            <View className='flex flex-row items-center gap-5'>
                                <Input
                                    value={minPrice}
                                    keyboardType="numeric"
                                    onChangeText={handleMinPriceChange}
                                    className='w-28 flex-1'
                                    placeholder='Min'
                                />
                                <Text>To</Text>
                                <Input
                                    value={maxPrice}
                                    keyboardType="numeric"
                                    onChangeText={handleMaxPriceChange}
                                    className='w-28 flex-1' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.bedEle) &&
                        <TitleLayout
                            title='Bedroom'
                        >
                            <MultipleSelectV2
                                selected={bedroomCount}
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                setSelected={setBedroomCount}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('bedroomCount')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, bedroomCount: arr }));
                                    }
                                }}
                                list={bedroom}
                            />
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.bathEle) &&
                        <TitleLayout
                            title='Bathroom'
                        >
                            <MultipleSelectV2
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}

                                setSelected={setBathroomCount}
                                selected={bathroomCount}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('bathroomCount')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, bathroomCount: arr }));
                                    }
                                }}
                                list={bathroom}
                            />
                        </TitleLayout>
                    }





                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.hallEle) &&
                        <TitleLayout
                            title='Hall'
                        >
                            <MultipleSelectV2
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                setSelected={setHallCount}
                                selected={hallCount}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('hallCount')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, hallCount: arr }));
                                    }
                                }}
                                list={hall}
                            />
                        </TitleLayout>
                    }




                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.kitchenEle) &&
                        <TitleLayout
                            title='Kitchen'
                        >
                            <MultipleSelectV2
                                selected={kitchenCount}
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}

                                setSelected={setKitchenCount}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('kitchenCount')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, kitchenCount: arr }));
                                    }
                                }}
                                list={kitchen}
                            />
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.balconyEle) &&
                        <TitleLayout
                            title='Balcony'
                        >
                            <MultipleSelectV2
                                selected={balconyCount}
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                setSelected={setBalconyCount}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('balconyCount')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, balconyCount: arr }));
                                    }
                                }}
                                list={balcony}
                            />
                        </TitleLayout>
                    }




                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.builtUpEle) &&
                        <TitleLayout
                            title='Square foot'
                        >
                            <View className='flex flex-row items-center gap-5'>
                                <Input
                                    value={minBuilt}
                                    keyboardType="numeric"
                                    onChangeText={handleMinBuiltChange}
                                    className='w-28 flex-1' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    value={maxBuilt}
                                    keyboardType="numeric"
                                    onChangeText={handleMaxBuiltChange}
                                    className='w-28 flex-1' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }




                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.maintananceEle) &&
                        <TitleLayout
                            title='Total Maintenance (Monthly)'
                        >
                            <View className='flex flex-row items-center gap-5'>
                                <Input
                                    value={minMainT}
                                    keyboardType="numeric"
                                    onChangeText={handleMinMainTChange}
                                    className='w-28 flex-1' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    value={maxMainT}

                                    keyboardType="numeric"
                                    onChangeText={handleMaxMainTChange}

                                    className='w-28 flex-1' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.ageEle) &&
                        <TitleLayout
                            title='Property Age'
                        >
                            <View className='flex flex-row items-center gap-5'>
                                <Input
                                    value={minAge}
                                    keyboardType="numeric"
                                    onChangeText={handleMinAgeChange}

                                    className='w-28 flex-1' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    value={maxAge}

                                    keyboardType="numeric"
                                    onChangeText={handleMaxAgeChange}
                                    className='w-28 flex-1' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.daysOnAppEle) &&
                        <TitleLayout
                            title='Days on App'
                        >
                            <View className='flex flex-row items-center gap-5'>
                                <Input
                                    value={minDay}
                                    keyboardType="numeric"
                                    onChangeText={handleMinDayChange}
                                    className='w-28 flex-1' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    value={maxDay}

                                    keyboardType="numeric"
                                    onChangeText={handleMaxDayChange}
                                    className='w-28 flex-1' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.parkTwoEle) &&
                        <TitleLayout
                            title='Parking slot for 2 wheeler'
                        >
                            <MultipleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                setSelected={flt.parkingSlotTwoWheelerCount ? flt.parkingSlotTwoWheelerCount.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('parkingSlotTwoWheelerCount')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, parkingSlotTwoWheelerCount: arr }));
                                    }
                                }}
                                list={parkingSlotTwoWheel}
                            />
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.parkFourEle) &&
                        <TitleLayout
                            title='Parking slot for 4 wheeler'
                        >
                            <MultipleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                setSelected={flt.parkingSlotFourWheelerCount ? flt.parkingSlotFourWheelerCount.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('parkingSlotFourWheelerCount')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, parkingSlotFourWheelerCount: arr }));
                                    }
                                }}
                                list={parkingSlotFourWheel}
                            />
                        </TitleLayout>
                    }




                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.totalFloorEle) &&
                        <TitleLayout
                            title='Total Floor'
                        >
                            <View className='flex flex-row items-center gap-5'>
                                <Input
                                    value={minFloor}
                                    keyboardType="numeric"
                                    onChangeText={handleMinFloorChange}
                                    className='w-28 flex-1' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    value={maxFloor}

                                    keyboardType="numeric"
                                    onChangeText={handleMaxFloorChange}
                                    className='w-28 flex-1' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.propFloorEle) &&
                        <TitleLayout
                            title='Property Floor'
                        >
                            <View className='flex flex-row items-center gap-5'>
                                <Input
                                    value={minPFloor}

                                    keyboardType="numeric"
                                    onChangeText={handleMinPFloorChange}
                                    className='w-28 flex-1' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    value={maxPFloor}

                                    keyboardType="numeric"
                                    onChangeText={handleMaxPFloorChange}
                                    className='w-28 flex-1' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.availEle) &&
                        <TitleLayout
                            title='Availability'
                        >
                            <MultipleSelectV2
                                selected={availabilityTypeId}
                                setSelected={setAvailabilityTypeId}
                                onSelect={(e) => {
                                    const arr = e.map(e => e + 1).join(',');
                                    if (!arr) {
                                        deleteKey('availabilityTypeId')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, availabilityTypeId: arr }));
                                    }
                                }}
                                list={availability}
                            />
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.furnishingEle) &&
                        <TitleLayout
                            title='Furnishing'
                        >
                            <MultipleSelectV2
                                selected={furnishingsId}
                                setSelected={setFurnishingsId}
                                onSelect={(e) => {
                                    const arr = e.map(e => e + 1).join(',');
                                    if (!arr) {
                                        deleteKey('furnishingsId')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, furnishingsId: arr }));
                                    }
                                }}
                                list={furnishing}
                            />
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.facingEle) &&
                        <TitleLayout
                            title='Facing *'
                        >
                            <MultipleSelectV2

                                selected={facingId}
                                setSelected={setFacingId}
                                onSelect={(e) => {
                                    const arr = e.map(e => e + 1).join(',');
                                    if (!arr) {
                                        deleteKey('facingId')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, facingId: arr }));
                                    }
                                }}
                                list={facing}
                            />
                        </TitleLayout>
                    }


                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.cornerEle) &&
                        <Checkbox
                            onPress={() => {
                                setCorner(!corner)
                                if (corner) return deleteKey('cornerProperty');
                                setFlt((prevState) => ({ ...prevState, cornerProperty: '1' }))
                            }}
                            check={corner}
                            title='Corner Property' />
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.possesionEle) &&
                        <TitleLayout
                            title='Possession Status *'
                        >
                            <MultipleSelectV2

                                selected={possessionsId}
                                setSelected={setPossessionsId}
                                onSelect={(e) => {
                                    const arr = e.map(e => e + 1).join(',');
                                    if (!arr) {
                                        deleteKey('possessionsId')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, possessionsId: arr }));
                                    }
                                }}
                                list={possesion}
                            />
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.tenanatEle) &&
                        <TitleLayout
                            title='Preferred Tenants'
                        >
                            <MultipleSelectV2
                                selected={tenantsId}
                                setSelected={setTenantsId}
                                onSelect={(e) => {
                                    const arr = e.map(e => e + 1).join(',');
                                    if (!arr) {
                                        deleteKey('tenantsId')
                                    }
                                    if (arr) {
                                        setFlt(prevState => ({ ...prevState, tenantsId: arr }));
                                    }
                                }}
                                list={tenants}
                            />
                        </TitleLayout>
                    }

                </View>
            </ScrollView>
            <View
                onLayout={(e) => setSubmitHeight(e.nativeEvent.layout.height)}
                style={{
                    paddingBottom: insets.bottom + 8
                }}
                className='border-t border-t-gray-100 bg-white pt-2 px-7 flex flex-row justify-between items-center absolute bottom-0 left-0 w-full'>
                {/* <Text
                    onPress={() => router.back()}
                >Cancel</Text> */}
                <ButtonUI
                    variant={'ghost'}
                    size={'default'}
                    onPress={clearFilterHandle}
                >

                    <TextUI>Clear Filter</TextUI>
                </ButtonUI>
                {/* <Button
                    onPress={() => {
                        setOnFilterApplyClick(true)
                        router.back()
                    }}
                    className='px-8 bg-primary '
                    title='Apply' /> */}
                <ButtonUI
                    size={'default'}
                    onPress={() => applyFilter(flt)}
                >
                    {/* {loading &&
                        <ActivityIndicator
                            size={'small'}
                            color={'white'}
                        />} */}
                    <TextUI>Apply</TextUI>
                </ButtonUI>
            </View>

        </View>
    )
}

export default FilterScreen