import NumPad from '@/components/NumPad';
import PassCode from '@/components/PassCode';
import { usePasscodeStore } from '@/store/passcode';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';

const LockScreen = () => {
  const router = useRouter();
  const { passcode } = usePasscodeStore();
  const [typingPassCode, setTypingPassCode] = useState<(number | null)[]>(
    new Array(6).fill(null)
  );
  const [wrongPassCode, setWrongPassCode] = useState<boolean>(false);

  // NOTE: Set value of typing passcode
  const onPressNumber = (number: number) => {
    setWrongPassCode(false);
    const codeNullIndex = typingPassCode.findIndex((code) => code === null);
    setTypingPassCode((prev) =>
      prev.map((value, i) => (i === codeNullIndex ? number : value))
    );
  };

  // NOTE: Set value when press delete button for remove latest passcode
  const onDeleteNumber = () => {
    const codeNullIndex = typingPassCode.findLastIndex((code) => code !== null);
    setTypingPassCode((prev) =>
      prev.map((value, i) => (i === codeNullIndex ? null : value))
    );
  };

  // NOTE: Set all passcode when typing wrong error
  const deletePasscodeAll = () => {
    setTypingPassCode(new Array(6).fill(null));
  };

  // NOTE: Check passcode from typing with setting passcode
  useEffect(() => {
    if (!typingPassCode.includes(null)) {
      if (typingPassCode.join('') === passcode) {
        router.replace('/(tabs)');
      } else {
        setWrongPassCode(true);
        deletePasscodeAll();
      }
    }
  }, [typingPassCode]);

  const reset = () => {
    deletePasscodeAll();
    setWrongPassCode(false);
  };

  useEffect(() => {}, []);
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={styles.textStyle}>
          {wrongPassCode ? 'Incorrect passcode' : 'Enter passcode'}
        </Text>
        <Text style={{ color: 'grey' }}>
          {wrongPassCode
            ? 'The passcode is incorrect. Please try again'
            : 'Enter your passcode below'}
        </Text>
      </View>
      <View style={styles.passCodeContainer}>
        {typingPassCode.map((code, index) => (
          <PassCode
            key={index}
            isFill={code !== null}
            isError={wrongPassCode}
          />
        ))}
      </View>
      <NumPad onPress={onPressNumber} onDelete={onDeleteNumber} />
      <View style={styles.rowSettingContainer}>
        <Pressable
          onPress={() => {
            router.push('/setting');
            reset();
          }}
        >
          <Text style={styles.settingTextStyle}>Forgot your passcode</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LockScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 19,
    fontWeight: '600',
  },
  textErrorStyle: {
    color: '#C41E3A',
  },
  passCodeContainer: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  rowSettingContainer: {
    paddingTop: 16,
  },
  settingTextStyle: {
    color: '#AA98A9',
    fontWeight: '600',
  },
});
