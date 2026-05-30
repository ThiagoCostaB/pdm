import { useState, useContext} from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { MoneyContext } from "../contexts/GlobalState";
import { router } from "expo-router";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const { setUserName } = useContext(MoneyContext);

  function handleLogin() {
    if (user.trim() && password === "1234"){
        setUserName(user);
        setUserName(user);
        router.replace("/(tabs)");
    } else {
      Alert.alert(
        "Erro",
        "Usuário ou senha inválidos"
      );
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        gap: 12,
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        Gestão Financeira
      </Text>

      <TextInput
        placeholder="Usuário"
        value={user}
        onChangeText={setUser}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Button
        title="Entrar"
        onPress={handleLogin}
      />
    </View>
  );
}