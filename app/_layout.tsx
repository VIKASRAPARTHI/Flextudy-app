import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/components/useColorScheme';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from 'expo-router';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Nunito_400Regular: require('../assets/fonts/Nunito-Regular.ttf'),
    Nunito_500Medium: require('../assets/fonts/Nunito-Medium.ttf'),
    Nunito_600SemiBold: require('../assets/fonts/Nunito-SemiBold.ttf'),
    Nunito_700Bold: require('../assets/fonts/Nunito-Bold.ttf'),
    Nunito_800ExtraBold: require('../assets/fonts/Nunito-ExtraBold.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

import { AuthProvider } from '../context/AuthContext';

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <AuthProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="chat/[id]" />
          <Stack.Screen name="group/[id]" />
          <Stack.Screen name="tutor/[id]" />
          <Stack.Screen name="course-details/[id]" />
          <Stack.Screen name="course-guide/[id]" />
          <Stack.Screen name="course-video/[id]" />
          <Stack.Screen name="shorts/index" />
          <Stack.Screen name="shorts/[id]" />
          <Stack.Screen name="checkout/[id]" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal', headerShown: true }} />
        </Stack>
      </ThemeProvider>
    </AuthProvider>
  );
}
