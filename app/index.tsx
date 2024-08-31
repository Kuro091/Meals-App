import { Href, Link, Redirect } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';
import { useMealsStore } from '../storage/mealStore';
import { MEALS } from '../constants/dummy-data';

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
  const { favoriteMealIds } = useMealsStore();
  const favoriteMeals = MEALS.filter((meal) => favoriteMealIds.includes(meal.id));

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          padding: 20,
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
          Current favorite meals:
        </Text>
        {favoriteMeals.length === 0 && ' None'}
        {favoriteMeals.length > 0 &&
          favoriteMeals.map((meal) => (
            <Link
              style={{
                backgroundColor: 'rgb(44, 27, 90)',
                color: 'white',
                padding: 10,
              }}
              key={meal.id}
              href={`/meal-details?mealId=${meal.id}`}
            >
              {meal.title}
            </Link>
          ))}
      </View>
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
