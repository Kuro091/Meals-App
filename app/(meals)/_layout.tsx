import { Stack } from 'expo-router';

export default function OverviewLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name='categories' />
      <Stack.Screen name='overview' />
    </Stack>
  );
}
