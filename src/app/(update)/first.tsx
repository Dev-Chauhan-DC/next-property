import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router, useLocalSearchParams } from 'expo-router'
import Counter from '@/src/components/app/(listing)/counter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import Toggle from '@/src/components/common/toggle'
import TitleLayout from '@/src/components/common/title_layout'
import MultipleSelect from '@/src/components/common/select/multiple_select'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import SingleSelect from '@/src/components/common/select/single_select'
import Input from '@/src/components/input'
import { useRecoilState } from 'recoil'
import { latitudeState, longitudeState, propertyState, propPhotoState, updateAgentState, updateBuilderState, updatePropertyFormDataState, updatePropertyState } from '@/src/global_state/recoil/atoms/property'
import { balcony, bathroom, bedroom, facing, flooringType, hall, houseType, kitchen, ownershipType, tenants } from '@/src/constants/app/Property'
import { getProperty, updateProperty } from '@/src/data/network/services/property'
import { IProperty } from '@/src/data/network/models/property'

const FirstScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0)
    const [value, setValue] = useRecoilState(updateBuilderState);
    const [agent, setAgent] = useRecoilState(updateAgentState);
    const [propPhoto, setPropPhoto] = useRecoilState(propPhotoState);
    const [property, setProperty] = useRecoilState(updatePropertyState);
    const [latitude, setLatitude] = useRecoilState(latitudeState);
    const [longitude, setLongitude] = useRecoilState(longitudeState);
    const { id } = useLocalSearchParams();
    const [formData, setFormData] = useRecoilState(updatePropertyFormDataState)




    const getPropertyHandle = async () => {
        try {
            if (typeof id !== 'string') return;
            const result = await getProperty(parseInt(id), { view: 'full' });
            setProperty(result.data)
        } catch (e) {
            console.error(e)
        } finally {
        }
    }

    const updatePropertyHandle = async () => {
        try {
            if (!property?.id) return
            await updateProperty(property?.id, formData), {
                pending: 'Updating...',
                success: 'Updated Successfully'
            }
        } catch (e) {
            console.error(e)
        } finally {
        }
    }


    useEffect(() => {

        if (property?.address) {
            setFormData(e => ({ ...e, address: property.address }))
        }
        if (property?.longitude) {
            setLongitude(property.longitude)
        }
        if (property?.latitude) {
            setLatitude(property.latitude)
        }
        if (property?.home_types_id) {
            setFormData(e => ({ ...e, home_types_id: property.home_types_id }))
        }
        if (property?.plot_area) {
            setFormData(e => ({ ...e, plot_area: property.plot_area }))
        }
        if (property?.built_up_area) {
            setFormData(e => ({ ...e, built_up_area: property.built_up_area }))
        }
        if (property?.carpet_area) {
            setFormData(e => ({ ...e, carpet_area: property.carpet_area }))
        }
        if (property?.property_age) {
            setFormData(e => ({ ...e, property_age: property.property_age }))
        }
        if (property?.total_floor) {
            setFormData(e => ({ ...e, total_floor: property.total_floor }))
        }
        if (property?.property_floor) {
            setFormData(e => ({ ...e, property_floor: property.property_floor }))
        }
        if (property?.purpose_id) {
            setFormData(e => ({ ...e, purpose_id: property.purpose_id }))
        }
        if (property?.price) {
            setFormData(e => ({ ...e, price: property.price }))
        }
        if (property?.negotiable) {
            setFormData(e => ({ ...e, negotiable: property.negotiable }))
        }
        if (property?.maintenance) {
            setFormData(e => ({ ...e, maintenance: property.maintenance }))
        }
        if (property?.property_description) {
            setFormData(e => ({ ...e, property_description: property.property_description }))
        }
        if (property?.flats_in_building) {
            setFormData(e => ({ ...e, flats_in_building: property.flats_in_building }))
        }
        if (property?.deposit) {
            setFormData(e => ({ ...e, deposit: property.deposit }))
        }
        setFormData(e => ({ ...e, price_on_demand: property.price_on_demand }))
        if (property?.builder?.name) {
            setValue(property?.builder?.name)
        }
        if (property?.agent_profile?.name) {
            setAgent(property?.agent_profile?.name)
        }
        if (property?.property_photos) {
            setPropPhoto(property?.property_photos)
        }

    }, [property])

    useEffect(() => {
        getPropertyHandle()
    }, [])


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
                            selectedIndex={property?.purpose_id && property.purpose_id - 1}
                            onSelect={(index) => setFormData(prevState => ({ ...prevState, purpose_id: index + 1 }))}
                            list={["Sell", "Rent"]}
                        />

                    </View>
                    <TitleLayout
                        title='Home Type *'
                    >
                        <SingleSelect
                            defaultIndex={property?.home_types_id && property?.home_types_id - 1}
                            classNameItem='h-[68px]'
                            onSelect={(index) => setFormData(e => ({ ...e, home_types_id: index + 1 }))}
                            list={houseType}
                        />
                    </TitleLayout>
                    <Input
                        value={formData?.address}
                        onChangeText={(i) => setFormData(e => ({ ...e, address: i }))}
                        placeholder='Address ( visible to all users ) *'
                    />
                    <TitleLayout
                        title='Bedroom *'
                    >
                        <SingleSelect
                            defaultIndex={property?.bedroom_count}
                            onSelect={(index) => setFormData(e => ({ ...e, bedroom_count: index }))}
                            list={bedroom}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Bathroom *'
                    >
                        <SingleSelect
                            defaultIndex={property?.bedroom_count}
                            onSelect={(index) => setFormData(e => ({ ...e, bathroom_count: index }))}
                            list={bathroom}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Hall *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, hall_count: index }))}
                            defaultIndex={property?.hall_count}
                            list={hall}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Kitchen *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, kitchen_count: index }))}
                            defaultIndex={property?.kitchen_count}
                            list={kitchen}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Balcony *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, balcony_count: index }))}
                            defaultIndex={property?.balcony_count}
                            list={balcony}
                        />
                    </TitleLayout>
                    <Input
                        keyboardType='numeric'
                        value={formData.plot_area !== undefined ? String(formData.plot_area) : ''}
                        onChangeText={(i) => {
                            const value = i;
                            setFormData((e) => ({
                                ...e,
                                plot_area: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                            }));
                        }} placeholder='Plot Area in Sqft (e.g. 1000) *'
                    />
                    <Input
                        keyboardType='numeric'
                        value={formData.built_up_area !== undefined ? String(formData.built_up_area) : ''}
                        onChangeText={(i) => {
                            const value = i;
                            setFormData((e) => ({
                                ...e,
                                built_up_area: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                            }));
                        }}
                        placeholder='Built-Up Area in Sqft (e.g. 1000) *'
                    />
                    <Input
                        keyboardType='numeric'
                        value={formData.carpet_area !== undefined ? String(formData.carpet_area) : ''}
                        onChangeText={(i) => {
                            const value = i;
                            setFormData((e) => ({
                                ...e,
                                carpet_area: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                            }));
                        }}
                        placeholder='Carpet Area in Sqft (e.g. 1000) *'
                    />
                    <TitleLayout
                        title='Facing *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, facing_id: index + 1 }))}
                            defaultIndex={property?.facing_id && property?.facing_id - 1}
                            list={facing}
                        />
                    </TitleLayout>
                    <Input
                        keyboardType='numeric'
                        value={formData.property_age !== undefined ? String(formData.property_age) : ''}
                        onChangeText={(i) => {
                            const value = i;
                            setFormData((e) => ({
                                ...e,
                                property_age: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                            }));
                        }}
                        placeholder='Property Age in Years (e.g. 5) *'
                    />
                    <Input
                        keyboardType='numeric'
                        value={formData.total_floor !== undefined ? String(formData.total_floor) : ''}
                        onChangeText={(i) => {
                            const value = i;
                            setFormData((e) => ({
                                ...e,
                                total_floor: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                            }));
                        }}
                        placeholder='Total Floors (e.g. 5) *'
                    />
                    <Input
                        keyboardType='numeric'
                        value={formData.property_floor !== undefined ? String(formData.property_floor) : ''}
                        onChangeText={(i) => {
                            const value = i;
                            setFormData((e) => ({
                                ...e,
                                property_floor: value ? parseInt(value) : undefined, // Set to undefined if input is empty
                            }));
                        }}
                        placeholder='Property Floor (e.g. 3) *'
                    />
                    <TitleLayout
                        title='Flooring Type *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, flooring_types_id: index + 1 }))}
                            defaultIndex={property?.flooring_types_id && property?.flooring_types_id - 1}
                            list={flooringType}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Ownership type *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, ownership_types_id: index + 1 }))}
                            defaultIndex={property?.ownership_types_id && property?.ownership_types_id - 1}
                            list={ownershipType}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Tenants *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, tenants_id: index + 1 }))}
                            defaultIndex={property?.tenants_id && property?.tenants_id - 1}
                            list={tenants}
                        />
                    </TitleLayout>

                </View>
            </ScrollView>

            <Counter
                onPressRight={() => router.push('/(update)/second')}
                onLayout={(e) => setCounterHeight(e.nativeEvent.layout.height)}
                className='absolute bottom-0 left-0 w-full'
                total={5}
                completed={1}
            />

        </View>
    )
}

export default FirstScreen