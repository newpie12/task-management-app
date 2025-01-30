import { SafeAreaView, StyleSheet } from 'react-native';

import Header from '@/components/Header';
import TaskList from '@/components/TaskList/TaskList';
import { TaskStatus } from '@/types';

const Todo = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name="To-do" />
      <TaskList status={TaskStatus.TODO} />
    </SafeAreaView>
  );
};

export default Todo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
