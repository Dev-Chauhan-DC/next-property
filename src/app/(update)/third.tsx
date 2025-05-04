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
import { eleManagerUpdateState, propertyState, updatePreferenceState, updatePropertyFormDataState, updatePropertyState } from '@/src/global_state/recoil/atoms/property'
import { availability, cupboards, ElementEnum, elementManagement, furnishing, kitchenType, parkingSlotFourWheel, parkingSlotTwoWheel, possesion } from '@/src/constants/app/Property'
import PreferenceSelect from '@/src/components/app/(listing)/third/preference_select'
import { Textarea } from '@/src/components/ui/textarea'
import { twMerge } from 'tailwind-merge'
import { numberSelectClass, textSelectClass } from '../filter'

const ThirdScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0);
    const [property, setProperty] = useRecoilState(updatePropertyState);
    const [formData, setFormData] = useRecoilState(updatePropertyFormDataState)
    const [eleManager, setEleManager] = useRecoilState(eleManagerUpdateState)
    const [preference, setPreference] = useRecoilState(updatePreferenceState);


    return (
        <View
            style={{
                paddingTop: insets.top,
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
                            value={formData.price !== undefined ? String(formData.price) : ''}
                            onChangeText={(i) => {
                                const value = i;
                                setFormData((e) => ({
                                    ...e,
                                    price: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                                }));
                            }}
                            placeholder='Expected Price (e.g. 500000) *'
                        />
                    }




                    {/* nagotiableEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.nagotiableEle) &&
                        <Checkbox
                            onPress={() => setFormData(e => ({ ...e, negotiable: e.negotiable ? false : true }))}
                            check={formData.negotiable ? true : false}
                            title='Nagotiable *' />
                    }




                    {/* maintananceEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.maintananceEle) &&
                        <Input
                            keyboardType='numeric'
                            value={formData.maintenance !== undefined ? String(formData.maintenance) : ''}
                            onChangeText={(i) => {
                                const value = i;
                                setFormData((e) => ({
                                    ...e,
                                    maintenance: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                                }));
                            }}
                            placeholder='Monthly Maintenance Cost (e.g., 2000) *'
                        />
                    }



                    {/* underLoanEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.underLoanEle) &&
                        <Checkbox
                            onPress={() => setFormData(e => ({ ...e, currently_under_loan: e.currently_under_loan ? false : true }))}
                            check={formData.currently_under_loan ? true : false}
                            title='Currently Under Loan *' />
                    }





                    {/* availEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.availEle) &&
                        <TitleLayout
                            title='Availability *'
                        >
                            <SingleSelect
                                onSelect={(index) => setFormData(e => ({ ...e, availability_types_id: index + 1 }))}
                                defaultIndex={property?.availability_types_id && property?.availability_types_id - 1}
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
                                onSelect={(index) => setFormData(e => ({ ...e, furnishings_id: index + 1 }))}
                                defaultIndex={property?.furnishings_id && property?.furnishings_id - 1}
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
                                onSelect={(index) => setFormData(e => ({ ...e, parking_slot_two_wheeler_count: index }))}
                                defaultIndex={property?.parking_slot_two_wheeler_count}
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
                                onSelect={(index) => setFormData(e => ({ ...e, parking_slot_four_wheeler_count: index }))}
                                defaultIndex={property?.parking_slot_four_wheeler_count}
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
                                onSelect={(index) => setFormData(e => ({ ...e, cupboard: index }))}
                                defaultIndex={property?.cupboard}
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
                                onSelect={(index) => setFormData(e => ({ ...e, kitchen_types_id: index + 1 }))}
                                defaultIndex={property?.kitchen_types_id && property?.kitchen_types_id - 1}
                                list={kitchenType}
                            />
                        </TitleLayout>
                    }






                    {/* descEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.descEle) &&
                        <Input
                            value={formData.property_description}
                            onChangeText={(i) => setFormData(e => ({ ...e, property_description: i }))}
                            placeholder='Property Description'
                        />
                    }



                    {/* descRoomieEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.descRoomieEle) &&
                        <Textarea
                            value={formData.description_roomie}
                            onChangeText={(i) => setFormData(e => ({ ...e, description_roomie: i }))}
                            placeholder={'Description About Roommate'}
                        />
                    }



                    {/* cornerEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.cornerEle) &&
                        <Checkbox
                            onPress={() => setFormData(e => ({ ...e, corner_property: e.corner_property ? false : true }))}
                            check={formData.corner_property ? true : false}
                            title='Corner Property' />
                    }





                    {/* possesionEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.possesionEle) &&
                        <TitleLayout
                            title='Possession Status *'
                        >
                            <SingleSelect
                                onSelect={(index) => setFormData(e => ({ ...e, possessions_id: index + 1 }))}
                                defaultIndex={property?.possessions_id && property?.possessions_id - 1}
                                list={possesion}
                            />
                        </TitleLayout>
                    }






                    {/* flatsInEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.flatsInEle) &&
                        <Input
                            keyboardType='numeric'
                            value={formData.flats_in_building !== undefined ? String(formData.flats_in_building) : ''}
                            onChangeText={(i) => {
                                const value = i;
                                setFormData((e) => ({
                                    ...e,
                                    flats_in_building: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                                }));
                            }}
                            placeholder='Flats in Building (e.g. 10) *'
                        />
                    }






                    {/* depositEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.depositEle) &&
                        <Input
                            keyboardType='numeric'
                            value={formData.deposit !== undefined ? String(formData.deposit) : ''}
                            onChangeText={(i) => {
                                const value = i;
                                setFormData((e) => ({
                                    ...e,
                                    deposit: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                                }));
                            }}
                            placeholder='Deposit Amount (e.g., 50000) *'
                        />
                    }



                </View>
            </ScrollView>
            <Counter
                onPressRight={() => router.push('/(update)/fourth')}
                onLayout={(e) => setCounterHeight(e.nativeEvent.layout.height)}
                className='absolute bottom-0 left-0 w-full'
                total={5}
                completed={3}
            />
        </View>
    )
}

export default ThirdScreen