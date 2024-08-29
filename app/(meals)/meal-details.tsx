import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect, useLayoutEffect } from 'react';
import {
  Button,
  GestureResponderEvent,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { RootParamList } from './_layout';
import { MEALS } from '../../constants/dummy-data';
import MealDetails from '../../components/meals/MealDetails';
import { useMealsStore, useShallowMealsStore } from '../../storage/mealStore';

const Subtitle = ({ children }: { children: string }) => (
  <View
    style={{
      borderBottomColor: '#312fc0',
      borderBottomWidth: 2,
      marginBottom: 8,
    }}
  >
    <Text
      style={{
        color: '#312fc0',
        fontSize: 18,
        fontWeight: 'bold',
        padding: 8,
        margin: 6,
      }}
    >
      ➡️{children}
    </Text>
  </View>
);

const List = ({ items }: { items: string[] }) => (
  <View>
    {items.map((item, index) => (
      <View
        style={{
          borderRadius: 6,
          paddingHorizontal: 8,
          paddingVertical: 4,
          marginVertical: 4,
          backgroundColor: '#f0f0f0',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}
        key={item}
      >
        <Text
          style={{
            color: '#312fc0',
            fontWeight: 'bold',
            marginRight: 8,
          }}
        >
          {index}.
        </Text>
        <Text>{item}</Text>
      </View>
    ))}
  </View>
);

const Heart = ({ fill }: { fill: boolean }) => (
  <View>
    {fill ? (
      <Text style={{ color: 'red', fontSize: 24 }}>❤️</Text>
    ) : (
      <Text style={{ color: 'grey', fontSize: 24 }}>🤍</Text>
    )}
  </View>
);

const HeaderRight = (filled = false, onPress: (e: GestureResponderEvent) => void) => (
  <Pressable onPress={onPress}>
    <Heart fill={filled} />
  </Pressable>
);

export default function MealDetailScreen() {
  const { mealId } = useLocalSearchParams<RootParamList['details']>();
  const meal = MEALS.find((meal) => meal.id === mealId);
  const navigation = useNavigation();
  const { favoriteMealIds, setFavoriteMealIds } = useShallowMealsStore();

  const handleFavoriteButtonPressed = (mealId: string) => {
    const index = favoriteMealIds.indexOf(mealId);
    if (index === -1) {
      setFavoriteMealIds([...favoriteMealIds, mealId]);
      return;
    }
    setFavoriteMealIds(favoriteMealIds.filter((id) => id !== mealId));
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        HeaderRight(favoriteMealIds.includes(mealId), () => handleFavoriteButtonPressed(mealId)),
    });
  }, [favoriteMealIds]);

  return (
    <ScrollView style={{ marginBottom: 36 }}>
      <Image source={{ uri: meal?.imageUrl }} height={350} />
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 24,
          margin: 8,
          textAlign: 'center',
          color: '#312fc0',
        }}
      >
        {meal?.title}
      </Text>
      <View
        style={{
          marginHorizontal: 24,
          marginVertical: 4,
        }}
      >
        <MealDetails
          meal={meal}
          textStyle={{
            color: '#0e0c94',
            fontSize: 16,
          }}
        />

        <Subtitle> Ingredients </Subtitle>
        <List items={meal?.ingredients || []} />

        <Subtitle> Steps </Subtitle>
        <List items={meal?.steps || []} />
      </View>
    </ScrollView>
  );
}
