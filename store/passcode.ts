import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UsePasscodeState {
  passcode: string;
}
interface UsePasscodeAction {
  setPassCode: (value: string) => void;
}

export const usePasscodeStore = create<UsePasscodeState & UsePasscodeAction>()(
  persist(
    (set) => ({
      passcode: '123456',
      setPassCode: (value: string) => {
        set({ passcode: value });
      },
    }),
    {
      name: 'passcodeStorage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
