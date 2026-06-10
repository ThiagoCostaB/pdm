import React, { useState, useEffect } from 'react';
import api from './services/api';
import { Alert, ActivityIndicator, View } from 'react-native';
import Routes from './navigation';

export default function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  carregarFilmes();
}, []);

const carregarFilmes = async () => {
  try {
    setLoading(true);

    const response = await api.get('/filmes');
    setMovies(response.data);

  } catch (error) {
    Alert.alert('Erro', 'Falha ao conectar com a API');
  } finally {
    setLoading(false);
  }
};

  const addMovie = (movie) => setMovies((prev) => [...prev, movie]);
  const updateMovie = (updatedMovie) => {
    setMovies((prev) => prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)));
  };
  const removeMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  if (loading) {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator size="large" color="#2e0dd1" />
    </View>
  );
}

  return (
    <Routes
  movies={movies}
  addMovie={addMovie}
  updateMovie={updateMovie}
  removeMovie={removeMovie}
  carregarFilmes={carregarFilmes}
/>
  );
}
