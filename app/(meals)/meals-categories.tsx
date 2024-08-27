import { FlatList, GestureResponderEvent, ListRenderItemInfo } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import Category from '../../constants/models/Category';
import { CategoryGridTitle } from '../../components/meals/CategoryGridTitle';
import { CATEGORIES } from '../../constants/dummy-data';
import { useEffect } from 'react';
import { NativeStackNavigationOptions } from 'react-native-screens/lib/typescript/native-stack/types';

export default function CategoriesScreen() {
  const navigation = useNavigation();
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

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerTitle: 'Categories',
  //   } as NativeStackNavigationOptions);
  // }, []);

  return (
    <FlatList
      numColumns={2}
      data={CATEGORIES}
      keyExtractor={(item) => item.id}
      renderItem={renderCategoryItem}
    />
  );
}
