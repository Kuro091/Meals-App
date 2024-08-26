import { Stack } from 'expo-router';
import { Text } from 'react-native';

export default function OverviewLayout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitle: '👈',
        headerStyle: {
          backgroundColor: '#333333',
        },
        headerTintColor: 'white',
        contentStyle: {
          backgroundColor: 'lightgrey',
        },
      }}
    >
      <Stack.Screen name='categories' />
      <Stack.Screen name='overview' />
    </Stack>
  );
}
