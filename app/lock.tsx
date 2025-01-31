import React from 'react';

import { Stack } from 'expo-router';

import LockScreen from '@/pages/LockScreen';

export default function Lock() {
  return (
    <>
      <Stack.Screen options={{ title: 'lock' }} />
      <LockScreen />
    </>
  );
}
