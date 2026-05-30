import {
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";

import { api } from "../services/api";

export const MoneyContext = createContext();

export default function GlobalState({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState("");

  const refresh = useCallback(async () => {
    try {
      setLoading(true);

      const [cats, txs] = await Promise.all([
        api.listCategories(),
        api.listTransactions(),
      ]);

      setCategories(cats);
      setTransactions(txs);

      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  async function addTransaction(data) {
    const transaction = await api.createTransaction(data);

    setTransactions((oldState) => [transaction, ...oldState]);
  }

  async function removeTransaction(id) {
    await api.deleteTransaction(id);

    setTransactions((oldState) =>
      oldState.filter((item) => item.id !== id)
    );
  }

  async function addCategory(data) {
    const category = await api.createCategory(data);

    setCategories((oldState) => [...oldState, category]);
  }

  async function removeCategory(id) {
    await api.deleteCategory(id);

    setCategories((oldState) =>
      oldState.filter((item) => item.id !== id)
    );
  }

  return (
    <MoneyContext.Provider
      value={{
        transactions,
        categories,
        loading,
        error,
        refresh,
        addTransaction,
        removeTransaction,
        addCategory,
        removeCategory,
        userName,
        setUserName,
      }}
    >
      {children}
    </MoneyContext.Provider>
  );
}