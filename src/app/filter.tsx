import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
import { filterAtom, onFilterApplyClickAtom } from '../global_state/recoil/atoms/search';
import { IFilters } from '../utilities/interfaces/search';
import { availability, balcony, bathroom, bedroom, ElementEnum, elementManagement, facing, furnishing, hall, houseType, HouseTypeEnum, IElementManagement, kitchen, parkingSlotFourWheel, parkingSlotTwoWheel, possesion, roles, tenants } from '../constants/app/Property';
import { router } from 'expo-router';
import { Button as ButtonUI } from '@/src/components/ui/button'
import { Text as TextUI } from '@/src/components/ui/text'

const FilterScreen = () => {
    const insets = useSafeAreaInsets();
    const [corner, setCorner] = useState<boolean>(false);
    const [submitHeight, setSubmitHeight] = useState<number>(0);
    const [filter, setFilter] = useRecoilState(filterAtom);
    const [onFilterApplyClick, setOnFilterApplyClick] = useRecoilState(onFilterApplyClickAtom);
    const [eleManager, setEleManager] = useState<IElementManagement>(HouseTypeEnum.Apartment)

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
        setFilter((prevState) => {
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
            setFilter((prevState) => ({
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
                            <Toggle
                                onSelect={(index) => {
                                    setFilter(prevState => ({ ...prevState, purposeId: index + 1 }))
                                }}
                                selectedIndex={filter.purposeId ? filter.purposeId - 1 : 0}
                                list={['Buy', 'Rent']} />
                        </View>
                    }



                    <TitleLayout
                        title='Home Type'
                    >
                        <MultipleSelect
                            setSelected={filter.homeTypeId ? filter.homeTypeId.split(',').map((e: string) => parseInt(e) - 1) : []}
                            list={houseType}
                            onSelect={(e) => {
                                const arr = e.map(e => e + 1).join(',');
                                if (!arr) {
                                    deleteKey('homeTypeId')
                                }
                                if (arr) {
                                    setFilter(prevState => ({ ...prevState, homeTypeId: arr }));
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
                            <MultipleSelect
                                setSelected={filter.userRoleId ? filter.userRoleId.split(',').map((e: string) => parseInt(e) - 1) : []}
                                onSelect={(e) => {
                                    const arr = e.map(e => e + 1).join(',');
                                    if (!arr) {
                                        deleteKey('userRoleId')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, userRoleId: arr }));
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
                                    keyboardType="numeric"
                                    onChangeText={handleMinPriceChange}
                                    className='w-28'
                                    placeholder='Min'
                                />
                                <Text>To</Text>
                                <Input
                                    keyboardType="numeric"
                                    onChangeText={handleMaxPriceChange}
                                    className='w-28' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.bedEle) &&
                        <TitleLayout
                            title='Bedroom'
                        >
                            <MultipleSelect
                                setSelected={filter.bedroomCount ? filter.bedroomCount.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('bedroomCount')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, bedroomCount: arr }));
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
                            <MultipleSelect
                                setSelected={filter.bathroomCount ? filter.bathroomCount.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('bathroomCount')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, bathroomCount: arr }));
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
                            <MultipleSelect
                                setSelected={filter.hallCount ? filter.hallCount.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('hallCount')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, hallCount: arr }));
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
                            <MultipleSelect
                                setSelected={filter.kitchenCount ? filter.kitchenCount.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('kitchenCount')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, kitchenCount: arr }));
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
                            <MultipleSelect
                                setSelected={filter.balconyCount ? filter.balconyCount.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('balconyCount')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, balconyCount: arr }));
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
                                    keyboardType="numeric"
                                    onChangeText={handleMinBuiltChange}
                                    className='w-28' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    keyboardType="numeric"
                                    onChangeText={handleMaxBuiltChange}
                                    className='w-28' placeholder='Max' />
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
                                    keyboardType="numeric"
                                    onChangeText={handleMinMainTChange}
                                    className='w-28' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    keyboardType="numeric"
                                    onChangeText={handleMaxMainTChange}

                                    className='w-28' placeholder='Max' />
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
                                    keyboardType="numeric"
                                    onChangeText={handleMinAgeChange}

                                    className='w-28' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    keyboardType="numeric"
                                    onChangeText={handleMaxAgeChange}
                                    className='w-28' placeholder='Max' />
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
                                    keyboardType="numeric"
                                    onChangeText={handleMinDayChange}
                                    className='w-28' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    keyboardType="numeric"
                                    onChangeText={handleMaxDayChange}
                                    className='w-28' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.parkTwoEle) &&
                        <TitleLayout
                            title='Parking slot for 2 wheeler'
                        >
                            <MultipleSelect
                                setSelected={filter.parkingSlotTwoWheelerCount ? filter.parkingSlotTwoWheelerCount.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('parkingSlotTwoWheelerCount')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, parkingSlotTwoWheelerCount: arr }));
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
                                setSelected={filter.parkingSlotFourWheelerCount ? filter.parkingSlotFourWheelerCount.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('parkingSlotFourWheelerCount')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, parkingSlotFourWheelerCount: arr }));
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
                                    keyboardType="numeric"
                                    onChangeText={handleMinFloorChange}
                                    className='w-28' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    keyboardType="numeric"
                                    onChangeText={handleMaxFloorChange}
                                    className='w-28' placeholder='Max' />
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
                                    keyboardType="numeric"
                                    onChangeText={handleMinPFloorChange}
                                    className='w-28' placeholder='Min' />
                                <Text>To</Text>
                                <Input
                                    keyboardType="numeric"
                                    onChangeText={handleMaxPFloorChange}
                                    className='w-28' placeholder='Max' />
                            </View>
                        </TitleLayout>
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.availEle) &&
                        <TitleLayout
                            title='Availability'
                        >
                            <MultipleSelect
                                setSelected={filter.availabilityTypeId ? filter.availabilityTypeId.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('availabilityTypeId')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, availabilityTypeId: arr }));
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
                            <MultipleSelect
                                setSelected={filter.furnishingsId ? filter.furnishingsId.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('furnishingsId')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, furnishingsId: arr }));
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
                            <MultipleSelect
                                setSelected={filter.facingId ? filter.facingId.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('facingId')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, facingId: arr }));
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
                                setFilter((prevState) => ({ ...prevState, cornerProperty: '1' }))
                            }}
                            check={corner}
                            title='Corner Property' />
                    }



                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.possesionEle) &&
                        <TitleLayout
                            title='Possession Status *'
                        >
                            <MultipleSelect
                                setSelected={filter.possessionsId ? filter.possessionsId.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('possessionsId')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, possessionsId: arr }));
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
                            <MultipleSelect
                                setSelected={filter.tenantsId ? filter.tenantsId.split(',').map((e: string) => parseInt(e)) : []}
                                onSelect={(e) => {
                                    const arr = e.join(',');
                                    if (!arr) {
                                        deleteKey('tenantsId')
                                    }
                                    if (arr) {
                                        setFilter(prevState => ({ ...prevState, tenantsId: arr }));
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
                    onPress={() => router.back()}
                >

                    <TextUI>Close</TextUI>
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
                    onPress={() => {
                        setOnFilterApplyClick(true)
                        router.back()
                    }}
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