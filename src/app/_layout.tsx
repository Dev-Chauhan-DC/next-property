import { Stack } from "expo-router";
import './global.css'
import {
  Montserrat_400Regular,
  Montserrat_100Thin,
  Montserrat_200ExtraLight,
  Montserrat_300Light,
  Montserrat_500Medium,
  Montserrat_600SemiBold,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
  Montserrat_900Black,
  useFonts
} from '@expo-google-fonts/montserrat';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { RecoilRoot } from 'recoil';
import { RootSiblingParent } from 'react-native-root-siblings';
import Index from "../components/index/layout";



SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Montserrat_400Regular,
    Montserrat_100Thin,
    Montserrat_200ExtraLight,
    Montserrat_300Light,
    Montserrat_500Medium,
    Montserrat_600SemiBold,
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Montserrat_900Black,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);


  if (!loaded && !error) {
    return null;
  }

  return (
    <RootSiblingParent>
      <RecoilRoot>
        <Index>
          <Stack initialRouteName="(tabs)" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="property_info" />
            <Stack.Screen name="search" />
            <Stack.Screen name="filter" />
            <Stack.Screen name="compare" />
            <Stack.Screen name="(listing)" />
            <Stack.Screen name="(update)" />
            <Stack.Screen name='profile_info' />
            <Stack.Screen name='login' />
            <Stack.Screen name='role' />
            <Stack.Screen name='interested_people' />
            <Stack.Screen name='builder_profile' />
            <Stack.Screen name='agent_profile' />
            <Stack.Screen name='theme' />
            <Stack.Screen name='settings' />
          </Stack>
        </Index>
      </RecoilRoot>
    </RootSiblingParent>
  );

}
