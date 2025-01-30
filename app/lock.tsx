import React from 'react';

import { Stack } from 'expo-router';
import { StyleSheet } from 'react-native';

import LockScreen from '@/pages/LockScreen';

export default function Lock() {
  return (
    <>
      <Stack.Screen options={{ title: 'lock' }} />
      <LockScreen />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
