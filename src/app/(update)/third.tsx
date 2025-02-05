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
import { propertyState, updatePropertyFormDataState, updatePropertyState } from '@/src/global_state/recoil/atoms/property'
import { availability, cupboards, furnishing, kitchenType, parkingSlotFourWheel, parkingSlotTwoWheel, possesion } from '@/src/constants/app/Property'

const ThirdScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0);
    const [property, setProperty] = useRecoilState(updatePropertyState);
    const [formData, setFormData] = useRecoilState(updatePropertyFormDataState)


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
                    <Checkbox
                        onPress={() => setFormData(e => ({ ...e, negotiable: e.negotiable ? false : true }))}
                        check={formData.negotiable ? true : false}
                        title='Nagotiable *' />
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
                    <Checkbox
                        onPress={() => setFormData(e => ({ ...e, currently_under_loan: e.currently_under_loan ? false : true }))}
                        check={formData.currently_under_loan ? true : false}
                        title='Currently Under Loan *' />
                    <TitleLayout
                        title='Availability *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, availability_types_id: index + 1 }))}
                            defaultIndex={property?.availability_types_id && property?.availability_types_id - 1}
                            list={availability}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Furnishing *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, furnishings_id: index + 1 }))}
                            defaultIndex={property?.furnishings_id && property?.furnishings_id - 1}
                            list={furnishing}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Parking Slot For Two Wheeler *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, parking_slot_two_wheeler_count: index }))}
                            defaultIndex={property?.parking_slot_two_wheeler_count}
                            list={parkingSlotTwoWheel}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Parking Slot For Four Wheeler *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, parking_slot_four_wheeler_count: index }))}
                            defaultIndex={property?.parking_slot_four_wheeler_count}
                            list={parkingSlotFourWheel}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Cupboards *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, cupboard: index }))}
                            defaultIndex={property?.cupboard}
                            list={cupboards}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Kitchen Type *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, kitchen_types_id: index + 1 }))}
                            defaultIndex={property?.kitchen_types_id && property?.kitchen_types_id - 1}
                            list={kitchenType}
                        />
                    </TitleLayout>
                    <Input
                        value={formData.property_description}
                        onChangeText={(i) => setFormData(e => ({ ...e, property_description: i }))}
                        placeholder='Property Description'
                    />
                    <Checkbox
                        onPress={() => setFormData(e => ({ ...e, corner_property: e.corner_property ? false : true }))}
                        check={formData.corner_property ? true : false}
                        title='Corner Property' />
                    <TitleLayout
                        title='Possession Status *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, possessions_id: index + 1 }))}
                            defaultIndex={property?.possessions_id && property?.possessions_id - 1}
                            list={possesion}
                        />
                    </TitleLayout>
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