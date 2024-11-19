import { View, Text } from 'react-native'
import React from 'react'
import Item from './item'
import { twMerge } from 'tailwind-merge';
import { IGoogleSuggetion, IPrediction } from '@/src/data/network/models/googleMap';


export type IOnSelectPrediction = (prediction: IPrediction) => void;

interface Props {
    className?: string;
    suggestion?: IGoogleSuggetion
    onSelect?: IOnSelectPrediction
    setSuggestion: any
}

const Suggesion: React.FC<Props> = ({ className, suggestion, onSelect, setSuggestion }) => {

    if (!suggestion || !(suggestion.predictions) || suggestion?.predictions?.length === 0) {
        return null
    }
    return (
        <View className={twMerge(`p-[10px] flex gap-5 bg-white rounded-[10px]`, className)}>
            {
                suggestion?.predictions.map((item, index) =>
                    <Item
                        key={index}
                        onPress={() => {
                            onSelect && onSelect(item);
                            setSuggestion([])
                        }}
                        title={item.description}
                        message={item.types[0]}
                    />
                )
            }

        </View>
    )
}

export default Suggesion