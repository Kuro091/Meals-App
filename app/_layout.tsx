import { ImageBackground, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack } from 'expo-router';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';

export const queryClient = new QueryClient();
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

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
      <StatusBar style='light' />
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.container} onLayout={onLayoutRootView}>
          <Stack
            screenOptions={{
              headerBackTitle: '👋Back👋',
              contentStyle: {
                backgroundColor: 'transparent',
              },
            }}
          >
            <Stack.Screen
              name='index'
              options={{
                headerTitle: 'Meals Categories',
              }}
            />
            <Stack.Screen
              name='(meals)'
              options={{
                headerTitle: 'Meals Overview',
              }}
            />
          </Stack>
        </SafeAreaView>
      </QueryClientProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
