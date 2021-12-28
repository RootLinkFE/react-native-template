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
} from 'native-base';
import React, { useCallback } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AppBar from 'src/components/AppBar';
import { GetPlayListDetail } from 'src/services/queries/music';

function PlayListDetail({ route }: { route: Record<string, any> }) {
  const { id } = route.params;

  const { isLoading, isFetching, data }: any = GetPlayListDetail(id);

  const renderItem = useCallback(
    ({ item, index }: any) => {
      return (
        <TouchableOpacity onPress={() => {}}>
          <Box h="10" py="2" mt="2">
            <HStack>
              <HStack pt="2">
                <Text color="coolGray.600">{index}</Text>
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

  return (
    <View>
      <AppBar title="歌单详情" />
      <HStack h="200" p="4" bg="lightBlue.300">
        <VStack>
          <Image
            h="120"
            w="120"
            borderRadius="20"
            source={{
              uri: data?.playlist?.coverImgUrl,
            }}
            alt="cover"
          />
        </VStack>
        <VStack mx="2">
          <Text>{data?.playlist?.name}</Text>
          <Text>{data?.playlist?.creator?.nickname}</Text>
          <Text isTruncated>{data?.playlist?.description}</Text>
        </VStack>
      </HStack>
      <FlatList
        p="4"
        data={data?.playlist?.tracks || []}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
      />
    </View>
  );
}

export default PlayListDetail;
