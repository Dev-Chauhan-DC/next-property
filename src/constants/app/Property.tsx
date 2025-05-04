import AcIcon from "@/src/assets/svgs/AcIcon";
import ApartmentIcon from "@/src/assets/svgs/ApartmentIcon";
import BuildingIcon from "@/src/assets/svgs/BuildingIcon";
import BuiltUpAreaIcon from "@/src/assets/svgs/BuiltUpAreaIcon";
import CarpetAreaIcon from "@/src/assets/svgs/CarpetAreaIcon";
import ClubIcon from "@/src/assets/svgs/ClubIcon";
import ElevatorIcon from "@/src/assets/svgs/ElevatorIcon";
import FireAlarmIcon from "@/src/assets/svgs/FireAlarmIcon";
import GateIcon from "@/src/assets/svgs/GateIcon";
import HouseIcon from "@/src/assets/svgs/HouseIcon";
import HouseKeeperIcon from "@/src/assets/svgs/HouseKeeperIcon";
import IntercomIcon from "@/src/assets/svgs/IntercomIcon";
import ParkIcon from "@/src/assets/svgs/ParkIcon";
import ParkingIcon from "@/src/assets/svgs/ParkingIcon";
import PGIcon from "@/src/assets/svgs/PGIcon";
import PipeIcon from "@/src/assets/svgs/PipeIcon";
import RoomIcon from "@/src/assets/svgs/RoomIcon";
import SaveWaterIcon from "@/src/assets/svgs/SaveWaterIcon";
import SellIcon from "@/src/assets/svgs/SellIcon";
import SewageIcon from "@/src/assets/svgs/SewageIcon";
import ShoppingCenterIcon from "@/src/assets/svgs/ShoppingCenterIcon";
import SliderIcon from "@/src/assets/svgs/SliderIcon";
import SwimmingPoolIcon from "@/src/assets/svgs/SwimmingPoolIcon";
import WifiIcon from "@/src/assets/svgs/WifiIcon";
import { ISelectList } from "@/src/components/common/select/multiple_select";
import { IPlaceDetails } from "@/src/data/network/models/googleMap";
import { IViewport } from "@/src/utilities/interfaces/search";
import { airpodsImg, alarmImg, backpackImg, ballImg, booksImg, dumbbellImg, foodImg, glassImg, owlImg, partyImg, petBedImg, plantImg, smokingImg } from "../Images";
import { AirVent, Bed, BedDouble, BellElectric, Brush, BrushIcon, Building, Building2, DoorClosed, DoorOpen, Droplet, Fence, Flame, House, HouseWifi, ParkingMeterIcon, ShoppingBag, Smartphone, TreePineIcon, Warehouse, Waves, WavesLadder } from "lucide-react-native";



export enum HouseTypeEnum {
    Apartment = "Apartment",
    GatedCommunityVilla = "Gated Community Villa",
    StandaloneBuilding = "Standalone Building",
    IndependentHouseVilla = "Independent House / Villa",
    Room = "Room",
    PG = "PG"
}

export enum HouseTypeQPEnum {
    apartment = "apartment",
    gated_community_villa = "gated-community-villa",
    standalone_building = "standalone-building",
    independent_house_villa = "independent-house-villa",
    room = "room",
    pg = "pg"
}

// export const houseType: ISelectList[] = [
//     {
//         title: "Apartment",
//         icon: <ApartmentIcon />
//     },
//     {
//         title: "Gated Community Villa",
//         icon: <GateIcon />
//     },
//     {
//         title: "Standalone Building",
//         icon: <BuildingIcon />
//     },
//     {
//         title: "Independent House / Villa",
//         icon: <HouseIcon />
//     },
// ]

export const houseType: ISelectList[] = [
    {
        title: HouseTypeEnum.Apartment,
        icon: <Building2 />,
        meta: {
            queryParamName: HouseTypeQPEnum.apartment,
            serverId: 1
        }
    },
    {
        title: HouseTypeEnum.GatedCommunityVilla,
        icon: <DoorOpen />,
        meta: {
            queryParamName: HouseTypeQPEnum.gated_community_villa,
            serverId: 2
        }
    },
    {
        title: HouseTypeEnum.StandaloneBuilding,
        icon: <Building />,
        meta: {
            queryParamName: HouseTypeQPEnum.standalone_building,
            serverId: 3
        }
    },
    {
        title: HouseTypeEnum.IndependentHouseVilla,
        icon: <House />,
        meta: {
            queryParamName: HouseTypeQPEnum.independent_house_villa,
            serverId: 4
        }
    },
    {
        title: HouseTypeEnum.Room,
        icon: <BedDouble />,
        meta: {
            queryParamName: HouseTypeQPEnum.room,
            serverId: 5
        }
    },
    {
        title: HouseTypeEnum.PG,
        icon: <Bed />,
        meta: {
            queryParamName: HouseTypeQPEnum.pg,
            serverId: 6
        }
    },
]


