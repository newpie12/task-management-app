import {
  View,
  StyleSheet,
  Text,
  SectionList,
  ActivityIndicator,
} from 'react-native';
import ItemCard from '../ItemCard';
import { useTaskListHelper } from './TaskListHelper';
import { TaskStatus } from '@/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Skeleton from '../Skeleton';

interface TaskListProps {
  status: TaskStatus;
}
const TaskList = ({ status }: TaskListProps) => {
  const { tasks, onEndReached, onDelete, isLoading } =
    useTaskListHelper(status);

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <SectionList
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            return <ItemCard key={item.id} item={item} onDelete={onDelete} />;
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
            </View>
          )}
          sections={tasks}
          ListFooterComponent={() =>
            isLoading && (
              <View>
                <Skeleton />
              </View>
            )
          }
        />
      </View>
    </GestureHandlerRootView>
  );
};

export default TaskList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    gap: 8,
    paddingBottom: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  headerText: {
    fontWeight: '700',
    fontSize: 16,
  },
});
