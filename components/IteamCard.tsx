import React from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

const styles = StyleSheet.create({
  card: {
    padding: 20,
    shadowColor: '#2B2B2B',
    shadowOffset: {
      height: 4,
      width: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 18,
    backgroundColor: 'white',
    borderRadius: 10,
    gap: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 17,
    lineHeight: 18,
  },
  description: {
    fontSize: 15,
    lineHeight: 15,
    color: '#76777A',
  },
  row: {
    paddingHorizontal: 20,
  },
  swipeableContainer: {
    width: 120,
  },
  deleteContainer: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    justifyContent: 'center',
    width: 120,
  },
  animatedSwipe: {
    flex: 1,
  },
  deleteText: {
    color: 'white',
    fontWeight: '600',
  },
  rightAction: {
    width: 70,
    backgroundColor: '#D2042D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    flexGrow: 1,
  },
});

function RightAction(prog: SharedValue<number>, drag: SharedValue<number>) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: drag.value + 90 }],
      padding: 0,
      paddingRight: 20,
    };
  });

  return (
    <Reanimated.View style={styleAnimation}>
      <TouchableOpacity style={styles.rightAction}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </Reanimated.View>
  );
}

export interface ItemProps {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  status: string;
}
const ItemCard = ({ item }: { item: ItemProps }) => {
  return (
    <Swipeable
      friction={2}
      enableTrackpadTwoFingerGesture
      rightThreshold={40}
      renderRightActions={RightAction}
    >
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </Swipeable>
  );
};

export default ItemCard;
