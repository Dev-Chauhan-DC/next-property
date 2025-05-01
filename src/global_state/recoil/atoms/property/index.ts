import { HouseTypeEnum, IElementManagement } from "@/src/constants/app/Property";
import { IProperty, IPropertyListing } from "@/src/data/network/models/property";
import { IPropertyPhoto } from "@/src/data/network/models/propertyPhoto";
import { atom } from "recoil";

export const propertyState = atom<IPropertyListing>({
    key: 'propertyStateAtom',
    default: {
        purposeId: 1,
        homeTypeId: 1,
        address: '',
        bedroomCount: 0,
        bathroomCount: 0,
        hallCount: 0,
        kitchenCount: 0,
        balconyCount: 0,
        facingId: 1,
        builtUpArea: '',
        carpetArea: '',
        plotArea: '',
        propertyAge: '',
        totalFloor: '',
        propertyFloor: '',
        flooringTypeId: 1,
        ownershipTypeId: 1,
        price: '',
        negotiable: 1,
        maintenance: '',
        currentlyUnderLoan: 0,
        availabilityTypeId: 1,
        furnishingsId: 1,
        kitchenTypesId: 1,
        possessionsId: 1,
        flatsInBuilding: '',
        deposit: '',
        propertyDescription: '',
        parkingSlotFourWheelerCount: 0,
        parkingSlotTwoWheelerCount: 0,
        cupboard: 0,
        cornerProperty: 0,
        gym: 1,
        gatedSecurity: 1,
        waterSuppliesId: 1,
        powerBackupsId: 1,
        agentCertification: 0,
        area: '',
        city: '',
        pincode: '',
        landmark: '',
        state: '',
        latitude: 0,
        longitude: 0,
        verifiedProperty: 0,
        tenantsId: 1,
        occupancyId: 1,
        lookingForId: 1,
        doubleSharing: '',
        tripleSharing: '',
        singleSharing: '',
        fourSharing: '',
        descriptionRoomie: '',
        noticePeriodId: 1

    },
});



export const imageFileIdsState = atom<number[]>({
    key: 'imageFileIdsStateAtom',
    default: []
});
export const imageUrlsState = atom<string[]>({
    key: 'imageUrlsStateAtom',
    default: []
});
export const propertyPhotoState = atom<IPropertyPhoto[]>({
    key: 'propertyPhotoStateAtom',
    default: []
});

export const amenityArryState = atom<number[]>({
    key: 'amenityArryStateAtom',
    default: []
});



export const updatePropertyState = atom<IProperty>({
    key: 'updatePropertyStateAtom',
    default: { id: NaN }
});



export const updateHighlightState = atom<number[]>({
    key: 'updateHighlightStateAtom',
    default: []
});
export const updateMealState = atom<number[]>({
    key: 'updateMealStateAtom',
    default: []
});
export const updatePreferenceState = atom<number[]>({
    key: 'updatePreferenceStateAtom',
    default: []
});




export const createPropertyState = atom<IProperty>({
    key: 'createPropertyStateAtom',
    default: { id: NaN }
});


export const createHighlightState = atom<number[]>({
    key: 'createHighlightStateAtom',
    default: []
});
export const createMealState = atom<number[]>({
    key: 'createMealStateAtom',
    default: []
});
export const createPreferenceState = atom<number[]>({
    key: 'createPreferenceStateAtom',
    default: []
});

export const updateAmenityState = atom<number[]>({
    key: 'updateAmenityStateAtom',
    default: []
});
export const updatePropertyFormDataState = atom<IProperty>({
    key: 'updatePropertyFormDataStateAtom',
    default: { id: NaN }
});
export const updateBuilderState = atom<string>({
    key: 'updateBuilderStateAtom',
    default: ''
});
export const updateAgentState = atom<string>({
    key: 'updateAgentStateAtom',
    default: ''
});
export const propPhotoState = atom<IPropertyPhoto[]>({
    key: 'propPhotoStateAtom',
    default: []
});
export const latitudeState = atom<number>({
    key: 'latitudeStateAtom',
    default: 19.058753
});
export const longitudeState = atom<number>({
    key: 'longitudeStateAtom',
    default: 72.868153
});


export const eleManagerState = atom<IElementManagement>({
    key: 'eleManagerStateAtom',
    default: HouseTypeEnum.Apartment
});

export const eleManagerUpdateState = atom<IElementManagement>({
    key: 'eleManagerUpdateStateAtom',
    default: HouseTypeEnum.Apartment
});
