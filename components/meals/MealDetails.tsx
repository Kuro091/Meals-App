import { Text, TextStyle, View, ViewStyle } from 'react-native';
import Meal from '../../constants/Meal';

interface MealDetailsProps {
  meal?: Meal;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const TextItem = ({ value, style }: { value?: string; style?: TextStyle }) => (
  <Text
    style={[
      {
        marginHorizontal: 4,
        fontSize: 20,
      },
      style,
    ]}
  >
    {value}
  </Text>
);

const MealDetails = ({ meal, textStyle, style }: MealDetailsProps) => {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 8,
        },
        style,
      ]}
    >
      <TextItem value={`${meal?.duration}m`} style={textStyle} />
      <TextItem value={meal?.complexity.toUpperCase()} style={textStyle} />
      <TextItem value={meal?.affordability.toUpperCase()} style={textStyle} />
    </View>
  );
};
export default MealDetails;
