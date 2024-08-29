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

const COLORS_MAP = {
  focused: {
    background: 'blue',
    textColor: 'white',
  },
  unfocused: {
    background: 'white',
    textColor: 'black',
  },
  pressed: {
    background: 'rgba(0, 0, 0, 0.1)',
    textColor: 'black',
  },
};

const getTabBackgroundColor = (pressed = false, focused = false) => {
  if (pressed) {
    return COLORS_MAP.pressed.background;
  }

  return focused ? COLORS_MAP.focused.background : COLORS_MAP.unfocused.background;
};

const getTabTextColor = (pressed = false, focused = false) => {
  if (pressed) {
    return COLORS_MAP.pressed.textColor;
  }

  return focused ? COLORS_MAP.focused.textColor : COLORS_MAP.unfocused.textColor;
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
        backgroundColor: getTabBackgroundColor(pressed, isFocused),
        flex: 1,
        marginHorizontal: -8,
      })}
    >
      <Text
        style={{
          color: getTabTextColor(false, isFocused),
          padding: 8,
          textAlign: 'center',
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
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-around',
              paddingBottom: insets.bottom - 20,
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
                height: 85,
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
          title: 'Home2',
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
