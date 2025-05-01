import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { Link, router } from 'expo-router'
import Counter from '@/src/components/app/(listing)/counter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchInput from '@/src/components/common/google_search_ui/SearchInput'
import Suggesion from '@/src/components/common/google_search_ui/suggetion'
import TitleLayout from '@/src/components/common/title_layout'
import SingleSelect from '@/src/components/common/select/single_select'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import MultipleSelect from '@/src/components/common/select/multiple_select'
import { amenities, ElementEnum, elementManagement, powerBackup, waterSupply } from '@/src/constants/app/Property'
import { useRecoilState } from 'recoil'
import { amenityArryState, eleManagerState, propertyState } from '@/src/global_state/recoil/atoms/property'

const FourthScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0);
    const [gate, setGate] = useState<number>(0);
    const [gym, setGym] = useState<number>(0);
    const [water, setWater] = useState<number>(0);
    const [power, setPower] = useState<number>(0);
    const [property, setProperty] = useRecoilState(propertyState);
    const [amenityArray, setAmenityArray] = useRecoilState(amenityArryState);
    const [eleManager, setEleManager] = useRecoilState(eleManagerState)


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




                    {/* securityEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.securityEle) &&
                        <TitleLayout
                            title='Gated Security *'
                        >
                            <SingleSelect
                                selected={property.gatedSecurity ? 0 : 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, gatedSecurity: index ? 0 : 1 }))}
                                list={[
                                    { title: 'Yes' },
                                    { title: 'No' }
                                ]}
                            />
                        </TitleLayout>
                    }


                    {/* gymEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.gymEle) &&
                        <TitleLayout
                            title='Gym *'
                        >
                            <SingleSelect
                                selected={property.gym ? 0 : 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, gym: index ? 0 : 1 }))}
                                list={[
                                    { title: 'Yes' },
                                    { title: 'No' }
                                ]}
                            />
                        </TitleLayout>
                    }


                    {/* waterSupEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.waterSupEle) &&
                        <TitleLayout
                            title='Water Supply *'
                        >
                            <SingleSelect
                                selected={property.waterSuppliesId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, waterSuppliesId: index + 1 }))}
                                list={waterSupply}
                            />
                        </TitleLayout>
                    }


                    {/* powerBackEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.powerBackEle) &&
                        <TitleLayout
                            title='Power Backup *'
                        >
                            <SingleSelect
                                selected={property.powerBackupsId - 1}
                                onSelect={(index) => setProperty(prevState => ({ ...prevState, powerBackupsId: index + 1 }))}
                                list={powerBackup}
                            />
                        </TitleLayout>
                    }



                    {/* amenityEle */}

                    {
                        elementManagement?.find(e => e?.name === eleManager)?.element?.includes?.(ElementEnum.amenityEle) &&
                        <TitleLayout

                            title='Amenities *'
                        >
                            <MultipleSelect
                                onSelect={(arr) => setAmenityArray(arr)}
                                list={amenities}
                            />
                        </TitleLayout>
                    }



                </View>
            </ScrollView>
            <Counter
                onPressRight={() => router.push('/(listing)/fifth')}
                onLayout={(e) => setCounterHeight(e.nativeEvent.layout.height)}
                className='absolute bottom-0 left-0 w-full'
                total={5}
                completed={4}
            />
        </View>
    )
}

export default FourthScreen