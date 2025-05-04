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
import { eleManagerState, eleManagerUpdateState, latitudeState, longitudeState, propertyState, propPhotoState, updateAgentState, updateAmenityState, updateBuilderState, updateHighlightState, updateMealState, updatePreferenceState, updatePropertyFormDataState, updatePropertyState } from '@/src/global_state/recoil/atoms/property'
import { balcony, bathroom, bedroom, ElementEnum, elementManagement, facing, flooringType, hall, highlights, houseType, HouseTypeEnum, kitchen, lookingFor, meals, noticePeriod, occupancy, ownershipType, tenants } from '@/src/constants/app/Property'
import { getProperty, updateProperty } from '@/src/data/network/services/property'
import { IProperty } from '@/src/data/network/models/property'
import MultipleSelectV2 from '@/src/components/common/select/multiple_select_v2'
import { twMerge } from 'tailwind-merge'
import { numberSelectClass, textSelectClass } from '../filter'

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
    const [eleManager, setEleManager] = useRecoilState(eleManagerUpdateState)
    const [highlight, setHighlight] = useRecoilState(updateHighlightState);
    const [meal, setMeal] = useRecoilState(updateMealState);
    const [preference, setPreference] = useRecoilState(updatePreferenceState);
    const [amenity, setAmenity] = useRecoilState(updateAmenityState);





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
        if (property?.single_sharing) {
            setFormData(e => ({ ...e, single_sharing: property.single_sharing?.toString() }))
        }
        if (property?.double_sharing) {
            setFormData(e => ({ ...e, double_sharing: property.double_sharing?.toString() }))
        }
        if (property?.triple_sharing) {
            setFormData(e => ({ ...e, triple_sharing: property.triple_sharing?.toString() }))
        }
        if (property?.four_sharing) {
            setFormData(e => ({ ...e, four_sharing: property.four_sharing?.toString() }))
        }
        if (property?.longitude) {
            setLongitude(property.longitude)
        }
        if (property?.latitude) {
            setLatitude(property.latitude)
        }
        if (property?.home_types_id) {
            setFormData(e => ({ ...e, home_types_id: property.home_types_id }))
            setEleManager(houseType[property.home_types_id - 1].title as HouseTypeEnum)
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
        if (property?.description_roomie) {
            setFormData(e => ({ ...e, description_roomie: property.description_roomie }))
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

        if (property.property_highlights) {
            setHighlight(property.property_highlights.map(i => i.highlight_id - 1))
        }
        if (property.property_meal_types) {
            setMeal(property.property_meal_types.map(i => i.meal_type_id - 1))
        }
        if (property.property_preferences) {
            setPreference(property.property_preferences.map(i => i.preference_id - 1))
        }
        if (property.property_amenities) {
            setAmenity(property.property_amenities.map(i => (i.amenities_id ? i.amenities_id - 1 : -1)))
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


                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.purposeEle) &&
                        <View className='flex flex-row justify-center'>
                            <Toggle
                                selectedIndex={property?.purpose_id && property.purpose_id - 1}
                                onSelect={(index) => setFormData(prevState => ({ ...prevState, purpose_id: index + 1 }))}
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
                                defaultIndex={property?.home_types_id && property?.home_types_id - 1}
                                classNameItem='h-[68px]'
                                onSelect={(index) => {
                                    setFormData(e => ({ ...e, home_types_id: index + 1 }))
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
                            value={formData?.single_sharing as string}
                            onChangeText={(i) => setFormData(e => ({ ...e, single_sharing: i }))}
                            placeholder='Single Sharing Price'
                        />
                    }



                    {/* doubleShareEle */}
                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.doubleShareEle) &&
                        <Input
                            value={formData?.double_sharing as string}
                            onChangeText={(i) => setFormData(e => ({ ...e, double_sharing: i }))}
                            placeholder='Double Sharing Price'
                        />
                    }


                    {/* tripleShareEle */}
                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.tripleShareEle) &&
                        <Input
                            value={formData?.triple_sharing as string}
                            onChangeText={(i) => setFormData(e => ({ ...e, triple_sharing: i }))}
                            placeholder='Triple Sharing Price'
                        />
                    }


                    {/* fourShareEle */}
                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.fourShareEle) &&
                        <Input
                            value={formData?.single_sharing as string}
                            onChangeText={(i) => setFormData(e => ({ ...e, single_sharing: i }))}
                            placeholder='Four Sharing Price'
                        />
                    }


                    {/* highlightEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.highlightEle) &&
                        <TitleLayout

                            title='Highlight *'
                        >
                            <MultipleSelectV2
                                selected={highlight}
                                setSelected={setHighlight}
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
                                onSelect={(index) => setFormData(e => ({ ...e, occupancy_id: index + 1 }))}
                                defaultIndex={property?.occupancy_id && property?.occupancy_id - 1}
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
                                onSelect={(index) => setFormData(e => ({ ...e, looking_for_id: index + 1 }))}
                                defaultIndex={property?.looking_for_id && property?.looking_for_id - 1}
                                list={lookingFor}
                            />
                        </TitleLayout>
                    }

                    {/* mealsEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.mealsEle) &&
                        <TitleLayout
                            title='Meals *'
                        >
                            <MultipleSelectV2
                                selected={meal}
                                setSelected={setMeal}
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
                                onSelect={(index) => setFormData(e => ({ ...e, notice_period_id: index + 1 }))}
                                defaultIndex={property?.notice_period_id && property?.notice_period_id - 1}
                                list={noticePeriod}
                            />
                        </TitleLayout>
                    }






                    {/* addressEle */}
                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.addressEle) &&
                        <Input
                            value={formData?.address}
                            onChangeText={(i) => setFormData(e => ({ ...e, address: i }))}
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
                                defaultIndex={property?.bedroom_count}
                                onSelect={(index) => setFormData(e => ({ ...e, bedroom_count: index }))}
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
                                defaultIndex={property?.bedroom_count}
                                onSelect={(index) => setFormData(e => ({ ...e, bathroom_count: index }))}
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
                                onSelect={(index) => setFormData(e => ({ ...e, hall_count: index }))}
                                defaultIndex={property?.hall_count}
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
                                onSelect={(index) => setFormData(e => ({ ...e, kitchen_count: index }))}
                                defaultIndex={property?.kitchen_count}
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
                                onSelect={(index) => setFormData(e => ({ ...e, balcony_count: index }))}
                                defaultIndex={property?.balcony_count}
                                list={balcony}
                            />
                        </TitleLayout>
                    }




                    {/* plotAreaEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.plotAreaEle) &&
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
                    }








                    {/* builtUpEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.builtUpEle) &&
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
                    }





                    {/* carpetEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.carpetEle) &&
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
                    }





                    {/* facingEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.facingEle) &&
                        <TitleLayout
                            title='Facing *'
                        >
                            <SingleSelect
                                onSelect={(index) => setFormData(e => ({ ...e, facing_id: index + 1 }))}
                                defaultIndex={property?.facing_id && property?.facing_id - 1}
                                list={facing}
                            />
                        </TitleLayout>
                    }




                    {/* ageEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.ageEle) &&
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
                    }





                    {/* totalFloorEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.totalFloorEle) &&
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
                    }




                    {/* propFloorEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.propFloorEle) &&
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
                    }




                    {/* flooringEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.flooringEle) &&
                        <TitleLayout
                            title='Flooring Type *'
                        >
                            <SingleSelect
                                onSelect={(index) => setFormData(e => ({ ...e, flooring_types_id: index + 1 }))}
                                defaultIndex={property?.flooring_types_id && property?.flooring_types_id - 1}
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
                                onSelect={(index) => setFormData(e => ({ ...e, ownership_types_id: index + 1 }))}
                                defaultIndex={property?.ownership_types_id && property?.ownership_types_id - 1}
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
                                onSelect={(index) => setFormData(e => ({ ...e, tenants_id: index + 1 }))}
                                defaultIndex={property?.tenants_id && property?.tenants_id - 1}
                                list={tenants}
                            />
                        </TitleLayout>
                    }



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