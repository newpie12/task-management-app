import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

interface NumPadProps {
  onPress: (value: number) => void;
  onDelete: () => void;
}
const NumPad = ({ onPress, onDelete }: NumPadProps) => {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, undefined, 0, 'DELETE'];
  const rows = [];
  for (let i = 0; i < numbers.length; i += 3) {
    rows.push(numbers.slice(i, i + 3));
  }

  return (
    <View style={styles.container}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((num, index) => {
            switch (typeof num) {
              case 'number':
                return (
                  <TouchableOpacity
                    onPress={() => onPress(num)}
                    key={index}
                    style={styles.button}
                  >
                    <Text style={styles.textStyle}>{num}</Text>
                  </TouchableOpacity>
                );
              case 'string':
                return (
                  <TouchableOpacity
                    onPress={() => onDelete()}
                    key={index}
                    style={styles.deleteBoxStyle}
                  >
                    <FontAwesome6 name="delete-left" size={24} color="black" />
                  </TouchableOpacity>
                );
              case 'undefined':
                return <View key={index} style={styles.emptyBoxStyle} />;
            }
          })}
        </View>
      ))}
    </View>
  );
};

export default NumPad;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  row: {
    gap: 32,
    flexDirection: 'row',
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 21,
  },
  emptyBoxStyle: {
    width: 70,
    height: 70,
  },
  deleteBoxStyle: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
