import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native';
import { RootParamList } from './_layout';
import { MEALS } from '../../constants/dummy-data';
import MealDetails from '../../components/meals/MealDetails';

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

export default function MealDetailScreen() {
  const { mealId } = useLocalSearchParams<RootParamList['details']>();
  const meal = MEALS.find((meal) => meal.id === mealId);

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
