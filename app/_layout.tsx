import { Appearance, ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';

export const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
          'open-sans-bold': require('../assets/fonts/OpenSans-Bold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
      }

      const subscription = Appearance.addChangeListener(({ colorScheme }) => {
        setColorScheme(colorScheme);
      });
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <GestureHandlerRootView
        style={{ flex: 1, backgroundColor: colorScheme === 'dark' ? 'black' : 'white' }}
      >
        <QueryClientProvider client={queryClient}>
          <StatusBar style='dark' backgroundColor='white' />
          {/* <SafeAreaView style={styles.container} onLayout={onLayoutRootView}> */}
          <Drawer screenOptions={{}}>
            <Drawer.Screen
              name='index'
              options={{
                title: 'Home',
              }}
            />
            <Drawer.Screen
              name='(meals)'
              options={{
                title: 'Meals',
              }}
            />
            <Drawer.Screen
              name='(profile)'
              options={{
                title: 'Profile',
              }}
            />
          </Drawer>
          {/* <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='index' />
            <Stack.Screen name='(meals)' />
            <Stack.Screen name='(profile)' />
          </Stack> */}
          {/* </SafeAreaView> */}
        </QueryClientProvider>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
