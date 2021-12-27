import AppBar from 'src/components/AppBar';
import { GetUserDetails } from 'src/services/queries/user';
import { useStore } from 'src/store';
import { VStack, Box, HStack, Divider, Image, Text } from 'native-base';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import styles from './styles';

const Characters: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const {
    isLoading,
    isFetching,
    data = { results: [] },
  }: any = GetUserDetails();

  const onLogOut = () => {
    setIsLoggedIn(false);
  };

  const renderItem = ({ item }: any) => (
    <HStack
      direction="row"
      mb="2.5"
      mt="1.5"
      rounded="lg"
      overflow="hidden"
      borderColor="coolGray.200"
      borderWidth="1">
      <Box>
        <Image
          source={{
            uri: item.image,
          }}
          alt="item"
          size="xl"
        />
      </Box>
      <VStack space="4" divider={<Divider />} width="100%">
        <Box px="4" pt="2">
          <Text bold>{item.name}</Text>
        </Box>
        <Box px="4">
          <Text mb={1} mt={-2}>
            Status: {item.status}
          </Text>
          <Text mb={1}>Species: {item.species}</Text>
          <Text mb={1}>Gender: {item.gender}</Text>
        </Box>
      </VStack>
    </HStack>
  );

  return (
    <View style={styles.container}>
      <AppBar title={'用户详情'} />
      <FlatList
        data={data.results}
        renderItem={renderItem}
        keyExtractor={(item: any) => item.id}
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={isLoading || isFetching}
            onRefresh={() => {}}
          />
        }
      />
    </View>
  );
};

export default Characters;
