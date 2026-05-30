import { useContext, useMemo, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { MoneyContext } from "../../contexts/GlobalState";

export default function Transactions() {
  const {
    transactions,
    loading,
    error,
    refresh,
    removeTransaction,
    userName,
  } = useContext(MoneyContext);
  const [month, setMonth] = useState("all");
const [year, setYear] = useState("all");

  async function handleDelete(id) {
    Alert.alert(
      "Excluir",
      "Deseja excluir a transação?",
      [
        {
          text: "Cancelar",
          style: "cancel",
        },
        {
          text: "Excluir",
          onPress: async () => {
            await removeTransaction(id);
          },
        },
      ]
    );
  }

const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const date = new Date(transaction.date);
  
      const transactionMonth = String(
        date.getMonth() + 1
      ).padStart(2, "0");
  
      const transactionYear =
        String(date.getFullYear());
  
      const monthMatch =
        month === "all" ||
        transactionMonth === month;
  
      const yearMatch =
        year === "all" ||
        transactionYear === year;
  
      return monthMatch && yearMatch;
    });
  }, [transactions, month, year]);

  if (loading) {
    return <Text>Carregando...</Text>;
  }

  if (error) {
    return <Text>{error}</Text>;
  }
  
  return (
  <>
    <View style={{ padding: 10 }}>
      <Text
  style={{
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  }}
>
  Bem-vindo, {userName || "Usuário"}!
</Text>
      <Text>Mês</Text>

      <Picker
        selectedValue={month}
        onValueChange={setMonth}
      >
        <Picker.Item label="Todos" value="all" />
        <Picker.Item label="Janeiro" value="01" />
        <Picker.Item label="Fevereiro" value="02" />
        <Picker.Item label="Março" value="03" />
        <Picker.Item label="Abril" value="04" />
        <Picker.Item label="Maio" value="05" />
        <Picker.Item label="Junho" value="06" />
        <Picker.Item label="Julho" value="07" />
        <Picker.Item label="Agosto" value="08" />
        <Picker.Item label="Setembro" value="09" />
        <Picker.Item label="Outubro" value="10" />
        <Picker.Item label="Novembro" value="11" />
        <Picker.Item label="Dezembro" value="12" />
      </Picker>

      <Text>Ano</Text>

      <Picker
        selectedValue={year}
        onValueChange={setYear}
      >
        <Picker.Item label="Todos" value="all" />
        <Picker.Item label="2025" value="2025" />
        <Picker.Item label="2026" value="2026" />
        <Picker.Item label="2027" value="2027" />
      </Picker>
    </View>

    <FlatList
      data={filteredTransactions}
      keyExtractor={(item) => item.id}
      onRefresh={refresh}
      refreshing={loading}
      renderItem={({ item }) => (
        <TouchableOpacity
          onLongPress={() => handleDelete(item.id)}
        >
          <View
            style={{
              padding: 16,
              borderBottomWidth: 1,
            }}
          >
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
              }}
            >
              {item.description}
            </Text>

            <Text>
              Categoria: {item.category.displayName}
            </Text>

            <Text>
              {new Date(item.date).toLocaleDateString("pt-BR")}
            </Text>

            <Text
              style={{
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              R$ {Number(item.value).toFixed(2)}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  </>
);
}