import { FlatList, GestureResponderEvent, ListRenderItemInfo } from 'react-native';
import { CATEGORIES } from '../constants/dummy-data';
import { CategoryGridTitle } from '../components/CategoryGridTitle';
import Category from '../constants/models/Category';
import { router } from 'expo-router';

const renderCategoryItem = (itemData: ListRenderItemInfo<Category>) => {
  const handlePress = (e: GestureResponderEvent) => {
    router.push('mealsOverview');
  };

  return (
    <CategoryGridTitle
      onPress={handlePress}
      title={itemData.item.title}
      color={itemData.item.color}
    />
  );
};

export default function CategoriesScreen() {
  return (
    <FlatList
      numColumns={2}
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
    />
  );
}
