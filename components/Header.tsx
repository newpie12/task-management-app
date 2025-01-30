import { StyleSheet, Text, View } from 'react-native';

interface HeaderProps {
  name: string;
}

const Header = ({ name }: HeaderProps) => {
  return (
    <View style={styles.row}>
      <Text style={styles.textStyle}>{name}</Text>
      <View style={styles.divider} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  textStyle: {
    fontWeight: '700',
    fontSize: 30,
  },
  divider: {
    height: 1,
    backgroundColor: '#E8E8E6',
    marginTop: 10,
  },
});
