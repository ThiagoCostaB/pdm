import { useContext, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Button,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { MoneyContext } from "../../contexts/GlobalState";

export default function AddTransactions() {
  const { categories, addTransaction } =
    useContext(MoneyContext);

  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");

  const [categoryId, setCategoryId] =
    useState("");

  async function handleAdd() {
    if (!categoryId) return;

    await addTransaction({
      description,
      value: Number(value),
      date: new Date(),
      categoryId,
    });

    setDescription("");
    setValue("");
  }

  return (
    <View style={{ padding: 20, gap: 12 }}>
      <Text>Descrição</Text>

      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Digite a descrição"
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Text>Valor</Text>

      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder="Digite o valor"
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          padding: 10,
        }}
      />

      <Text>Categoria</Text>

      <Picker
        selectedValue={categoryId}
        onValueChange={(itemValue) =>
          setCategoryId(itemValue)
        }
      >
        <Picker.Item
          label="Selecione uma categoria"
          value=""
        />

        {categories.map((item) => (
          <Picker.Item
            key={item.id}
            label={item.displayName}
            value={item.id}
          />
        ))}
      </Picker>

      <Button
        title="Salvar"
        onPress={handleAdd}
      />
    </View>
  );
}