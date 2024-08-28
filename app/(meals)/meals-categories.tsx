import { FlatList, GestureResponderEvent, ListRenderItemInfo } from 'react-native';
import { useRouter } from 'expo-router';
import Category from '../../constants/models/Category';
import { CategoryGridTitle } from '../../components/meals/CategoryGridTitle';
import { CATEGORIES } from '../../constants/dummy-data';

export default function CategoriesScreen() {
  const router = useRouter();

  const handlePress = (item: Category) => {
    router.push({
      pathname: '/meals-overview',
      params: { categoryId: item.id },
    });
  };

  const renderCategoryItem = (itemData: ListRenderItemInfo<Category>) => {
    return (
      <CategoryGridTitle
        onPress={(e) => handlePress(itemData.item)}
        title={itemData.item.title}
        color={itemData.item.color}
      />
    );
  };

  return (
    <FlatList
      numColumns={2}
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
    />
  );
}
