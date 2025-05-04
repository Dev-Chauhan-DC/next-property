import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import Counter from '@/src/components/app/(listing)/counter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toggle from '@/src/components/common/toggle'
import TitleLayout from '@/src/components/common/title_layout'
import MultipleSelect from '@/src/components/common/select/multiple_select'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import SingleSelect from '@/src/components/common/select/single_select'
import Input from '@/src/components/input'
import { useRecoilState } from 'recoil'
import { eleManagerState, propertyState, updateHighlightState, updateMealState } from '@/src/global_state/recoil/atoms/property'
import { amenities, balcony, bathroom, bedroom, ElementEnum, elementManagement, facing, flooringType, hall, highlights, houseType, HouseTypeEnum, kitchen, lookingFor, meals, noticePeriod, occupancy, ownershipType, tenants } from '@/src/constants/app/Property'
import { twMerge } from 'tailwind-merge'
import { numberSelectClass, textSelectClass } from '../filter'

const FirstScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0)
    const [property, setProperty] = useRecoilState(propertyState);
    const [eleManager, setEleManager] = useRecoilState(eleManagerState)

    const [highlight, setHighlight] = useRecoilState(updateHighlightState);
    const [meal, setMeal] = useRecoilState(updateMealState);




    return (
        <View
            style={{
                paddingTop: insets.top + 10,
                paddingBottom: counterHeight,

            }}
            className='flex-1 bg-white'
        >
            <ScrollView showsVerticalScrollIndicator={false}
            >
                <View className='gap-14 px-[10px] pb-10'>




                    {/* purposeEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.purposeEle) &&
                        <View className='flex flex-row justify-center'>

                            <Toggle
                                selectedIndex={property.purposeId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, purposeId: index + 1 }))}
                                list={["Sell", "Rent"]}
                            />

                        </View>
                    }




                    {/* homeTypeEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.homeTypeEle) &&
                        <TitleLayout
                            title='Home Type *'
                        >
                            <SingleSelect
                                selected={property.homeTypeId - 1}
                                classNameItem='h-[68px]'
                                onSelect={(index) => {
                                    setProperty(prevState => ({ ...prevState, homeTypeId: index + 1 }))
                                    setEleManager(houseType[index].title as HouseTypeEnum)
                                }}
                                list={houseType}
                            />

                        </TitleLayout>
                    }




                    {/* singleShare */}
                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.singleShareEle) &&
                        <Input
                            value={property.singleSharing}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, singleSharing: e }))}
                            placeholder='Single Sharing Price per Month'
                        />
                    }

                    {/* doubleShare */}
                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.doubleShareEle) &&
                        <Input
                            value={property.doubleSharing}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, doubleSharing: e }))}
                            placeholder='Double Sharing Price per Month'
                        />
                    }

                    {/* tripleShare */}
                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.tripleShareEle) &&
                        <Input
                            value={property.tripleSharing}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, tripleSharing: e }))}
                            placeholder='Triple Sharing Price per Month'
                        />
                    }


                    {/* fourShare */}
                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.fourShareEle) &&
                        <Input
                            value={property.fourSharing}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, fourSharing: e }))}
                            placeholder='Four Sharing Price per Month'
                        />
                    }



                    {/* highlightEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.highlightEle) &&
                        <TitleLayout

                            title='Highlight *'
                        >
                            <MultipleSelect
                                onSelect={(arr) => setHighlight(arr)}
                                list={highlights}
                            />
                        </TitleLayout>
                    }



                    {/* occupancyEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.occupancyEle) &&
                        <TitleLayout
                            title='Occupancy *'
                        >
                            <SingleSelect
                                selected={property.flooringTypeId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, occupancyId: index + 1 }))}
                                list={occupancy}
                            />
                        </TitleLayout>
                    }




                    {/* lookingForEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.lookingForEle) &&
                        <TitleLayout
                            title='Looking For *'
                        >
                            <SingleSelect
                                selected={property.lookingForId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, lookingForId: index + 1 }))}
                                list={lookingFor}
                            />
                        </TitleLayout>
                    }



                    {/* meals */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.mealsEle) &&
                        <TitleLayout

                            title='Meals *'
                        >
                            <MultipleSelect
                                onSelect={(arr) => setMeal(arr)}
                                list={meals}
                            />
                        </TitleLayout>
                    }

                    {/* noticePeriodEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.noticePeriodEle) &&
                        <TitleLayout
                            title='Notice Period *'
                        >
                            <SingleSelect
                                selected={property.noticePeriodId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, noticePeriodId: index + 1 }))}
                                list={noticePeriod}
                            />
                        </TitleLayout>
                    }




                    {/* addressEle */}
                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.addressEle) &&
                        <Input
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, address: e }))}
                            placeholder='Address ( visible to all users ) *'
                        />
                    }



                    {/* bedEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.bedEle) &&
                        <TitleLayout
                            title='Bedroom *'
                        >
                            <SingleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                selected={property.bedroomCount}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, bedroomCount: index }))}
                                list={bedroom}
                            />
                        </TitleLayout>
                    }

                    {/* bathEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.bathEle) &&
                        <TitleLayout
                            title='Bathroom *'
                        >
                            <SingleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                selected={property.bathroomCount}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, bathroomCount: index }))}
                                list={bathroom}
                            />
                        </TitleLayout>
                    }



                    {/* hallEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.hallEle) &&
                        <TitleLayout
                            title='Hall *'
                        >
                            <SingleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                selected={property.hallCount}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, hallCount: index }))}
                                list={hall}
                            />
                        </TitleLayout>
                    }



                    {/* kitchenEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.kitchenEle) &&
                        <TitleLayout
                            title='Kitchen *'
                        >
                            <SingleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                selected={property.kitchenCount}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, kitchenCount: index }))}
                                list={kitchen}
                            />
                        </TitleLayout>
                    }



                    {/* balconyEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.balconyEle) &&
                        <TitleLayout
                            title='Balcony *'
                        >
                            <SingleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                selected={property.balconyCount}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, balconyCount: index }))}
                                list={balcony}
                            />
                        </TitleLayout>
                    }



                    {/* plotAreaEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.plotAreaEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.plotArea}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, plotArea: e }))}
                            placeholder='Plot Area in Sqft (e.g. 1000) *'
                        />
                    }



                    {/* builtUpEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.builtUpEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.builtUpArea}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, builtUpArea: e }))}
                            placeholder='Built-Up Area in Sqft (e.g. 1000) *'
                        />
                    }




                    {/* carpetEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.carpetEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.carpetArea}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, carpetArea: e }))}
                            placeholder='Carpet Area in Sqft (e.g. 1000) *'
                        />
                    }





                    {/* facingEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.facingEle) &&
                        <TitleLayout
                            title='Facing *'
                        >
                            <SingleSelect
                                selected={property.facingId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, facingId: index + 1 }))}
                                list={facing}
                            />
                        </TitleLayout>
                    }





                    {/* ageEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.ageEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.propertyAge}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, propertyAge: e }))}
                            placeholder='Property Age in Years (e.g. 5) *'
                        />
                    }




                    {/* totalFloorEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.totalFloorEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.totalFloor}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, totalFloor: e }))}
                            placeholder='Total Floors (e.g. 5) *'
                        />
                    }



                    {/* propFloorEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.propFloorEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.propertyFloor}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, propertyFloor: e }))}
                            placeholder='Property Floor (e.g. 3) *'
                        />
                    }




                    {/* flooringEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.flooringEle) &&
                        <TitleLayout
                            title='Flooring Type *'
                        >
                            <SingleSelect
                                selected={property.flooringTypeId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, flooringTypeId: index + 1 }))}
                                list={flooringType}
                            />
                        </TitleLayout>
                    }




                    {/* owenershipEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.owenershipEle) &&
                        <TitleLayout
                            title='Ownership type *'
                        >
                            <SingleSelect
                                selected={property.ownershipTypeId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, ownershipTypeId: index + 1 }))}
                                list={ownershipType}
                            />
                        </TitleLayout>
                    }


                    {/* tenanatEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.tenanatEle) &&
                        <TitleLayout
                            title='Tenants *'
                        >
                            <SingleSelect
                                selected={property.tenantsId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, tenantsId: index + 1 }))}
                                list={tenants}
                            />
                        </TitleLayout>
                    }




                </View>
            </ScrollView>

            <Counter
                onPressRight={() => router.push('/(listing)/second')}
                onLayout={(e) => setCounterHeight(e.nativeEvent.layout.height)}
                className='absolute bottom-0 left-0 w-full'
                total={5}
                completed={1}
            />

        </View>
    )
}

export default FirstScreen