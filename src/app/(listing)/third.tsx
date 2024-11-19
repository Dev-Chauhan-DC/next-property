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
import { propertyState } from '@/src/global_state/recoil/atoms/property'
import { availability, cupboards, furnishing, kitchenType, parkingSlotFourWheel, parkingSlotTwoWheel, possesion } from '@/src/constants/app/Property'

const ThirdScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0);
    const [property, setProperty] = useRecoilState(propertyState);

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
                <View className='gap-[40px] px-[10px]'>
                    <Input
                        value={property.price}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, price: e }))}
                        placeholder='Expected Price (e.g. 500000) *'
                    />
                    <Checkbox
                        onPress={() => setProperty(prevState => ({ ...prevState, negotiable: prevState.negotiable ? 0 : 1 }))}
                        check={property.negotiable ? true : false}
                        title='Nagotiable *' />
                    <Input
                        value={property.maintenance}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, maintenance: e }))}
                        placeholder='Monthly Maintenance Cost (e.g., 2000) *'
                    />
                    <Checkbox
                        onPress={() => setProperty(prevState => ({ ...prevState, currentlyUnderLoan: prevState.currentlyUnderLoan ? 0 : 1 }))}
                        check={property.currentlyUnderLoan ? true : false}
                        title='Currently Under Loan *' />
                    <TitleLayout
                        title='Availability *'
                    >
                        <SingleSelect
                            selected={property.availabilityTypeId - 1}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, availabilityTypeId: index + 1 }))}
                            list={availability}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Furnishing *'
                    >
                        <SingleSelect
                            selected={property.furnishingsId - 1}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, furnishingsId: index + 1 }))}
                            list={furnishing}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Parking Slot For Two Wheeler *'
                    >
                        <SingleSelect
                            selected={property.parkingSlotTwoWheelerCount}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, parkingSlotTwoWheelerCount: index }))}
                            list={parkingSlotTwoWheel}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Parking Slot For Four Wheeler *'
                    >
                        <SingleSelect
                            selected={property.parkingSlotFourWheelerCount}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, parkingSlotFourWheelerCount: index }))}
                            list={parkingSlotFourWheel}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Cupboards *'
                    >
                        <SingleSelect
                            selected={property.cupboard}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, cupboard: index }))}
                            list={cupboards}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Kitchen Type *'
                    >
                        <SingleSelect
                            selected={property.kitchenTypesId - 1}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, kitchenTypesId: index + 1 }))}
                            list={kitchenType}
                        />
                    </TitleLayout>
                    <Input
                        value={property.propertyDescription}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, propertyDescription: e }))}
                        placeholder='Property Description'
                    />
                    <Checkbox
                        onPress={() => setProperty(prevState => ({ ...prevState, cornerProperty: prevState.cornerProperty ? 0 : 1 }))}
                        check={property.cornerProperty ? true : false}
                        title='Corner Property' />
                    <TitleLayout
                        title='Possession Status *'
                    >
                        <SingleSelect
                            selected={property.possessionsId - 1}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, possessionsId: index + 1 }))}
                            list={possesion}
                        />
                    </TitleLayout>
                    <Input
                        value={property.flatsInBuilding}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, flatsInBuilding: e }))}
                        placeholder='Flats in Building (e.g. 10) *'
                    />
                    <Input
                        value={property.deposit}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, deposit: e }))}
                        placeholder='Deposit Amount (e.g., 50000) *'
                    />
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