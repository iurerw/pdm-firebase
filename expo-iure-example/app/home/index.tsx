import { faker } from "@faker-js/faker";
import { router, Stack } from "expo-router";
import { Alert, FlatList, Text, View } from "react-native";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';


import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewBook from "../../components/ViewBook";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Book from "../../types/Book";

export default function Home() {
  const { data, create, remove, refreshData, loading } =
    useCollection<Book>("books");

  const createNewBook = () => {
    router.push('../register/')
  }

  const createUser = () => {
    router.push('../user/')
  }

  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Home",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Welcome</Text>

      <View style={globalStyles.iconsContainer}>
        <FontAwesome6 name="book" size={100} color="darkblue" 
          onPress={createNewBook}

        />
        <AntDesign name="adduser" size={100} color="darkgreen"
          onPress={createUser}
        />
      </View>

      {loading ? (
        <Loading />
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ViewBook
              book={item}
              onDelete={async () => {
                await remove(item.id!);
                await refreshData();
              }}
            />
          )}
          style={{ width: "100%" }}
        />
      )}
    </View>
  );
}
