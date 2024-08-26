import { useLocalSearchParams, useNavigation, usePathname } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { CATEGORIES, MEALS } from '../../constants/dummy-data';
import Meal from '../../constants/Meal';
import { MealItem } from '../../components/meals/MealItem';
import { useEffect } from 'react';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack/types';

function renderMealItem(itemData: Meal) {
  return <MealItem {...itemData} />;
}

export default function MealsOverview() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();

  const navigation = useNavigation();
  const category = CATEGORIES.find((category) => category.id === categoryId);

  const displayedMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(categoryId) >= 0);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: `Overview of category ${category?.title}`,
    } as NativeStackNavigationOptions);
  }, []);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
      }}
    >
      <FlatList
        data={displayedMeals}
        renderItem={({ item }) => renderMealItem(item)}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
