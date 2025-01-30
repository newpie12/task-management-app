import { View } from 'react-native';

const PassCord = ({
  isFill = false,
  isError = false,
}: {
  isFill: boolean;
  isError: boolean;
}) => {
  return (
    <View
      style={{
        width: 20,
        height: 20,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: isError ? '#C41E3A' : '#CBC3E3',
        backgroundColor: isFill ? '#CBC3E3' : 'white',
      }}
    />
  );
};

export default PassCord;