export const roles: ISelectList[] = [{ title: "Owner" }, { title: "Builder" }, { title: "Agent" }];
export const ownershipType: ISelectList[] = [{ title: "Self Owned" }, { title: "On Lease" }];
export const bedroom: ISelectList[] = [
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },

];
export const bathroom: ISelectList[] = [
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },

];
export const hall: ISelectList[] = [
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },

];
export const kitchen: ISelectList[] = [
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },

];
export const balcony: ISelectList[] = [
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },

];
export const cupboards: ISelectList[] = [
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },

];
export const parkingSlotTwoWheel: ISelectList[] = [
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },

];
export const parkingSlotFourWheel: ISelectList[] = [
    { title: "0" },
    { title: "1" },
    { title: "2" },
    { title: "3" },
    { title: "4" },
    { title: "5" },
    { title: "6" },
    { title: "7" },
    { title: "8" },
    { title: "9" },
    { title: "10" },

];
export const availability: ISelectList[] = [{ title: "Immediate" }, { title: "Within 15 Days" }, { title: "Within 30 Days" }, { title: "After 30 Days" }];
export const kitchenType: ISelectList[] = [{ title: "Modular" }, { title: "Coverd Shelves" }, { title: "Open Shelves" }];
export const waterSupply: ISelectList[] = [{ title: "Corporation" }, { title: "Borewell" }, { title: "Both" }];
export const powerBackup: ISelectList[] = [{ title: "Full" }, { title: "Partial" }, { title: "None" }];
export const possesion: ISelectList[] = [{ title: "Under Construction" }, { title: "Ready to Move" }];
export const tenants: ISelectList[] = [{ title: "Anyone" }, { title: "Family" }, { title: "Bachelor Male" }, { title: "Bachelor female" }, { title: "Company" },];
export const furnishing: ISelectList[] = [{ title: "Full" }, { title: "Semi" }, { title: "None" }];
export const facing: ISelectList[] = [{ title: "North" }, { title: "South" }, { title: "East" }, { title: "West" }, { title: "North - West" }, { title: "North - East" }, { title: "South - West" }, { title: "South - East" },];
export const flooringType: ISelectList[] = [{ title: "Cement" }, { title: "Marbel / Granite" }, { title: "Wooden" }, { title: "Virtified Tiles" }, { title: "Mosaic" }];
export enum OccupancyEnum {
    single = "single",
    shared = "shared",
    any = "any",

}

export const occupancy: ISelectList[] = [
    {
        title: OccupancyEnum.single,
        meta: {
            serverId: 1,
        }
    },
    {
        title: OccupancyEnum.shared,
        meta: {
            serverId: 2,
        }
    },
    {
        title: OccupancyEnum.any,
        meta: {
            serverId: 3,
        }
    },
]

export enum LookingForEnum {
    male = "male",
    female = "female",
    any = "any",

}

export const lookingFor: ISelectList[] = [
    {
        title: LookingForEnum.male,
        meta: {
            serverId: 1,
        }
    },
    {
        title: LookingForEnum.female,
        meta: {
            serverId: 2,
        }
    },
    {
        title: OccupancyEnum.any,
        meta: {
            serverId: 3,
        }
    },
]

export enum PreferenceEnum {
    late_nighter = "late nighter",
    early_bird = "early bird",
    studious = "studious",
    gym_hustler = "gym hustler",
    sporty = "sporty",
    wanderer = "wanderer",
    party_lover = "party lover",
    pet_lover = "pet lover",
    vegan = "vegan",
    non_alcoholic = "non alcoholic",
    music_lover = "music lover",
    non_smoker = "non smoker",
    foodie = "foodie",
}


