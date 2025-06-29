import { router, Stack } from "expo-router";
import { Alert, FlatList, Text, View } from "react-native";

import HeaderRight from "../../components/HeaderRight";
import Loading from "../../components/Loading";
import StyledButton from "../../components/StyledButton";
import useCollection from "../../firebase/hooks/useCollection";
import globalStyles from "../../styles/globalStyles";
import Book from "../../types/Book";
import { TextInput } from "react-native";
import { useState } from "react";
import useAuth from "@/firebase/hooks/useAuth";

export default function User() {
  const { loading,registerUser } = useAuth()
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('')
  const handleRegister = async () => {
    
  }          
  
  const cancel = () => {
    router.push('../home'); 
  }
  return (
    <View style={globalStyles.container}>
      <Stack.Screen
        options={{
          title: "Registro de Usuario",
          headerRight: () => <HeaderRight />,
        }}
      />

      <Text style={globalStyles.title}>User Registration</Text>
        <TextInput
          style={globalStyles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="User"
        />
        <TextInput
          style={globalStyles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry
        />
              
        <StyledButton
          title="Salvar"
          onPress={async () => {
              try{
                await registerUser(email,password)
              }
              catch(e){
                 alert(e) 
              }
            }}
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
