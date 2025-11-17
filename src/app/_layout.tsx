import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { useEffect, useState } from 'react';
import { hydrateStores, StoresProvider } from '../stores';


export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(()=> {
    const init = async ()=> {
      try {
        await hydrateStores()
        setIsReady(true)
      }catch(err){
        console.log(err)
      }
    }
    init()
  }, [])

  if(!isReady){
    return null
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StoresProvider>
        <Stack>
          <Stack.Screen name='index' />
        </Stack>
      </StoresProvider>
    </ThemeProvider>
  );
}
