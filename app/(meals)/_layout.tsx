import { Stack, useNavigation } from 'expo-router';
import { NavigationProp, RouteProp, ParamListBase } from '@react-navigation/native';
import { CATEGORIES, MEALS } from '../../constants/dummy-data';
import { Button } from 'react-native';

export interface RootParamList {
  categories: undefined;
  overview: { categoryId: string };
  details: { mealId: string };
}

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
      <Stack.Screen
        name='meal-details'
        options={({
          navigation,
          route,
        }: {
          navigation: NavigationProp<ParamListBase>;
          route: RouteProp<ParamListBase>;
        }) => {
          const { mealId } = route.params as RootParamList['details'];
          const meal = MEALS.find((meal) => meal.id === mealId);

          return {
            headerTitle: `${meal?.title}`,
          };
        }}
      />
      <Stack.Screen
        name='meals-categories'
        options={{
          headerTitle: 'Categories',
        }}
      />
      <Stack.Screen
        name='meals-overview'
        options={({
          navigation,
          route,
        }: {
          navigation: NavigationProp<ParamListBase>;
          route: RouteProp<ParamListBase>;
        }) => {
          const { categoryId } = route.params as RootParamList['overview'];
          const category = CATEGORIES.find((category) => category.id === categoryId);

          return {
            headerTitle: `${category?.title.toUpperCase()}`,
            headerRight: () => (
              <Button
                title='Category'
                onPress={() => {
                  navigation.navigate('meals-categories');
                }}
              />
            ),
          };
        }}
      />
    </Stack>
  );
}
