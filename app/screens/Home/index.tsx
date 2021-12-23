import AppBar from 'app/components/AppBar';
import { GetUserDetails } from 'app/services/react-query/queries/user';
import { useStore } from 'app/store';
import { VStack, Box, HStack, Divider, Image, Text } from 'native-base';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import styles from './styles';

const Home: React.FC = () => {
  const setIsLoggedIn = useStore(state => state.setIsLoggedIn);
  const { isLoading, isFetching, data = { results: [] } } = GetUserDetails();

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
      <AppBar onLogOut={onLogOut} />
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

export default Home;
