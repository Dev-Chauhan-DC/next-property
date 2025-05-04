import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import Counter from '@/src/components/app/(listing)/counter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Input from '@/src/components/input'
import Checkbox from '@/src/components/common/checkbox'
import TitleLayout from '@/src/components/common/title_layout'
import SingleSelect from '@/src/components/common/select/single_select'
import { useRecoilState } from 'recoil'
import { createPreferenceState, eleManagerState, propertyState, updatePreferenceState } from '@/src/global_state/recoil/atoms/property'
import { availability, cupboards, ElementEnum, elementManagement, furnishing, houseType, HouseTypeEnum, kitchenType, parkingSlotFourWheel, parkingSlotTwoWheel, possesion } from '@/src/constants/app/Property'
import PreferenceSelect from '@/src/components/app/(listing)/third/preference_select'
import { Textarea } from '@/src/components/ui/textarea'
import { twMerge } from 'tailwind-merge'
import { numberSelectClass, textSelectClass } from '../filter'

const ThirdScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0);
    const [property, setProperty] = useRecoilState(propertyState);
    const [eleManager, setEleManager] = useRecoilState(eleManagerState)
    const [preference, setPreference] = useRecoilState(createPreferenceState);




    return (
        <View
            style={{
                paddingTop: insets.top + 10,
                paddingBottom: counterHeight

            }}
            className='flex-1 bg-white'
        >
            <ScrollView showsVerticalScrollIndicator={false}
            >
                <View className='gap-[40px] px-[10px] pb-10'>



                    {/* preferenceEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.preferenceEle) &&
                        <TitleLayout
                            title='Preference *'
                        >

                            <PreferenceSelect

                                selected={preference}
                                setSelected={setPreference}
                            />
                        </TitleLayout>


                    }


                    {/* priceEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.priceEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.price}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, price: e }))}
                            placeholder={
                                [
                                    houseType.find(i => i.title === HouseTypeEnum.Room)?.meta?.serverId,
                                    houseType.find(i => i.title === HouseTypeEnum.PG)?.meta?.serverId,
                                ].includes(property.homeTypeId) ? 'Expected Rent per Month (e.g. 5000) *' : 'Expected Price (e.g. 500000) *'}
                        />
                    }


                    {/* nagotiableEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.nagotiableEle) &&
                        <Checkbox
                            onPress={() => setProperty(prevState => ({ ...prevState, negotiable: prevState.negotiable ? 0 : 1 }))}
                            check={property.negotiable ? true : false}
                            title='Nagotiable *' />
                    }


                    {/* maintananceEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.maintananceEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.maintenance}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, maintenance: e }))}
                            placeholder='Monthly Maintenance Cost (e.g., 2000) *'
                        />
                    }



                    {/* underLoanEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.underLoanEle) &&
                        <Checkbox
                            onPress={() => setProperty(prevState => ({ ...prevState, currentlyUnderLoan: prevState.currentlyUnderLoan ? 0 : 1 }))}
                            check={property.currentlyUnderLoan ? true : false}
                            title='Currently Under Loan *' />
                    }


                    {/* availEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.availEle) &&
                        <TitleLayout
                            title='Availability *'
                        >
                            <SingleSelect
                                selected={property.availabilityTypeId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, availabilityTypeId: index + 1 }))}
                                list={availability}
                            />
                        </TitleLayout>
                    }


                    {/* furnishingEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.furnishingEle) &&
                        <TitleLayout
                            title='Furnishing *'
                        >
                            <SingleSelect
                                selected={property.furnishingsId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, furnishingsId: index + 1 }))}
                                list={furnishing}
                            />
                        </TitleLayout>
                    }



                    {/* parkTwoEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.parkTwoEle) &&
                        <TitleLayout
                            title='Parking Slot For Two Wheeler *'
                        >
                            <SingleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                selected={property.parkingSlotTwoWheelerCount}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, parkingSlotTwoWheelerCount: index }))}
                                list={parkingSlotTwoWheel}
                            />
                        </TitleLayout>
                    }




                    {/* parkFourEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.parkFourEle) &&
                        <TitleLayout
                            title='Parking Slot For Four Wheeler *'
                        >
                            <SingleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                selected={property.parkingSlotFourWheelerCount}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, parkingSlotFourWheelerCount: index }))}
                                list={parkingSlotFourWheel}
                            />
                        </TitleLayout>
                    }



                    {/* cupboardEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.cupboardEle) &&
                        <TitleLayout
                            title='Cupboards *'
                        >
                            <SingleSelect
                                textClassName={twMerge(``, textSelectClass)}
                                classNameItem={twMerge(``, numberSelectClass)}
                                selected={property.cupboard}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, cupboard: index }))}
                                list={cupboards}
                            />
                        </TitleLayout>
                    }



                    {/* kitchenTypeEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.kitchenTypeEle) &&
                        <TitleLayout
                            title='Kitchen Type *'
                        >
                            <SingleSelect
                                selected={property.kitchenTypesId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, kitchenTypesId: index + 1 }))}
                                list={kitchenType}
                            />
                        </TitleLayout>
                    }




                    {/* descEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.descEle) &&
                        <Textarea
                            value={property.propertyDescription}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, propertyDescription: e }))}
                            placeholder={property.homeTypeId === 5 ? 'Description About Room' : 'Property Description'}
                        />
                    }


                    {/* descRoomieEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.descRoomieEle) &&
                        <Textarea
                            value={property.descriptionRoomie}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, descriptionRoomie: e }))}
                            placeholder={'Description About Roommate'}
                        />
                    }



                    {/* cornerEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.cornerEle) &&
                        <Checkbox
                            onPress={() => setProperty(prevState => ({ ...prevState, cornerProperty: prevState.cornerProperty ? 0 : 1 }))}
                            check={property.cornerProperty ? true : false}
                            title='Corner Property' />
                    }





                    {/* possesionEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.possesionEle) &&
                        <TitleLayout
                            title='Possession Status *'
                        >
                            <SingleSelect
                                selected={property.possessionsId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, possessionsId: index + 1 }))}
                                list={possesion}
                            />
                        </TitleLayout>
                    }



                    {/* flatsInEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.flatsInEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.flatsInBuilding}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, flatsInBuilding: e }))}
                            placeholder='Flats in Building (e.g. 10) *'
                        />
                    }



                    {/* depositEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.depositEle) &&
                        <Input
                            keyboardType='numeric'
                            value={property.deposit}
                            onChangeText={(e) => setProperty(prevState => ({ ...prevState, deposit: e }))}
                            placeholder='Deposit Amount (e.g., 50000) *'
                        />
                    }

                </View>
            </ScrollView>
            <Counter
                onPressRight={() => router.push('/(listing)/fourth')}
                onLayout={(e) => setCounterHeight(e.nativeEvent.layout.height)}
                className='absolute bottom-0 left-0 w-full'
                total={5}
                completed={3}
            />
        </View>
    )
}

export default ThirdScreen