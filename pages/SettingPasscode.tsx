import NumPad from '@/components/NumPad';
import PassCode from '@/components/PassCode';
import { usePasscodeStore } from '@/store/passcode';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, Pressable } from 'react-native';

const SettingPasscode = () => {
  const router = useRouter();
  const { setPassCode } = usePasscodeStore();
  const [typingPassCode, setTypingPassCode] = useState<(number | null)[]>(
    new Array(6).fill(null)
  );

  const [confirmPasscode, setConfirmPasscode] = useState<string | null>(null);

  // NOTE: Set value of typing passcode
  const onPressNumber = (number: number) => {
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
  const deleteAll = () => {
    setTypingPassCode(new Array(6).fill(null));
  };

  // NOTE: Check passcode from typing with setting passcode
  useEffect(() => {
    if (!typingPassCode.includes(null)) {
      if (!confirmPasscode) {
        setConfirmPasscode(typingPassCode.join(''));
      } else {
        if (typingPassCode.join('') === confirmPasscode) {
          setPassCode(typingPassCode.join(''));
          router.back();
        } else {
          setConfirmPasscode(null);
        }
      }
      deleteAll();
    }
  }, [typingPassCode]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center', gap: 8 }}>
        <Text style={styles.textStyle}>
          {!confirmPasscode ? 'Setting Passcode' : 'Confirm new passcord'}
        </Text>
        <Text style={{ color: 'grey' }}>
          {!confirmPasscode
            ? 'Enter a new passcode below'
            : 'Enter your passcode below'}
        </Text>
      </View>
      <View style={styles.passCodeContainer}>
        {typingPassCode.map((code, index) => (
          <PassCode key={index} isFill={code !== null} isError={false} />
        ))}
      </View>
      <NumPad onPress={onPressNumber} onDelete={onDeleteNumber} />
      <View style={styles.rowGoBackContainer}>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.goBackTextStyle}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SettingPasscode;

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
  rowGoBackContainer: {
    paddingTop: 16,
  },
  goBackTextStyle: {
    color: '#AA98A9',
    fontWeight: '600',
  },
});
