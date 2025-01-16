import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Item from './item'
import { IBuilderTeam } from '@/src/data/network/models/builderTeam'
import { builderTeamGet } from '@/src/data/network/services/builderTeam'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import CreatePeopleModal from './modals/create'


interface Props {
    builderTeams?: IBuilderTeam[]
}

const People: React.FC<Props> = ({ builderTeams }) => {



    return (
        <View className='px-5 mb-14'>
            <Title
                icon='plus'
                className='mb-5'
                title='People' />
            <View className='gap-1'>
                {
                    builderTeams && builderTeams.map((builderTeam) =>
                        <Item
                            builderTeam={builderTeam}
                            key={builderTeam.id} />
                    )
                }
            </View>


        </View>
    )
}

export default People