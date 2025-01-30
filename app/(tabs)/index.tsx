import { Stack } from 'expo-router';
import React from 'react';

import Todo from '@/pages/Todo';

const TodoPage = () => {
  return (
    <>
      <Stack.Screen options={{ title: 'Todo' }} />
      <Todo />
    </>
  );
};

export default TodoPage;
