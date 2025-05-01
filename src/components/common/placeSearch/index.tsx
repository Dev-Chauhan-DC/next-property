import React, { FC } from 'react'
import GoogleSearchUI from '../google_search_ui'
import PhotonSearchUI from './photon_search_ui'
import { TextInput } from 'react-native'
import { IPlaceDetails } from '@/src/data/network/models/googleMap'



interface Props {
    inputRef?: React.LegacyRef<TextInput> | undefined
    loadingPlace?: boolean | undefined
    placeholder?: string | undefined
    onSelectPlaceDetails?: ((placeDetails: IPlaceDetails) => void) | undefined
    displaySuggestion?: boolean | undefined
}

const AutoCompletePlaceSearch: FC<Props> = ({ displaySuggestion, onSelectPlaceDetails, placeholder, inputRef, loadingPlace }) => {
    return (
        <>
            {
                process.env.EXPO_PUBLIC_PLACE_AUTOCORRECT === "google" ?
                    <GoogleSearchUI
                        displaySuggestion={displaySuggestion}
                        inputRef={inputRef}
                        loadingPlace={loadingPlace}
                        placeholder={placeholder}
                        // onSelect={(prediction) => placeDetailsHandle(prediction.place_id)}
                        onSelectPlaceDetails={onSelectPlaceDetails}
                    /> :
                    <PhotonSearchUI
                        displaySuggestion={displaySuggestion}
                        inputRef={inputRef}
                        loadingPlace={loadingPlace}
                        placeholder={placeholder}
                        // onSelect={(prediction) => placeDetailsHandle(prediction.place_id)}
                        onSelectPlaceDetails={onSelectPlaceDetails}
                    />
            }
        </>
    )
}

export default AutoCompletePlaceSearch