export const preferences: ISelectList[] = [
    {
        title: PreferenceEnum.late_nighter,
        img: owlImg,
        meta: {
            serverId: 1
        }
    },
    {
        title: PreferenceEnum.early_bird,
        img: alarmImg,
        meta: {
            serverId: 2
        }
    },
    {
        title: PreferenceEnum.studious,
        img: booksImg,
        meta: {
            serverId: 3
        }
    },
    {
        title: PreferenceEnum.gym_hustler,
        img: dumbbellImg,
        meta: {
            serverId: 4
        }
    },
    {
        title: PreferenceEnum.sporty,
        img: ballImg,
        meta: {
            serverId: 5
        }
    },
    {
        title: PreferenceEnum.wanderer,
        img: backpackImg,
        meta: {
            serverId: 6
        }
    },
    {
        title: PreferenceEnum.party_lover,
        img: partyImg,
        meta: {
            serverId: 7
        }
    },
    {
        title: PreferenceEnum.pet_lover,
        img: petBedImg,
        meta: {
            serverId: 8
        }
    },
    {
        title: PreferenceEnum.vegan,
        img: plantImg,
        meta: {
            serverId: 9
        }
    },
    {
        title: PreferenceEnum.music_lover,
        img: airpodsImg,
        meta: {
            serverId: 11
        }
    },
    {
        title: PreferenceEnum.non_alcoholic,
        img: glassImg,
        meta: {
            serverId: 10
        }
    },
    {
        title: PreferenceEnum.non_smoker,
        img: smokingImg,
        meta: {
            serverId: 12
        }
    },
    {
        title: PreferenceEnum.foodie,
        img: foodImg,
        meta: {
            serverId: 13
        }
    },

]

export enum MealsEnum {
    Breakfast = "Breakfast",
    Lunch = "Lunch",
    Dinner = "Dinner",
}
export const meals: ISelectList[] = [
    {
        title: MealsEnum.Breakfast,
        meta: {
            serverId: 1
        }
    },
    {
        title: MealsEnum.Lunch,
        meta: {
            serverId: 2
        }
    },
    {
        title: MealsEnum.Dinner,
        meta: {
            serverId: 3
        }
    },
]


export enum NoticePeriodEnum {
    Immediate = "Immediate",
    Week1 = "1 Week",
    HalfMonth = "Half Month",
    Month1 = "1 Month",
    Month2 = "2 Month",

}


export const noticePeriod: ISelectList[] = [
    {
        title: NoticePeriodEnum.Immediate,
        meta: {
            serverId: 1,
        }
    },
    {
        title: NoticePeriodEnum.Week1,
        meta: {
            serverId: 2,
        }
    },
    {
        title: NoticePeriodEnum.HalfMonth,
        meta: {
            serverId: 3,
        }
    },
    {
        title: NoticePeriodEnum.Month1,
        meta: {
            serverId: 4,
        }
    },
    {
        title: NoticePeriodEnum.Month2,
        meta: {
            serverId: 5,
        }
    },
]


export const projectType: ISelectList[] = [{ title: "Completed" }, { title: "Ongoing" }, { title: "Upcoming" },];

export const sort: ISelectList[] = [
    {
        title: 'Relevance',
        name: 'relevance'
    },
    {
        title: 'Newest',
        name: 'newest'
    },
    {
        title: 'High to Low (Price)',
        name: 'price-highToLow'
    },
    {
        title: 'Low to High (Price)',
        name: 'price-lowToHigh'
    },
    {
        title: 'Low to High (sqrt)',
        name: 'built_up_area-lowToHigh'
    },
    {
        title: 'High to Low (sqrt)',
        name: 'built_up_area-highToLow'
    },
    {
        title: 'Low to High (Bedroom)',
        name: 'bedroom_count-lowToHigh'
    },
    {
        title: 'High to Low (Bedroom)',
        name: 'bedroom_count-highToLow'
    },
    {
        title: 'Low to High (Bathroom)',
        name: 'bathroom_count-lowToHigh'
    },
    {
        title: 'High to Low (Bathroom)',
        name: 'bathroom_count-highToLow'
    },
    {
        title: 'Low to High (Hall)',
        name: 'hall_count-lowToHigh'
    },
    {
        title: 'High to Low (Hall)',
        name: 'hall_count-highToLow'
    },
    {
        title: 'Low to High (Kitchen)',
        name: 'kitchen_count-lowToHigh'
    },
    {
        title: 'High to Low (Kitchen)',
        name: 'kitchen_count-highToLow'
    }
]



