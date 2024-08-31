import { Href, Link, Redirect } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';

const LinkButton = ({
  to,
  children,
  backgroundColor,
}: {
  to: Href<string | object>;
  children: string;
  backgroundColor: string;
}) => (
  <Link
    style={{
      backgroundColor,
      borderRadius: 8,
      margin: 8,
      padding: 20,
      fontSize: 20,
      color: 'white',
      fontWeight: 'bold',
    }}
    href={to}
  >
    {children}
  </Link>
);

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          columnGap: 10,
        }}
      >
        <LinkButton to='/meals-categories' backgroundColor='rgb(68, 1, 1)'>
          Categories (stack layout)
        </LinkButton>
        <LinkButton to='/profile' backgroundColor='rgb(44, 27, 90)'>
          Profile (tab layout)
        </LinkButton>
      </View>
    </SafeAreaView>
  );
}
