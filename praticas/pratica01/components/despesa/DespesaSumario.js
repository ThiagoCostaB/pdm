import { View, Text } from "react-native";

function DespesaSumario({despesas, periodo}){
    const somaDespesas = despesas.reduce((total, depesa) => {
        return total + depesa.valor;
    }, 0);

    return(
        <View>
            <Text>{periodo}</Text>
            <Text>R${somaDespesas.toFixed(2)}</Text>
        </View>
    );
}

export default DespesaSumario;