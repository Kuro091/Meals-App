import { useLocalSearchParams, usePathname } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { MEALS } from '../../constants/dummy-data';
import Meal from '../../constants/Meal';
import { MealItem } from '../../components/meals/MealItem';

function renderMealItem(itemData: Meal) {
  return <MealItem {...itemData} />;
}

export default function MealsOverview() {
  const { categoryId } = useLocalSearchParams<{
    categoryId: string;
  }>();

  const displayedMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(categoryId) >= 0);

  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
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