export const amenities: ISelectList[] = [
    {
        title: "air conditioner",
        icon: <AirVent />

    },
    {
        title: "club",
        icon: <Warehouse />


    },
    {
        title: "playground",
        icon: <Fence />

    },
    {
        title: "gas",
        icon: <Flame />

    },
    {
        title: "internet",
        icon: <HouseWifi />

    },
    {
        title: "sewage",
        icon: <Waves />
    },
    {
        title: "lift",
        icon: <DoorClosed />

    },
    {
        title: "fire alarm",
        icon: <BellElectric />

    },
    {
        title: "house keeper",
        icon: <Brush />

    },
    {
        title: "park",
        icon: <TreePineIcon />

    },
    {
        title: "shopping center",
        icon: <ShoppingBag />
    },
    {
        title: "swimming pool",
        icon: <WavesLadder />
    },
    {
        title: "intercom",
        icon: <Smartphone />
    },
    {
        title: "visitor parking",
        icon: <ParkingMeterIcon />

    },
    {
        title: "rain water harvesting ",
        icon: <Droplet />
    },
]




export enum HighlightEnum {
    local_market_nearby = "local market nearby",
    close_to_metro_station = "close to metro station",
    private_attached_balcony = "private/attached balcony",
    public_transport_nearby = "public transport nearby",
    gated_society = "gated society",
    no_gender_age_restrictions = "no gender/age restrictions",
    newly_built = "newly built",
    separate_washrooms = "separate washrooms",
    housekeeping_services_available = "housekeeping services available",
    gym_nearby = "gym nearby",
    park_nearby = "park nearby",
}

export const highlights: ISelectList[] = [

    {
        title: HighlightEnum.local_market_nearby,
    },
    {
        title: HighlightEnum.close_to_metro_station,
    },
    {
        title: HighlightEnum.private_attached_balcony,
    },
    {
        title: HighlightEnum.public_transport_nearby,
    },
    {
        title: HighlightEnum.gated_society,
    },
    {
        title: HighlightEnum.no_gender_age_restrictions,
    },
    {
        title: HighlightEnum.newly_built,
    },
    {
        title: HighlightEnum.separate_washrooms,
    },
    {
        title: HighlightEnum.housekeeping_services_available,
    },
    {
        title: HighlightEnum.gym_nearby,
    },
    {
        title: HighlightEnum.park_nearby,
    },

]



export const propertyInfo = [
    {
        name: "purpose",
        subTitle: "Sell",
        icon: <SellIcon />
    },
    {
        subTitle: "Built Up Area",
        name: "1,200Sq Ft",
        icon: <BuiltUpAreaIcon />
    },
    {
        subTitle: "Carpet Area",
        name: "1,200Sq Ft",
        icon: <CarpetAreaIcon />
    },
]

