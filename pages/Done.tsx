import { SafeAreaView, StyleSheet } from 'react-native';

import Header from '@/components/Header';
import { TaskStatus } from '@/types';
import TaskList from '@/components/TaskList/TaskList';

const Done = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Done" />
      <TaskList status={TaskStatus.DONE} />
    </SafeAreaView>
  );
};

export default Done;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
