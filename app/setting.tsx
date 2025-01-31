import React from 'react';

import { Stack } from 'expo-router';

import SettingPassCode from '@/pages/SettingPasscode';

export default function Setting() {
  return (
    <>
      <Stack.Screen options={{ title: 'setting' }} />
      <SettingPassCode />
    </>
  );
}
