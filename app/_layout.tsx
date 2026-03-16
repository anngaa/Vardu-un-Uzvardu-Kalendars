import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as NavigationBar from 'expo-navigation-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as SystemUI from 'expo-system-ui';
import { useEffect } from 'react';
import { AppState, Platform, View } from 'react-native';
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
          // System root edge-to-edge drošībai un React Navigation apakšai
          // Piespiedu kārtā iestatām fonu, pat ja ir edge-to-edge (uz Android 12 tas var palīdzēt)
          await SystemUI.setBackgroundColorAsync('#efefef');
          await NavigationBar.setBackgroundColorAsync('#efefef');
          await NavigationBar.setButtonStyleAsync('dark');
        } catch (e) {
          console.error('RootLayout: Failed to setup navigation bar:', e);
        }
      };

      // Initial setup
      setupNavBar();

      // Re-apply on foreground to handle lifecycle resets
      const subscription = AppState.addEventListener('change', (nextAppState) => {
        if (nextAppState === 'active') {
          setupNavBar();
        }
      });

      return () => {
        subscription.remove();
      };
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
    <SafeAreaProvider style={{ flex: 1, backgroundColor: '#efefef' }}>
      <ThemeProvider value={appTheme}>
        <View style={{ flex: 1, backgroundColor: '#efefef' }}>
          <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#efefef' } }}>
            <Stack.Screen name="index" />
          </Stack>
        </View>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
