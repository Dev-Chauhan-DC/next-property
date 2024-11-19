import { View, Text, useWindowDimensions } from 'react-native'
import React, { useState } from 'react'
import MenuIcon from '@/src/assets/svgs/MenuIcon';
import { Colors } from '@/src/constants/Colors';
import FilterIcon from '@/src/assets/svgs/FilterIcon';
import { Link, usePathname } from 'expo-router';
import MapIcon from '@/src/assets/svgs/MapIcon';
import { useRecoilState } from 'recoil';
import { searchQueryState } from '@/src/global_state/recoil/atoms/search';

const Header = () => {
    const pathname = usePathname()
    const { width } = useWindowDimensions();
    const [menuBoxWidth, setMenuBoxWidth] = useState<number>(0);
    const [filterBoxWidth, setFilterBoxWidth] = useState<number>(0);
    const [px, setPx] = useState<number>(10);
    const [gap, setGap] = useState<number>(7);
    const [searchQuery, setSearchQuery] = useRecoilState(searchQueryState);



    return (
        <View
            style={{
                paddingHorizontal: px,
                gap: gap,
            }}
            className='flex flex-row pb-[7px]'>
            {
                pathname === '/' ?
                    <Link href={'/(home)/list'}>
                        <View
                            onLayout={(e) => setMenuBoxWidth(e.nativeEvent.layout.width)}
                            className='w-[30px] h-[30px]  rounded-full flex items-center justify-center'
                        >
                            <MenuIcon
                                width={15}
                                height={15}
                                fill={Colors.black[800]}
                            />
                        </View>
                    </Link> :
                    <Link href={'/(home)'}>
                        <View
                            onLayout={(e) => setMenuBoxWidth(e.nativeEvent.layout.width)}
                            className='w-[30px] h-[30px]  rounded-full flex items-center justify-center'
                        >
                            <MapIcon
                                width={15}
                                height={15}
                                fill={Colors.black[800]}
                            />
                        </View>
                    </Link>
            }

            <Link
                style={{
                    width: width - menuBoxWidth - filterBoxWidth - (px * 2) - (gap * 2)
                }}
                href={'/search'}>
                <View
                    style={{
                        width: width - menuBoxWidth - filterBoxWidth - (px * 2) - (gap * 2)
                    }}
                    className='h-[30px] bg-gray-100 rounded-full flex justify-center px-3'>
                    <Text
                        numberOfLines={1}
                        className='font-mRegular'>{searchQuery?.result.formatted_address}</Text>
                </View>
            </Link>
            <Link href={'/filter'}>
                <View
                    onLayout={(e) => setFilterBoxWidth(e.nativeEvent.layout.width)}
                    className='w-[30px] h-[30px]  rounded-full flex items-center justify-center' >
                    <FilterIcon
                        width={15}
                        height={15}
                        fill={Colors.black[800]}
                    />
                </View>
            </Link>
        </View>
    )
}

export default Header