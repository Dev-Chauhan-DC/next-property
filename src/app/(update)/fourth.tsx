import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Link, router } from 'expo-router'
import Counter from '@/src/components/app/(listing)/counter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import SearchInput from '@/src/components/common/google_search_ui/SearchInput'
import Suggesion from '@/src/components/common/google_search_ui/suggetion'
import TitleLayout from '@/src/components/common/title_layout'
import SingleSelect from '@/src/components/common/select/single_select'
import ArrowIcon from '@/src/assets/svgs/ArrowIcon'
import MultipleSelect from '@/src/components/common/select/multiple_select'
import { amenities, powerBackup, projectType, waterSupply } from '@/src/constants/app/Property'
import { useRecoilState } from 'recoil'
import { amenityArryState, propertyState, updateAgentState, updateBuilderState, updatePropertyFormDataState, updatePropertyState } from '@/src/global_state/recoil/atoms/property'
import Checkbox from '@/src/components/common/checkbox'
import { Button } from '@/src/components/ui/button'
import { Text as TextUi } from '@/src/components/ui/text'
import { ChevronDown, ChevronsUpDown } from 'lucide-react-native'
import { Colors } from '@/src/constants/Colors'
import SelectModal from '@/src/components/common/select_modal'
import { IBuilder } from '@/src/data/network/models/builder'
import { IAgent } from '@/src/data/network/models/agent'
import { builderGetAll } from '@/src/data/network/services/builder'
import { agentGetAll } from '@/src/data/network/services/agent'

const FourthScreen = () => {
    const insets = useSafeAreaInsets();
    const [counterHeight, setCounterHeight] = useState<number>(0);
    const [gate, setGate] = useState<number>(0);
    const [gym, setGym] = useState<number>(0);
    const [water, setWater] = useState<number>(0);
    const [power, setPower] = useState<number>(0);
    const [amenityArray, setAmenityArray] = useRecoilState(amenityArryState);
    const [formData, setFormData] = useRecoilState(updatePropertyFormDataState)
    const [property, setProperty] = useRecoilState(updatePropertyState);
    const [builderModal, setBuilderModal] = useState<boolean>(false)
    const [agentModal, setAgentModal] = useState<boolean>(false)
    const [builders, setBuilders] = useState<IBuilder[]>([])
    const [bS, setBS] = useState<boolean>(false)
    const [value, setValue] = useRecoilState(updateBuilderState)
    const [agents, setAgents] = useState<IAgent[]>([])
    const [agent, setAgent] = useRecoilState(updateAgentState)




    const builderGetAllHandle = async (name?: string) => {
        try {
            const result = await builderGetAll(name);
            setBuilders(result.data)
        } catch (error) {
            console.error(error)
        }
    }

    const agentGetAllHandle = async (name?: string) => {
        try {
            const result = await agentGetAll(name);
            setAgents(result.data)
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        builderGetAllHandle()
        agentGetAllHandle()
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

                    <TitleLayout
                        title='Gated Security *'
                    >
                        <SingleSelect
                            defaultIndex={property?.gated_security ? 0 : 1}
                            onSelect={(index) => setFormData(e => ({ ...e, gated_security: index ? false : true }))}
                            list={[
                                { title: 'Yes' },
                                { title: 'No' }
                            ]}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Gym *'
                    >
                        <SingleSelect
                            defaultIndex={property?.gym ? 0 : 1}
                            onSelect={(index) => setFormData(e => ({ ...e, gym: index ? false : true }))}
                            list={[
                                { title: 'Yes' },
                                { title: 'No' }
                            ]}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Water Supply *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, water_supplies_id: index + 1 }))}
                            defaultIndex={property?.water_supplies_id && property?.water_supplies_id - 1}
                            list={waterSupply}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Power Backup *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, power_backups_id: index + 1 }))}
                            defaultIndex={property?.power_backups_id && property?.power_backups_id - 1}
                            list={powerBackup}
                        />
                    </TitleLayout>
                    <Checkbox
                        onPress={() => setFormData(e => ({ ...e, price_on_demand: e.price_on_demand ? false : true }))}
                        check={formData.price_on_demand ? true : false}
                        title='Price On Demand' />
                    <TitleLayout
                        title='Project Type *'
                    >
                        <SingleSelect
                            onSelect={(index) => setFormData(e => ({ ...e, project_type_id: index + 1 }))}
                            defaultIndex={property?.project_type_id && property?.project_type_id - 1}
                            list={projectType}
                        />
                    </TitleLayout>
                    <TitleLayout
                        title='Select Builder'
                    >

                        <Button
                            onPress={() => setBuilderModal(true)}
                            className='flex-row items-center justify-between'
                            variant={'outline'}
                            size={'default'}
                        >
                            <TextUi>{value ? value : "Select Builder"}</TextUi>
                            <ChevronsUpDown
                                color={Colors.gray[300]}
                            />
                            <SelectModal
                                title={'Select Builder'}
                                onSelect={(currentValue) => {
                                    setFormData(e => ({ ...e, builder_id: builders.find(a => a.name === currentValue)?.id }))
                                    setValue(currentValue === value ? "" : currentValue)
                                }}
                                selected={value}
                                list={builders.map(i => i?.name || '')}
                                setVisible={setBuilderModal}
                                visible={builderModal}
                            />
                        </Button>
                    </TitleLayout>
                    <TitleLayout
                        title='Select Builder'
                    >

                        <Button
                            onPress={() => setAgentModal(true)}
                            className='flex-row items-center justify-between'
                            variant={'outline'}
                            size={'default'}
                        >
                            <TextUi>{agent ? agent : "Select Agent"}</TextUi>
                            <ChevronsUpDown
                                color={Colors.gray[300]}
                            />
                            <SelectModal
                                title={'Select Agent'}
                                onSelect={(currentValue) => {
                                    setFormData(e => ({ ...e, agent_id: agents.find(a => a.name === currentValue)?.id }))
                                    setAgent(currentValue === agent ? "" : currentValue)
                                }}
                                selected={agent}
                                list={agents.map(i => i?.name || '')}
                                setVisible={setAgentModal}
                                visible={agentModal}
                            />
                        </Button>
                    </TitleLayout>

                    {/* <TitleLayout

                        title='Amenities *'
                    >
                        <MultipleSelect
                            onSelect={(arr) => setAmenityArray(arr)}
                            list={amenities}
                        />
                    </TitleLayout> */}
                </View>
            </ScrollView>
            <Counter
                onPressRight={() => router.push('/(update)/fifth')}
                onLayout={(e) => setCounterHeight(e.nativeEvent.layout.height)}
                className='absolute bottom-0 left-0 w-full'
                total={5}
                completed={4}
            />
        </View>
    )
}

export default FourthScreen