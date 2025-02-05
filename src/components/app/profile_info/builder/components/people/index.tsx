import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Item from './item'
import { IBuilderTeam } from '@/src/data/network/models/builderTeam'
import { builderTeamGet } from '@/src/data/network/services/builderTeam'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreatePeopleModal from './modals/create'

const People = () => {
    const [createPeopleModal, setCreatePeopleModal] = useState<boolean>(false);
    const [builderTeams, setBuilderTeams] = useState<IBuilderTeam[]>([])




    const builderTeamGetHandle = async () => {
        try {
            const result = await builderTeamGet();
            setBuilderTeams(result.data);

        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        }
    }

    useEffect(() => {
        builderTeamGetHandle()
    }, [])

    return (
        <View className='px-5 mb-14'>
            <Title
                onPressPlus={() => setCreatePeopleModal(true)}
                icon='plus'
                className='mb-5'
                title='People' />
            <View className='gap-1'>
                {
                    builderTeams.map((builderTeam) =>
                        <Item
                            deleted={() => builderTeamGetHandle()}
                            updated={() => builderTeamGetHandle()}
                            builderTeam={builderTeam}
                            key={builderTeam.id} />
                    )
                }
            </View>

            {
                createPeopleModal &&
                <CreatePeopleModal
                    onRequestClose={() => setCreatePeopleModal(false)}
                    show={createPeopleModal}
                    onPressClose={() => setCreatePeopleModal(false)}
                    updated={() => {
                        setCreatePeopleModal(false)
                        builderTeamGetHandle()
                    }}
                />}
        </View>
    )
}

export default People