import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import Title from '../title'
import PropertyCard from '@/src/components/app/(tabs)/(home)/list/PropertyCard'
import { IProperty } from '@/src/data/network/models/property'
import { searchAndFilters } from '@/src/data/network/services/property'
import { indiaViewport } from '@/src/constants/app/Property'
import { router } from 'expo-router'
import { IBuilder } from '@/src/data/network/models/builder'


interface Props {
    builder?: IBuilder
}

const OngoingProjects: React.FC<Props> = ({ builder }) => {

    const [loading, setLoading] = useState<boolean>(false);
    const [properties, setProperties] = useState<IProperty[]>([])



    const listSearchHandle = async () => {
        try {
            const result = await searchAndFilters(indiaViewport, { project_type_id: '2', view: 'list', page: 1, limit: 1, builder_id: builder?.id.toString() });
            setProperties(result.data)
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        listSearchHandle()
    }, [])

    return (
        <View className='px-5 mb-14'>
            <Title
                classNameView='mb-5'
                title='Ongoing Projects'
                rightTitle='View All' />
            <PropertyCard
                property={properties[0]}
                image={properties[0]?.property_photos?.[0]?.photos}
                price={properties[0]?.price}
                ba={properties[0]?.bathroom_count}
                bd={properties[0]?.bedroom_count}
                hall={properties[0]?.hall_count}
                kitchen={properties[0]?.kitchen_count}
                sqft={properties[0]?.built_up_area}
                address={properties[0]?.address}
                role={properties[0]?.user?.user_role?.role}
                onPress={() => {
                    router.push({ pathname: '/property_info', params: { id: properties[0]?.id } });
                }}
                className='m-0'
            />
        </View>
    )
}

export default OngoingProjects