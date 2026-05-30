import { useContext, useMemo } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { PieChart } from "react-native-chart-kit";

import { MoneyContext } from "../../contexts/GlobalState";
import SummaryItem from "../../components/SummaryItem";
import { colors } from "../../constants/colors";
import { globalStyles } from "../../styles/globalStyles";

export default function Summary() {
  const { transactions, categories } = useContext(MoneyContext);

  const totals = useMemo(() => {
    const categoryTotals = {};
    let sum = 0;

    categories.forEach((category) => {
      categoryTotals[category.id] = 0;
    });

    transactions.forEach((transaction) => {
      const value = Number(transaction.value);

      categoryTotals[transaction.categoryId] =
        (categoryTotals[transaction.categoryId] || 0) + value;

      if (transaction.category?.isIncome) {
        sum += value;
      } else {
        sum -= value;
      }
    });

    return {
      totals: categoryTotals,
      sum,
    };
  }, [transactions, categories]);

  const chartData = categories
    .map((category) => ({
      name: category.displayName,
      value: totals.totals[category.id] || 0,
      color: category.background,
      legendFontColor: "#333",
      legendFontSize: 12,
    }))
    .filter((item) => item.value > 0);

  const valueStyle =
    totals.sum >= 0
      ? globalStyles.positiveText
      : globalStyles.negativeText;

  return (
    <View style={globalStyles.screenContainer}>
      <View style={globalStyles.content}>
        {categories.map((category) => (
          <SummaryItem
            key={category.id}
            category={category}
            value={totals.totals[category.id] || 0}
          />
        ))}

        {chartData.length > 0 && (
          <PieChart
            data={chartData}
            width={Dimensions.get("window").width - 40}
            height={220}
            chartConfig={{
              color: (opacity = 1) =>
                `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="value"
            backgroundColor="transparent"
            paddingLeft="15"
            absolute
          />
        )}

        <View style={globalStyles.line} />

        <View style={styles.balance}>
          <Text style={styles.balanceText}>Saldo</Text>

          <Text style={valueStyle}>
            {totals.sum.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  balance: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  balanceText: {
    fontSize: 18,
    color: colors.primaryText,
    fontWeight: "800",
  },
});