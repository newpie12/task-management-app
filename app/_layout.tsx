import { router, Stack } from 'expo-router';
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import { useEffect, useState, useCallback, useRef } from 'react';
import { Alert, AppState } from 'react-native';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      console.log('[Error]', error?.message);
      Alert.alert('Something went wrong !');
    },
  }),
});

export default function RootLayout() {
  const timeoutId = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }

      if (nextAppState !== 'active') {
        timeoutId.current = setTimeout(() => {
          router.replace('/lock');
        }, 10000);
      }
    });

    return () => {
      subscription.remove();
      clearTimeout(timeoutId.current);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="lock" />
        <Stack.Screen name="setting" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="+not-found" />
      </Stack>
    </QueryClientProvider>
  );
}
