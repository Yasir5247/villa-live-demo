import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import 'react-native-reanimated';

import { useColorScheme } from '@/src/hooks/use-color-scheme';
import { StoresProvider } from '../stores';


export default function RootLayout() {
  const colorScheme = useColorScheme();

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
