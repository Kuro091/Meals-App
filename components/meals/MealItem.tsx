import { Text, View } from 'react-native';
import Meal from '../../constants/Meal';

export const MealItem = ({ title }: Meal) => {
  return (
    <View>
      <Text>{title}</Text>
    </View>
  );
};
