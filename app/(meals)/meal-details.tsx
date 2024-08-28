import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';
import { RootParamList } from './_layout';
import { MEALS } from '../../constants/dummy-data';

export default function MealDetailScreen() {
  const { mealId } = useLocalSearchParams<RootParamList['details']>();
  const meal = MEALS.find((meal) => meal.id === mealId);

  return <Text>Meal details screen {meal?.title}</Text>;
}