export const defaultPlaceDetails: IPlaceDetails | null = {
    html_attributions: [],
    result: {
        address_components: [
            {
                long_name: "Surat",
                short_name: "Surat",
                types: [
                    "locality",
                    "political"
                ]
            },
            {
                long_name: "Surat",
                short_name: "Surat",
                types: [
                    "administrative_area_level_3",
                    "political"
                ]
            },
            {
                long_name: "Gujarat",
                short_name: "GJ",
                types: [
                    "administrative_area_level_1",
                    "political"
                ]
            },
            {
                long_name: "India",
                short_name: "IN",
                types: [
                    "country",
                    "political"
                ]
            }
        ],
        adr_address: "<span class=\"locality\">Surat</span>, <span class=\"region\">Gujarat</span>, <span class=\"country-name\">India</span>",
        formatted_address: "Surat, Gujarat, India",
        geometry: {
            location: {
                lat: 21.1702401,
                lng: 72.83106070000001
            },
            viewport: {
                northeast: {
                    lat: 21.27058340704162,
                    lng: 72.94321056780348
                },
                southwest: {
                    lat: 21.04781690239682,
                    lng: 72.70138193777503
                }
            }
        },
        icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/geocode-71.png",
        icon_background_color: "#7B9EB0",
        icon_mask_base_uri: "https://maps.gstatic.com/mapfiles/place_api/icons/v2/generic_pinlet",
        name: "Surat",
        photos: [
            {
                height: 1860,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/100790250452850557781\">kashyap bhadreshvara</a>"
                ],
                photo_reference: "AdDdOWrOoYcJPpLxYwNexcZBulYS8aK_49d5m2IqB_lyiGu9AVh7ovdUARikavhfFXHVdKiQizjuVdfvJtHrZYXunvqByOjg19IlUllFK2jQnKcGECsK4dQQMR7botwMWprK6WI8nqGgRR25H3p_LOB5_eMWySm159IJtZt4jKdo533iNVq3",
                width: 4032
            },
            {
                height: 3120,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/102822911990619688331\">Ushmita Vasava (UsHi)</a>"
                ],
                photo_reference: "AdDdOWq8rZLGhDQrrW7x5iTR72_UJwv0CFxbGTAulzCJp76ByO8KM5quIIKT7rzYtyRvp-7gfMwoT3HKMYdAgnTmhM5VVymOElcndzaDNrDQIA5Ub692XErGgl5Hddve1Z0nKLhYVeqXExB6mNvku41cX7jg36Xhg4taOo50weR7pD6nBYqe",
                width: 4160
            },
            {
                height: 4160,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/102822911990619688331\">Ushmita Vasava (UsHi)</a>"
                ],
                photo_reference: "AdDdOWrNv9i2g3LFx6nRCj-bcNT_ILH1JqxFjz24N9_gcevljg_W0TPMK2wfqWkSjfTKyjsaOVA4AmtNHI0mKBCoO2od2UjDCCqk9Qkel85i0PH5HuBrRctxqwxD_oULFlzqr7PLGdoEiMywyaeCjuC0gkn-iiyk-l4aBTFdFjCEhpGOek-L",
                width: 3120
            },
            {
                height: 5760,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/116253705863990200173\">Deepak Das</a>"
                ],
                photo_reference: "AdDdOWq6k9B8zP-0hpfaAprj8-sXAwKNm-qXcnFN1BEY623_YIzA54MCLCwN77nO1LxZKufkT0MkdCOquIYdFMTmYuwpoQ8QOQvdNY4BMsMFAkzI2mFIItb96z63xcK0zZDRkZLa9A9GHF-ME6OOlhD2-0RPtYjBJJE2ZVk5QFNsVNc9sumz",
                width: 4312
            },
            {
                height: 4640,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/111264548942207323156\">PRAMOD MISHRA</a>"
                ],
                photo_reference: "AdDdOWpAWaUMHec2CJuN10ICBrXv_3G2cIB_zPojlL8vfYYxiS_wWbBDOLr8e6bdGAx1qW6EzNfEiylFhsaEIRV1fyxNUnNYlhK8soQt7IqujU6x9ZkDmOsinXGVSzQek_JxSTIUGTVZCs2oNlIgTHUWRGmbF2bPy1pwHPxRWngegeqBQwvW",
                width: 2088
            },
            {
                height: 510,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/118418242376507329150\">Madhuri verma</a>"
                ],
                photo_reference: "AdDdOWrP7LNH0vfvh2wDbu0cCYonidQU9thLVzP3Vfpk8yXct0GNmbjYqsu9nZVtjb387z6eTXjoJWInT-yhIWw341y1jGY6SPoeDC-iuYVvf1_DYsSsCVdMOo8McMyZ1jzmXQ0AJNW_K5Po2QliFQIsC1sUvxIyNDs0U5IaTy1vEWGrzEeb",
                width: 691
            },
            {
                height: 4000,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/108241946610712094511\">Anakin Black</a>"
                ],
                photo_reference: "AdDdOWrzEM0DoMg46yGPpfp7Jbce_QaFRKk7UYws_vzwfNeF3n9X7jus1kooXE9Y7rexxffIBiuzYm4y_oB21D-QH7Tv4bOsc3ojSCmWzeNL-dhdeNeTtd1-Km6FWOdeuP1jpmk8mjp4_4Vt1cDAGaeMIdyWhP-bUM_2YhsGd3FfHcnMJ0VF",
                width: 1800
            },
            {
                height: 2340,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/106640043044327241181\">arvind veljibhai</a>"
                ],
                photo_reference: "AdDdOWrKS02hQE94tONA0mEjve9fPYmnpSGNoaOkSsaBNOxSv3uOJJOpymOZWziFI3rP3OUzxHhZvilw-a_M7wbJPqBHMH9HyvIs9ZcZvKKbICFeQ9SsYvwwof9WNcJ7FMxxwYCPp2gMHrJyub0XjXYDltVDBk6P8XPDV6PPKPL3UAEnF9BB",
                width: 1080
            },
            {
                height: 956,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/118418242376507329150\">Madhuri verma</a>"
                ],
                photo_reference: "AdDdOWoeDYhbdyI4LSiadfxLt_SRQNjet4wwNj4NX0gB1hPZnEfUw32XCKH2K1uCviwWe2AA2wchJF0U8RrY_1X5ogoxs9gde7KDfWKWO1UdnT_XBeol_luHPMjY0wRGMQljziFCFxw1hEQObLoEWOGgCZkrLhoEDvxFV9FEp3ZYH8W4GAsU",
                width: 696
            },
            {
                height: 4000,
                html_attributions: [
                    "<a href=\"https://maps.google.com/maps/contrib/100146711351306538228\">Biharsharif City</a>"
                ],
                photo_reference: "AdDdOWqjnlaLYuJLBqc5QAY1Mf5kaMoHy8LYujcm4rNVGJHq71BPGfxX-eG6s123J6zQVwQrowjF9DEPWhSjcRj2LvKTpjdS_XhqcTC80l6l-GBbuwlCMTPg3biKJtQZ0RVGJ1seEKg3slX9_n4ndChaoocd_zo7Wf8LdLdiMfmefbosId6y",
                width: 3000
            }
        ],
        place_id: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
        reference: "ChIJYxUdQVlO4DsRQrA4CSlYRf4",
        types: [
            "locality",
            "political"
        ],
        url: "https://maps.google.com/?q=Surat,+Gujarat,+India&ftid=0x3be04e59411d1563:0xfe4558290938b042",
        utc_offset: 330,
        vicinity: "Surat",
        website: "http://www.suratmunicipal.gov.in/"
    },
    status: "OK"
}

