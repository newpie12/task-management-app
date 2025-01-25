import { Stack } from 'expo-router';
import React from 'react';

import Done from '@/pages/Done';

const DonePage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Done' }} />
      <Done />
    </>
  );
};

export default DonePage;
