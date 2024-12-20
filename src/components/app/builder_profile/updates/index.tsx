import { View, Text } from 'react-native'
import React from 'react'
import Title from '../title'
import Item from './item'



interface Props {

}

const Updates: React.FC<Props> = () => {
    return (
        <View className='px-5 mb-14'>
            <Title
                className='mb-5'
                title='Latest Updates' />
            <View className='flex-row flex-wrap gap-2 overflow-hidden'>
                <Item title='Rajhans Apple Vlog Rajhans' />
                <Item title='Upcomming post' />
                <Item title='Top Builders in surat' />
                <Item title='Top Builders in surat' />
            </View>
        </View>
    )
}

export default Updates