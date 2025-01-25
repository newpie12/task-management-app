import { Stack } from 'expo-router';
import React from 'react';

import Main from '@/pages/Main';

const Todo = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Todo' }} />
      <Main />
    </>
  );
};

export default Todo;
