import {
  AspectRatio,
  Center,
  Box,
  FlatList,
  HStack,
  VStack,
  Image,
  Text,
  View,
  Heading,
} from 'native-base';
import React, { useCallback, useMemo } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppBar from 'src/components/AppBar';
import { GetPlayListDetail, GetSongDetail } from 'src/services/queries/music';
import { map } from 'lodash';
import { RefreshControl } from 'react-native';

function PlayListDetail({ route }: { route: Record<string, any> }) {
  const { id } = route.params;

  const { isLoading, isFetching, data }: any = GetPlayListDetail(id);

  const songIds: string[] = map(data?.playlist?.trackIds, 'id');

  const {
    isLoading: songLoading,
    isFetching: songFetching,
    data: songData,
  }: any = GetSongDetail(songIds.join(','));

  const renderItem = useCallback(
    ({ item, index }: any) => {
      return (
        <TouchableOpacity onPress={() => {}}>
          <Box h="10" py="2" mt="2">
            <HStack>
              <HStack pt="2">
                <Text color="coolGray.600">{index + 1}</Text>
              </HStack>
              <VStack mx="3">
                <Text>{item.name}</Text>
                <Text
                  isTruncated
                  fontSize="12"
                  color="coolGray.600"
                  _dark={{
                    color: 'warmGray.200',
                  }}>
                  {item.ar[0]['name']} - {item.al.name}
                </Text>
              </VStack>
            </HStack>
          </Box>
        </TouchableOpacity>
      );
    },
    [data],
  );

  const avatarUrl = useMemo(() => {
    const url = data?.playlist?.creator?.avatarUrl.replace('http:', 'https:');
    return url;
  }, [data?.playlist?.creator]);

  /*   const backgroundUrl = useMemo(() => {
    const url = data?.playlist?.creator?.backgroundUrl.replace(
      'http:',
      'https:',
    );
    return url;
  }, [data?.playlist?.creator]);
 */

  return (
    <Box>
      <AppBar title="歌单详情" />
      <HStack h="150" p="4" bg="lightBlue.300">
        <VStack h="120" w="120">
          {data?.playlist?.coverImgUrl && (
            <Image
              h="120"
              w="120"
              borderRadius="20"
              source={{
                uri: data?.playlist?.coverImgUrl,
              }}
              alt="cover"
            />
          )}
        </VStack>
        <Box ml="3" flex="1">
          <Heading size="sm">{data?.playlist?.name}</Heading>
          <HStack mt="4">
            {avatarUrl && (
              <Image
                h="6"
                w="6"
                borderRadius="16"
                source={{
                  uri: avatarUrl,
                }}
                alt="avatar"
              />
            )}
            <Text mx="2">{data?.playlist?.creator?.nickname}</Text>
          </HStack>
          <Text mt="4" isTruncated>
            {data?.playlist?.description}
          </Text>
        </Box>
      </HStack>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={songFetching || songLoading} />
        }
        p="4"
        data={songData?.songs || []}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
      />
    </Box>
  );
}

export default PlayListDetail;
