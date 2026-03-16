import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';
import { View, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, ThemeProvider } from '@react-navigation/native';
import 'react-native-reanimated';
import '../global.css';

export {
  ErrorBoundary
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const setupNavBar = async () => {
        try {
          // Force edge-to-edge by making navigation bar absolute
          await NavigationBar.setPositionAsync('absolute');
          // Make it almost transparent to see the root view background
          await NavigationBar.setBackgroundColorAsync('#ffffff01');
          await NavigationBar.setButtonStyleAsync('dark');
        } catch (e) {
          console.error('RootLayout: Failed to setup navigation bar:', e);
        }
      };
      setupNavBar();
    }
  }, []);

  if (!loaded) {
    return null;
  }

  const appTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#efefef',
    },
  };

  return (
    <SafeAreaProvider>
      <View style={{ flex: 1, backgroundColor: '#efefef' }}>
        <ThemeProvider value={appTheme}>
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#efefef' },
            }}
          >
            <Stack.Screen name="(tabs)" />
          </Stack>
        </ThemeProvider>
      </View>
    </SafeAreaProvider>
  );
}
