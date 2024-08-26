import { FlatList, GestureResponderEvent, ListRenderItemInfo } from 'react-native';
import { router, useNavigation } from 'expo-router';
import Category from '../../constants/models/Category';
import { CategoryGridTitle } from '../../components/meals/CategoryGridTitle';
import { CATEGORIES } from '../../constants/dummy-data';

const renderCategoryItem = (itemData: ListRenderItemInfo<Category>) => {
  const handlePress = (e: GestureResponderEvent) => {
    router.push({
      pathname: '/overview',
      params: { categoryId: itemData.item.id },
    });
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
