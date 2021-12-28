import React, { useMemo } from 'react';
import {
  Box,
  Heading,
  AspectRatio,
  Image,
  Text,
  View,
  Center,
  HStack,
  Stack,
} from 'native-base';
import { dateFormat } from '../../../utils/dateUtils';
import NavigationService from 'src/navigation/NavigationService';

function PlayListCard({ data }: { data: Record<string, any> }) {
  const coverImgUrl = useMemo(() => {
    return data?.coverImgUrl.replace('http:', 'https:');
  }, [data?.coverImgUrl]);

  return (
    <Box
      maxW="80"
      mt="4"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1"
      _dark={{
        borderColor: 'coolGray.600',
        backgroundColor: 'gray.700',
      }}
      _web={{
        shadow: 2,
        borderWidth: 0,
      }}
      _light={{
        backgroundColor: 'gray.50',
      }}>
      <Box>
        <AspectRatio w="100%" ratio={16 / 9}>
          {coverImgUrl && (
            <Image
              source={{
                uri: coverImgUrl,
              }}
              alt="image"
            />
          )}
        </AspectRatio>
        <Center
          bg="violet.500"
          _dark={{
            bg: 'violet.400',
          }}
          _text={{
            color: 'warmGray.50',
            fontWeight: '700',
            fontSize: 'xs',
          }}
          position="absolute"
          bottom="0"
          px="3"
          py="1.5">
          {data?.tags?.join(' ')}
        </Center>
      </Box>
      <Stack p="4" space={3}>
        <Stack space={2}>
          <Heading
            size="md"
            ml="-1"
            onPress={() => {
              NavigationService.navigate('PlayListDetail', { id: data.id });
            }}>
            {data?.name}
          </Heading>
          <Text
            fontSize="xs"
            _light={{
              color: 'violet.500',
            }}
            _dark={{
              color: 'violet.400',
            }}
            fontWeight="500"
            ml="-0.5"
            mt="-1"
            onPress={() => $toast('滚动到底部')}>
            播放次数：{data?.subscribedCount / 100} 万次
          </Text>
        </Stack>
        <Text fontWeight="400">{data?.description.substring(0, 40)}…</Text>
        <HStack alignItems="center" space={4} justifyContent="space-between">
          <HStack alignItems="center">
            <Text
              color="coolGray.600"
              _dark={{
                color: 'warmGray.200',
              }}
              fontWeight="400">
              {dateFormat(data?.updateTime)}
            </Text>
          </HStack>
        </HStack>
      </Stack>
    </Box>
  );
}

export default PlayListCard;
