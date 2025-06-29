import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Text, TextInput, View } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

import Loading from "../components/Loading";
import StyledButton from "../components/StyledButton";
import useAuth from "../firebase/hooks/useAuth";
import globalStyles from "../styles/globalStyles";

export default function _screen() {
  const { user, login, loading } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("123456");

  useEffect(() => {
    if (user) {
      router.replace("/home/");
    }
  }, [user]);

  if (loading) return <Loading />;

  return (
    
    <View style={globalStyles.container}>
      <Entypo name="open-book" size={200} color="black" />
      <Text style={globalStyles.title}>
      Sign Up
      </Text>
      <TextInput
        style={globalStyles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={globalStyles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <StyledButton
        title="Login"
        onPress={async () => {
          try {
            await login(email, password);
            router.push("/home/");
          } catch (error: any) {
            Alert.alert("Login error", error.toString());
          }
        }}
        style={{ marginTop: 12 }}
      />
    </View>
  );
}
