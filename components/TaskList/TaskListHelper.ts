import { getListItem, Task } from '@/service';
import { TaskStatus } from '@/types';
import { useInfiniteQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';

export const useTaskListHelper = (status: TaskStatus) => {
  const [tasks, setTasks] = useState<
    { date: string; title: string; data: Task[] }[]
  >([]);
  const [deletedIds, setDeletedIds] = useState<Set<string>>(new Set());

  // NOTE: Retreive the data from api
  const { data, isFetching, hasNextPage, fetchNextPage } = useInfiniteQuery({
    queryKey: [status],
    queryFn: ({ pageParam }) => {
      return getListItem({
        status,
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
      let flatmap = data.pages.flatMap((p) => p.tasks);
      if (deletedIds.size !== 0) {
        flatmap = flatmap.filter((item) => !deletedIds.has(item.id));
      }
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

  const onDelete = (id: string) => {
    setTasks((prev) =>
      prev
        .map((task) => ({
          ...task,
          data: task.data.filter((item) => item.id !== id),
        }))
        .filter((task) => task.data.length > 0)
    );

    const tempDeleteIds = new Set(deletedIds);
    if (!tempDeleteIds.has(id)) {
      tempDeleteIds.add(id);
      setDeletedIds(tempDeleteIds);
    }
  };

  return {
    tasks,
    onEndReached,
    onDelete,
    isLoading: isFetching,
  };
};
