import React from 'react';
import { GestureResponderEvent, Platform, Pressable, Text, View } from 'react-native';
import Category from '../../constants/models/Category';

export const CategoryGridTitle = ({
  title,
  color,
  onPress,
}: Partial<Category> & { onPress: (e: GestureResponderEvent) => void }) => {
  return (
    <View
      style={{
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,

        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      }}
    >
      <Pressable
        onPress={onPress}
        android_ripple={{
          color: 'lightgray',
        }}
        style={({ pressed }) => ({
          flex: 1,
          backgroundColor: color,
          borderRadius: 8,
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View style={{ flex: 1, padding: 16, justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: 16,
              color: '#fff',
            }}
          >
            {title}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};
