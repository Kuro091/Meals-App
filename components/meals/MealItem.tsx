import { Image, ImageURISource, Platform, Pressable, Text, View } from 'react-native';
import Meal from '../../constants/Meal';
import { router } from 'expo-router';

const DetailItem = ({ label, value }: { label?: string; value: string }) => (
  <View
    style={{
      backgroundColor: 'lightgrey',
      borderRadius: 16,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 4,
      marginHorizontal: 4,
    }}
  >
    {label && (
      <Text
        style={{
          marginHorizontal: 4,
          fontSize: 12,
        }}
      >
        {label}:
      </Text>
    )}
    <Text
      style={{
        marginHorizontal: 4,
        fontSize: 12,
      }}
    >
      {value}
    </Text>
  </View>
);

export const MealItem = ({ title, imageUrl, affordability, complexity, duration }: Meal) => {
  return (
    <View
      style={{
        margin: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.56,
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
      }}
    >
      <Pressable
        android_ripple={{
          color: 'lightgray',
        }}
        style={({ pressed }) => ({
          opacity: pressed ? 0.5 : 1,
        })}
      >
        <View
          style={{
            borderRadius: 8,
            overflow: 'hidden',
          }}
        >
          <View>
            <Image
              src={imageUrl}
              style={{
                width: '100%',
                height: 200,
              }}
            />
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                padding: 8,
              }}
            >
              {title}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 8,
              justifyContent: 'center',
            }}
          >
            <DetailItem label='' value={duration.toString()} />
            <DetailItem label='' value={complexity} />
            <DetailItem label='' value={affordability} />
          </View>
        </View>
      </Pressable>
    </View>
  );
};
