import { useRouter } from 'expo-router';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';

export function HomeButton({ style }: { style?: StyleProp<ViewStyle> }) {
  const router = useRouter();

  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? 'lightgrey' : 'white',
          borderRadius: 6,
          minWidth: 100,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}
      onPress={() => {
        router.replace('/');
      }}
    >
      <Text style={{ color: 'white', padding: 8, textAlign: 'center' }}>🏠</Text>
    </Pressable>
  );
}