export const indiaViewport: IViewport = {
    northeast: {
        lat: 37.0911, // Northernmost point (Siachen Glacier)
        lng: 97.395358 // Easternmost point (near Kibithu, Arunachal Pradesh)
    },
    southwest: {
        lat: 6.4627,  // Southernmost point (Indira Point, Nicobar Islands)
        lng: 68.1097  // Westernmost point (Guhar Moti, Gujarat)
    }
}

export const thumbnailName = 'Thumbnail'




export enum ElementEnum {
    purposeEle = "purposeEle",
    lookingForEle = "lookingForEle",
    homeTypeEle = "homeTypeEle",
    addressEle = "addressEle",
    mapEle = "mapEle",
    bedEle = "bedEle",
    bathEle = "bathEle",
    hallEle = "hallEle",
    kitchenEle = "kitchenEle",
    balconyEle = "balconyEle",
    plotAreaEle = "plotAreaEle",
    builtUpEle = "builtUpEle",
    carpetEle = "carpetEle",
    facingEle = "facingEle",
    occupancyEle = "occupancyEle",
    ageEle = "ageEle",
    totalFloorEle = "totalFloorEle",
    propFloorEle = "propFloorEle",
    flooringEle = "flooringEle",
    owenershipEle = "owenershipEle",
    priceEle = "priceEle",
    nagotiableEle = "nagotiableEle",
    maintananceEle = "maintananceEle",
    underLoanEle = "underLoanEle",
    availEle = "availEle",
    furnishingEle = "furnishingEle",
    parkTwoEle = "parkTwoEle",
    parkFourEle = "parkFourEle",
    cupboardEle = "cupboardEle",
    kitchenTypeEle = "kitchenTypeEle",
    descEle = "descEle",
    descRoomieEle = "descRoomieEle",
    cornerEle = "cornerEle",
    possesionEle = "possesionEle",
    flatsInEle = "flatsInEle",
    depositEle = "depositEle",
    securityEle = "securityEle",
    gymEle = "gymEle",
    waterSupEle = "waterSupEle",
    powerBackEle = "powerBackEle",
    amenityEle = "amenityEle",
    tenanatEle = "tenanatEle",
    imageEle = "imageEle",
    preferenceEle = "preferenceEle",
    highlightEle = "highlightEle",
    priceOnDemandEle = "priceOnDemandEle",
    projectTypeEle = "projectTypeEle",
    builderEle = "builderEle",
    agentEle = "agentEle",
    listedByEle = "listedByEle",
    daysOnAppEle = "daysOnAppEle",
    relevanceEle = "relevanceEle",
    newestEle = "newestEle",
    singleShareEle = "singleShareEle",
    doubleShareEle = "doubleShareEle",
    tripleShareEle = "tripleShareEle",
    fourShareEle = "fourShareEle",
    noticePeriodEle = "noticePeriodEle",
    mealsEle = "mealsEle",
}

