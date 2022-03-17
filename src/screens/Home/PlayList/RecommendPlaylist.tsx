import { Box, ScrollView, Spinner } from 'native-base';
import React, { useCallback, useState } from 'react';
import { RefreshControl } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { doGet } from 'src/services/http-client';
import PlayListCard from './PlayListCard';

function PlayList() {
  const [refreshing, setRefreshing] = React.useState(false);

  const [before, setBefore] = useState();
  const {
    status,
    data,
    error,
    isLoading,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    refetch,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
    ['playlists', before],
    async () => {
      const res = await doGet('/top/playlist/highquality', {
        before,
        limit: 10,
      });
      return res;
    },
    {
      getPreviousPageParam: firstPage => firstPage?.previousId ?? false,
      getNextPageParam: lastPage => lastPage?.nextId ?? false,
    },
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    refetch();
    setRefreshing(false);
  }, [setRefreshing]);

  const isCloseToBottom = useCallback(
    ({ layoutMeasurement, contentOffset, contentSize }) => {
      const paddingToBottom = 20;
      return (
        layoutMeasurement.height + contentOffset.y >=
        contentSize.height - paddingToBottom
      );
    },
    [],
  );

  return (
    <ScrollView
      onScroll={({ nativeEvent }) => {
        if (isCloseToBottom(nativeEvent)) {
          console.log('滚动到底部');
        }
      }}
      scrollEventThrottle={400}
      refreshControl={
        <RefreshControl
          tintColor="#e70625"
          colors={['#e70625']}
          refreshing={refreshing || isLoading}
          onRefresh={onRefresh}
        />
      }>
      <Box flex="1" justifyContent="center" alignItems="center">
        {data?.pages?.map((page, pageIndex) => {
          return (
            <React.Fragment key={pageIndex}>
              {page?.playlists?.map((item: any, itemIndex: number) => {
                if (
                  pageIndex === data?.pages.length - 1 &&
                  itemIndex === page.playlists.length - 1
                ) {
                }
                return <PlayListCard key={item.id} data={item} />;
              })}
            </React.Fragment>
          );
        })}
      </Box>
    </ScrollView>
  );
}

export default PlayList;
