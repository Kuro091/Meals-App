import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { HomeButton } from '../../components/common/HomeButton';
import { ReactNode } from 'react';
import { NavigationHelpers, ParamListBase } from '@react-navigation/native';

export type BottomTabNavigationEventMap = {
  tabPress: { data: undefined; canPreventDefault: true };
  tabLongPress: { data: undefined };
};

interface PressableTabLinkProps {
  label:
    | string
    | ((props: { focused: boolean; color: string; position: any; children: string }) => ReactNode);
  isFocused: boolean;
  route: any;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
}

const getTabTextColor = (pressed = false, focused = false) => {
  if (pressed) {
    return 'black';
  } else if (focused) {
    return 'black';
  } else {
    return 'grey';
  }
};

function PressableTabLink({ isFocused, label, navigation, route }: PressableTabLinkProps) {
  return (
    <Pressable
      onPress={() => {
        const event = navigation.emit({
          target: route.key,
          type: 'tabPress',
          canPreventDefault: true,
        });

        if (!isFocused && !event.defaultPrevented) {
          navigation.navigate(route.name);
        }
      }}
      style={({ pressed }) => ({
        minHeight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        marginHorizontal: -8,
      })}
    >
      <Text
        style={{
          color: getTabTextColor(false, isFocused),
          padding: 8,
          textAlign: 'center',
          fontSize: 16,
          fontWeight: isFocused ? 'bold' : 'normal',
        }}
      >
        {typeof label === 'string' ? label : ''}
      </Text>
    </Pressable>
  );
}

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      tabBar={({ descriptors, insets, navigation, state }) => {
        //TODO: This is repetitive because not all the types have been exported/found out yet
        const { routes } = state;
        const half = Math.ceil(routes.length / 2);
        const firstHalf = routes.slice(0, half);
        const secondHalf = routes.slice(half, routes.length);

        return (
          <View
            style={{
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingBottom: insets.bottom + 20,
              paddingTop: insets.top,
            }}
          >
            {firstHalf.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index;

              return (
                <PressableTabLink
                  key={route.key}
                  label={label}
                  isFocused={isFocused}
                  route={route}
                  navigation={navigation}
                ></PressableTabLink>
              );
            })}
            <HomeButton
              style={{
                height: 100,
                borderRadius: 50,
                zIndex: 1,
              }}
            />
            {secondHalf.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;

              const isFocused = state.index === index + half;

              return (
                <PressableTabLink
                  key={route.key}
                  label={label}
                  isFocused={isFocused}
                  route={route}
                  navigation={navigation}
                ></PressableTabLink>
              );
            })}
          </View>
        );
      }}
    >
      <Tabs.Screen
        name='profile'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='home' color={color} />,
        }}
      />
      <Tabs.Screen
        name='settings'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <FontAwesome size={28} name='cog' color={color} />,
        }}
      />
    </Tabs>
  );
}
