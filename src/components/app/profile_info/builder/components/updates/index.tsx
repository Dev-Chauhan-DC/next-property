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

}

const Updates: React.FC<Props> = () => {
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [builderUpdates, setBuilderUpdates] = useState<IBuilderUpdate[]>([])



    const builderUpdateGetHandle = async () => {
        try {
            const result = await builderUpdateGet();
            setBuilderUpdates(result.data);

        } catch (error) {
            console.error(error);
            Toast.show(getError(error))
        }
    }

    useEffect(() => {
        builderUpdateGetHandle()
    }, [])
    return (
        <View className='px-5 mb-14'>
            <Title
                onPressPlus={() => setCreateModal(true)}
                icon='plus'
                className='mb-5'
                title='Latest Updates' />
            <View className='gap-2 overflow-hidden'>
                {
                    builderUpdates.map((builderUpdate) =>
                        <Item
                            updated={builderUpdateGetHandle}
                            deleted={builderUpdateGetHandle}
                            builderUpdate={builderUpdate}
                            key={builderUpdate.id} />
                    )
                }
            </View>
            {
                createModal &&
                <BuilderUpdatesCreate
                    open={createModal}
                    onOpenChange={() => setCreateModal(false)}
                    onRequestClose={() => setCreateModal(false)}
                    updated={() => {
                        setCreateModal(false)
                        builderUpdateGetHandle()
                    }}
                />
            }
        </View>
    )
}

export default Updates