import { View, Text, useWindowDimensions, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Header from './header';


interface Props {
    children: React.ReactNode
}

const HomeLayout: React.FC<Props> = ({ children }) => {
    const insets = useSafeAreaInsets();
    const { height } = useWindowDimensions();
    return (
        <View
            style={{
                paddingTop: insets.top,
                backgroundColor: 'white'
            }}
        >
            <Header />
            <View
                style={{
                    height: height - 89 - (Platform.OS === 'android' ? 0 : 86)
                }}>
                {children}
            </View>
        </View>
    )
}

export default HomeLayout