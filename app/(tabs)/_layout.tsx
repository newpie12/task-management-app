import { Entypo, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'To-do',
          tabBarIcon: ({ color }) => (
            <Entypo color={color} name="documents" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="doing"
        options={{
          tabBarLabel: 'Doing',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              color={color}
              name="progress-pencil"
              size={24}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="done"
        options={{
          headerTitle: 'Done',
          tabBarIcon: ({ color }) => (
            <Feather color={color} name="check-circle" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
