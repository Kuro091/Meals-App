import { DrawerNavigationProp } from '@react-navigation/drawer';
import { Link, router, useNavigation } from 'expo-router';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useMealsStore } from '../../storage/mealStore';
import { MEALS } from '../../constants/dummy-data';
import Meal from '../../constants/Meal';
import { MealItem } from '../../components/meals/MealItem';

export default function ProfileTab() {
  const navigation = useNavigation() as DrawerNavigationProp<{}>;
  const { favoriteMealIds } = useMealsStore();
  const favoriteMeals = MEALS.filter((meal) => favoriteMealIds.includes(meal.id));

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

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          padding: 20,
          width: '100%',
          gap: 10,
        }}
      >
        <Text style={{ fontSize: 12, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' }}>
          Current favorite meals:
        </Text>
        {favoriteMeals.length === 0 && <Text>None</Text>}
        {favoriteMeals.length > 0 && (
          <FlatList
            data={favoriteMeals}
            renderItem={({ item }) => renderMealItem(item)}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
      <Button
        title='Open drawer'
        onPress={() => {
          navigation.openDrawer();
        }}
      ></Button>
    </View>
  );
}
