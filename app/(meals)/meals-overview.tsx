import { useLocalSearchParams, useNavigation, usePathname, useRouter } from 'expo-router';
import { FlatList, Text, View } from 'react-native';
import { CATEGORIES, MEALS } from '../../constants/dummy-data';
import Meal from '../../constants/Meal';
import { MealItem } from '../../components/meals/MealItem';
import { RootParamList } from './_layout';

export default function MealsOverview() {
  const { categoryId } = useLocalSearchParams<RootParamList['overview']>();

  const navigation = useNavigation();
  const router = useRouter();

  const category = CATEGORIES.find((category) => category.id === categoryId);

  const displayedMeals = MEALS.filter((meal) => meal.categoryIds.indexOf(categoryId) >= 0);

  function renderMealItem(itemData: Meal) {
    return (
      <MealItem
        meal={itemData}
        onPress={() => {
          router.push({
            pathname: '/meal-details',
            params: { mealId: itemData.id },
          });
        }}
      />
    );
  }

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: `Overview of category ${category?.title}`,
  //   } as NativeStackNavigationOptions);
  // }, []);

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
