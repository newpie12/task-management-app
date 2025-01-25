import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  SectionList,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Header from '@/components/Header';
import ItemCard from '@/components/IteamCard';
import type { Task } from '@/service';
import { getListItem } from '@/service';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    gap: 8,
    paddingBottom: 30,
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

const Doing = () => {
  const [tasks, setTasks] = useState<
    { date: string; title: string; data: Task[] }[]
  >([]);
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: ['getDoingList'],
    queryFn: ({ pageParam }) => {
      return getListItem({
        status: 'DOING',
        offset: pageParam,
        limit: 10,
        sortBy: 'createdAt',
        sortDirection: 'ASC',
      });
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (lastPage.pageNumber === lastPage.totalPages) {
        return undefined;
      }

      return lastPageParam + 1;
    },
  });

  const onEndReached = useCallback(() => {
    if (data && data.pages.length > 0 && !isFetching && hasNextPage) {
      fetchNextPage();
    }
  }, [data, fetchNextPage, hasNextPage, isFetching]);

  useEffect(() => {
    if (data) {
      const flatmap = data.pages.flatMap((p) => p.tasks);
      const reduce = flatmap.reduce(
        (
          group: { date: string; title: string; data: Task[] }[],
          item: Task
        ) => {
          const date = dayjs(item.createdAt).format('YYYY-MM-DD');
          if (group.length === 0) {
            group.push({
              date,
              title: dayjs(item.createdAt).format('DD MMMM YYYY'),
              data: [item],
            });
            return group;
          }

          const groupIndex = group.findIndex((i) => i.date === date);
          if (groupIndex < 0) {
            group.push({
              date,
              title: dayjs(item.createdAt).format('DD MMMM YYYY'),
              data: [item],
            });
          } else {
            group[groupIndex]?.data.push(item);
          }

          return group;
        },
        []
      );
      setTasks(reduce);
    }
  }, [data]);

  return (
    <SafeAreaView style={styles.container}>
      <Header name="Doing" />
      <View style={styles.container}>
        <SectionList
          contentContainerStyle={styles.listContainer}
          keyExtractor={(item) => item.id}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          renderItem={({ item }) => {
            return <ItemCard key={item.id} item={item} />;
          }}
          renderSectionHeader={({ section: { title } }) => (
            <View style={styles.header}>
              <Text style={styles.headerText}>{title}</Text>
            </View>
          )}
          sections={tasks}
        />
      </View>
    </SafeAreaView>
  );
};

export default Doing;