export const elementManagement = [
    {
        name: HouseTypeEnum.Apartment,
        element: [
            ...Object.values(ElementEnum).filter(i =>
                ![
                    ElementEnum.mealsEle,
                    ElementEnum.noticePeriodEle,
                    ElementEnum.singleShareEle,
                    ElementEnum.doubleShareEle,
                    ElementEnum.tripleShareEle,
                    ElementEnum.fourShareEle,
                    ElementEnum.descRoomieEle, ElementEnum.preferenceEle, ElementEnum.highlightEle, ElementEnum.occupancyEle, ElementEnum.lookingForEle].includes(i)
            )
        ]
    },
    {
        name: HouseTypeEnum.GatedCommunityVilla,
        element: [
            ...Object.values(ElementEnum).filter(i =>
                ![
                    ElementEnum.mealsEle,
                    ElementEnum.noticePeriodEle,
                    ElementEnum.singleShareEle,
                    ElementEnum.doubleShareEle,
                    ElementEnum.tripleShareEle,
                    ElementEnum.fourShareEle,
                    ElementEnum.descRoomieEle, ElementEnum.preferenceEle, ElementEnum.highlightEle, ElementEnum.occupancyEle, ElementEnum.lookingForEle].includes(i)
            )
        ]
    },
    {
        name: HouseTypeEnum.IndependentHouseVilla,
        element: [
            ...Object.values(ElementEnum).filter(i =>
                ![
                    ElementEnum.mealsEle,
                    ElementEnum.noticePeriodEle,
                    ElementEnum.singleShareEle,
                    ElementEnum.doubleShareEle,
                    ElementEnum.tripleShareEle,
                    ElementEnum.fourShareEle,
                    ElementEnum.descRoomieEle, ElementEnum.preferenceEle, ElementEnum.highlightEle, ElementEnum.occupancyEle, ElementEnum.lookingForEle].includes(i)
            )
        ]
    },
    {
        name: HouseTypeEnum.StandaloneBuilding,
        element: [
            ...Object.values(ElementEnum).filter(i =>
                ![
                    ElementEnum.mealsEle,
                    ElementEnum.noticePeriodEle,
                    ElementEnum.singleShareEle,
                    ElementEnum.doubleShareEle,
                    ElementEnum.tripleShareEle,
                    ElementEnum.fourShareEle,
                    ElementEnum.descRoomieEle, ElementEnum.preferenceEle, ElementEnum.highlightEle, ElementEnum.occupancyEle, ElementEnum.lookingForEle].includes(i)
            )
        ]
    },
    {
        name: HouseTypeEnum.Room,
        element: [
            ElementEnum.homeTypeEle,
            ElementEnum.priceEle,
            ElementEnum.addressEle,
            ElementEnum.amenityEle,
            ElementEnum.descEle,
            ElementEnum.mapEle,
            ElementEnum.descRoomieEle,
            ElementEnum.imageEle,
            ElementEnum.preferenceEle,
            ElementEnum.highlightEle,
            ElementEnum.occupancyEle,
            ElementEnum.lookingForEle,
            ElementEnum.daysOnAppEle,

        ]
    },
    {
        name: HouseTypeEnum.PG,
        element: [
            ElementEnum.homeTypeEle,
            ElementEnum.priceEle,
            ElementEnum.addressEle,
            ElementEnum.amenityEle,
            ElementEnum.descEle,
            ElementEnum.mapEle,
            ElementEnum.imageEle,
            ElementEnum.lookingForEle,
            ElementEnum.daysOnAppEle,
            ElementEnum.singleShareEle,
            ElementEnum.doubleShareEle,
            ElementEnum.tripleShareEle,
            ElementEnum.fourShareEle,
            ElementEnum.depositEle,
            ElementEnum.noticePeriodEle,
            ElementEnum.parkTwoEle,
            ElementEnum.parkFourEle,
            ElementEnum.cupboardEle,
            ElementEnum.lookingForEle,
            ElementEnum.mealsEle,

        ]
    }
]

export type IElementManagement = (typeof elementManagement)[number]['name'];
