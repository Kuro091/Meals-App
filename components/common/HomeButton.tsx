import { useRouter } from 'expo-router';
import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        router.push('/');
      }}
    >
      <Text style={{ color: 'white', padding: 8, textAlign: 'center' }}>
        <Ionicons name='home' size={30} color='black' />
      </Text>
    </Pressable>
  );
}
