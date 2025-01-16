import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import Item from './item'
import { builderUpdateGet } from '@/src/data/network/services/builderUpdate'
import Toast from 'react-native-root-toast'
import { getError } from '@/src/utilities/halper_functions/service'
import { IBuilderUpdate } from '@/src/data/network/models/builderUpdate'
import BuilderUpdatesCreate from './modals/create'




interface Props {
    builderUpdates?: IBuilderUpdate[]
}
const Updates: React.FC<Props> = ({ builderUpdates }) => {


    return (
        <View className='px-5 mb-14'>
            <Title
                icon='plus'
                className='mb-5'
                title='Latest Updates' />
            <View className='flex-row flex-wrap gap-2 overflow-hidden'>
                {
                    builderUpdates && builderUpdates.map((builderUpdate) =>
                        <Item
                            builderUpdate={builderUpdate}
                            key={builderUpdate.id} />
                    )
                }
            </View>

        </View>
    )
}

export default Updates