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
import { propertyState } from '@/src/global_state/recoil/atoms/property'
import { balcony, bathroom, bedroom, facing, flooringType, hall, houseType, kitchen, ownershipType, tenants } from '@/src/constants/app/Property'

const FirstScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0)
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
                <View className='gap-[40px] px-[10px] pb-10'>
                    <View className='flex flex-row justify-center'>
                        <Toggle
                            selectedIndex={property.purposeId - 1}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, purposeId: index + 1 }))}
                            list={["Sell", "Rent"]}
                        />

                    </View>
                    <TitleLayout
                        title='Home Type *'
                    >
                        <SingleSelect
                            selected={property.homeTypeId - 1}
                            classNameItem='h-[68px]'
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, homeTypeId: index + 1 }))}
                            list={houseType}
                        />

                    </TitleLayout>
                    <Input
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, address: e }))}
                        placeholder='Address ( visible to all users ) *'
                    />
                    <TitleLayout
                        title='Bedroom *'
                    >
                        <SingleSelect
                            selected={property.bedroomCount}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, bedroomCount: index }))}
                            list={bedroom}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Bathroom *'
                    >
                        <SingleSelect
                            selected={property.bathroomCount}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, bathroomCount: index }))}
                            list={bathroom}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Hall *'
                    >
                        <SingleSelect
                            selected={property.hallCount}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, hallCount: index }))}
                            list={hall}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Kitchen *'
                    >
                        <SingleSelect
                            selected={property.kitchenCount}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, kitchenCount: index }))}
                            list={kitchen}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Balcony *'
                    >
                        <SingleSelect
                            selected={property.balconyCount}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, balconyCount: index }))}
                            list={balcony}
                        />
                    </TitleLayout>
                    <Input
                        keyboardType='numeric'
                        value={property.plotArea}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, plotArea: e }))}
                        placeholder='Plot Area in Sqft (e.g. 1000) *'
                    />
                    <Input
                        keyboardType='numeric'
                        value={property.builtUpArea}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, builtUpArea: e }))}
                        placeholder='Built-Up Area in Sqft (e.g. 1000) *'
                    />
                    <Input
                        keyboardType='numeric'
                        value={property.carpetArea}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, carpetArea: e }))}
                        placeholder='Carpet Area in Sqft (e.g. 1000) *'
                    />
                    <TitleLayout
                        title='Facing *'
                    >
                        <SingleSelect
                            selected={property.facingId - 1}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, facingId: index + 1 }))}
                            list={facing}
                        />
                    </TitleLayout>
                    <Input
                        keyboardType='numeric'
                        value={property.propertyAge}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, propertyAge: e }))}
                        placeholder='Property Age in Years (e.g. 5) *'
                    />
                    <Input
                        keyboardType='numeric'
                        value={property.totalFloor}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, totalFloor: e }))}
                        placeholder='Total Floors (e.g. 5) *'
                    />
                    <Input
                        keyboardType='numeric'
                        value={property.propertyFloor}
                        onChangeText={(e) => setProperty(prevState => ({ ...prevState, propertyFloor: e }))}
                        placeholder='Property Floor (e.g. 3) *'
                    />
                    <TitleLayout
                        title='Flooring Type *'
                    >
                        <SingleSelect
                            selected={property.flooringTypeId - 1}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, flooringTypeId: index + 1 }))}
                            list={flooringType}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Ownership type *'
                    >
                        <SingleSelect
                            selected={property.ownershipTypeId - 1}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, ownershipTypeId: index + 1 }))}
                            list={ownershipType}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Tenants *'
                    >
                        <SingleSelect
                            selected={property.tenantsId - 1}
                            onSelect={(index) => setProperty(prevState => ({ ...prevState, tenantsId: index + 1 }))}
                            list={tenants}
                        />
                    </TitleLayout>

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