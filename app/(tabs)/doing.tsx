import { Stack } from 'expo-router';
import React from 'react';

import Doing from '@/pages/Doing';

const DonePage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Doing' }} />
      <Doing />
    </>
  );
};

export default DonePage;
