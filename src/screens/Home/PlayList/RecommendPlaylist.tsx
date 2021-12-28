import { Box, Spinner } from 'native-base';
import React from 'react';
import { GetTopPlayList } from 'src/services/queries/music';
import PlayListCard from './PlayListCard';

function PlayList() {
  const { isLoading, isFetching, data = [] }: any = GetTopPlayList();

  return (
    <Box flex="1" justifyContent="center" alignItems="center">
      {isLoading || isFetching ? (
        <Spinner size="lg" style={{ marginTop: 18 }} />
      ) : (
        data?.map((item: any) => {
          return <PlayListCard key={item.id} data={item} />;
        })
      )}
    </Box>
  );
}

export default PlayList;
