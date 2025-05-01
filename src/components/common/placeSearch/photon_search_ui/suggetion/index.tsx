import { View, Text } from 'react-native'
import React from 'react'
import Item from './item'
import { twMerge } from 'tailwind-merge';
import { IGoogleSuggetion, IPrediction } from '@/src/data/network/models/googleMap';
import { IPhoton, IPhotonFeature } from '@/src/data/network/models/photon';


export type IOnSelectPrediction = (prediction: IPhotonFeature) => void;

interface Props {
    className?: string;
    suggestion?: IPhoton
    onSelect?: IOnSelectPrediction
    setSuggestion: any
}

const Suggesion: React.FC<Props> = ({ className, suggestion, onSelect, setSuggestion }) => {

    if (!suggestion || !(suggestion.features) || suggestion?.features?.length === 0) {
        return null
    }
    return (
        <View className={twMerge(`p-[10px] flex gap-5 bg-white rounded-[10px]`, className)}>
            {
                suggestion?.features.map((item, index) =>

                    item?.properties?.extent?.length > 0 ?
                        <Item
                            key={index}
                            onPress={() => {
                                onSelect && onSelect(item);
                                setSuggestion([])
                            }}
                            title={item?.properties?.name}
                            message={`${item?.properties?.city ? (item?.properties?.city + " ") : ""}${item?.properties?.state ? (item.properties.state + " ") : ""}${item?.properties?.country ? (item.properties.country + " ") : ""}`}
                        /> : null
                )
            }

        </View>
    )
}

export default Suggesion