import { DrawerNavigationProp } from '@react-navigation/drawer';
import { useNavigation } from 'expo-router';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function ProfileTab() {
  const navigation = useNavigation() as DrawerNavigationProp<{}>;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text>Profile tab</Text>
      <Button
        title='Open drawer'
        onPress={() => {
          navigation.openDrawer();
        }}
      ></Button>
    </View>
  );
}
