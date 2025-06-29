import { faker } from "@faker-js/faker";
import { Stack, useGlobalSearchParams } from "expo-router";
import { Alert, Text, View } from "react-native";

import HeaderRight from "../../../components/HeaderRight";
import Loading from "../../../components/Loading";
import StyledButton from "../../../components/StyledButton";
import useDocument from "../../../firebase/hooks/useDocument";
import globalStyles from "../../../styles/globalStyles";
import Book from "../../../types/Book";
import { useState } from "react";
import { TextInput } from "react-native";

export default function BookDetails() {
  const { id } = useGlobalSearchParams();

  // for convenience, you can extract data and rename it to "book" by typing data:your_alias_for_data
  const {
    data: book,
    loading,
    upsert,
  } = useDocument<Book>("books", id as string);
  const [activeUpdate, setActiveUpdate] = useState(false); 
  const [title, setTitle] = useState(''); 
  const [author, setAuthor] = useState(''); 
  const [pages, setPages] = useState(0); 
  const onChangeNumeric = (text:string) => {
    const number = parseInt(text); 
    if(!isNaN(number))
      setPages(number)
    else
      setPages(0)
  }

  const handlePress = () => {
    activeUpdate?setActiveUpdate(false):setActiveUpdate(true); 
    console.log(activeUpdate)
  }
  // important: always check for loading state since firestore is async!
  // Also, you can check for existence of book object so your type Book | undefined becomes a Book for sure
  if (loading || !book) return <Loading />;

  
  const salvar = async () => {
          try {
            console.log(title, author, pages)
            await upsert({
              ...book, // repeating the existing book object
              title: title.length > 0? title:book.title, 
              author: author.length > 0? author:book.author, 
              pages: pages > 0? pages:book.pages, 
            });
          } catch (error: any) {
            Alert.alert("Update Book error", error.toString());
          }
  }
  
  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Book",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>Book Details</Text>

      <Text>Title: {book.title}</Text>
      <Text>Author: {book.author}</Text>
      <Text>Pages: {book.pages}</Text>

      <StyledButton
        title="Update"
        onPress={handlePress}
      />
      <>
        {activeUpdate? (
          <>
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
        title="Salvar"
        onPress={salvar}
      />
          </>):
        (<></>)}
      </>

    </View>
  );
}
