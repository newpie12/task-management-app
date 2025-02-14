import { SafeAreaView, StyleSheet } from 'react-native';

import Header from '@/components/Header';
import { TaskStatus } from '@/types';
import TaskList from '@/components/TaskList/TaskList';

const Doing = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header name="Doing" />
      <TaskList status={TaskStatus.DOING} />
    </SafeAreaView>
  );
};

export default Doing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
