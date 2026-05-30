import { useContext, useState } from "react";

import {
  View,
 Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";

import { MoneyContext } from "../../contexts/GlobalState";

export default function Categories() {
  const {
    categories,
    addCategory,
    removeCategory,
  } = useContext(MoneyContext);

  const [name, setName] = useState("");
  const [displayName, setDisplayName] = useState("");

  async function handleCreate() {
  try {
    await addCategory({
      name,
      displayName,
      icon: "category",
      background: "#82C9DE",
      isIncome: false,
    });

    setName("");
    setDisplayName("");
  } catch (_err) {
    alert("Categoria já existe");
  }
}

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Nome técnico</Text>

      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="health"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 12,
        }}
      />

      <Text>Nome exibido</Text>

      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Saúde"
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 12,
        }}
      />

      <Button
        title="Criar Categoria"
        onPress={handleCreate}
      />

      <FlatList
        data={categories}
        keyExtractor={(item) => item.id}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onLongPress={() =>
              removeCategory(item.id)
            }
          >
            <View
              style={{
                padding: 14,
                borderBottomWidth: 1,
              }}
            >
              <Text>{item.displayName}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}