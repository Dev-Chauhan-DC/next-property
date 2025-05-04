import { defaultPlaceDetails } from "@/src/constants/app/Property";
import { IPlaceDetails } from "@/src/data/network/models/googleMap";
import { IFilters } from "@/src/utilities/interfaces/search";
import { atom } from "recoil";

export const searchQueryState = atom<IPlaceDetails | null>({
    key: 'searchQueryStateAtom',
    default: defaultPlaceDetails
});


export const searchQueryListingState = atom<IPlaceDetails | null>({
    key: 'searchQueryListingStateAtom',
    default: defaultPlaceDetails
});


export const filterAtom = atom<IFilters>({
    key: 'filterState',
    default: { purposeId: 1 }
});

export const fltAtom = atom<IFilters>({
    key: 'fltAtomState',
    default: { purposeId: 1 }
});


export const onFilterApplyClickAtom = atom<boolean>({
    key: 'onFilterApplyClickAtomState',
    default: false
});