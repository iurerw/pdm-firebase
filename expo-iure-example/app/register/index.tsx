import { faker } from "@faker-js/faker";
import { router, Stack } from "expo-router";
import { Alert, FlatList, Text, View } from "react-native";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import ViewBook from "../../components/ViewBook";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Book from "../../types/Book";
import { TextInput } from "react-native";
import { useState } from "react";

export default function Register() {
  const { data, create, remove, refreshData, loading } = useCollection<Book>("books");
  const [title, setTitle] = useState(''); 
  const [author, setAuthor] = useState(''); 
  const [pages, setPages] = useState(0); 

  const handleRegister = async () => {
    try {
      if(title.length > 0 && author.length > 0 && pages > 0){

        await create({
            title,
            author,
            pages
        });
        refreshData();
        router.push('../home'); 
      }
      else{
        Alert.alert("Preencha todos os campos");

      }

    } catch (error: any) {
      Alert.alert("Create Book error", error.toString());
    }
  }          
  
  const onChangeNumeric = (text:string) => {
    const number = parseInt(text); 
    if(!isNaN(number))
    {
      setPages(number)
    }
    else{
      setPages(0)
    }
  }

  const cancel = () => {
    router.push('../home'); 
  }
  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Cadastro de Livro",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Book Registration</Text>
        <TextInput
          style={globalStyles.input}
          onChangeText={setTitle}
          value={title}
          placeholder="Titulo"
        />
        <TextInput
          style={globalStyles.input}
          onChangeText={setAuthor}
          value={author}
          placeholder="Autor"
        />
        <TextInput
          style={globalStyles.input}
          onChangeText={onChangeNumeric}
          value={pages.toString()}
          keyboardType="numeric"
          placeholder="Paginas"
        />
      
        <StyledButton
          title="Create book"
          onPress={handleRegister}
        />

        <StyledButton
          title="Cancel"
          onPress={cancel}
        />
      {loading ? (
        <Loading />
      ) : (
        <View></View>
      )}
    </View>
  );
}
