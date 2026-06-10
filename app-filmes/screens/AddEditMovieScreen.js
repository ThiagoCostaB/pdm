import React, { useState } from 'react';
import api from '../services/api';
import { Alert } from 'react-native';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import StarRating from '../components/StarRating';

export default function AddEditMovieScreen({ route, navigation, addMovie, updateMovie, movies, carregarFilmes }) {
  const movieId = route.params?.movieId;
  const movie = movies.find((m) => m.id === movieId);

  const [titulo, setTitulo] = useState(movie?.titulo || '');
  const [ano, setAno] = useState(movie?.ano || '');
  const [genero, setGenero] = useState(movie?.genero || '');
  const [imagem, setImagem] = useState(movie?.imagem || '');
  const [descricao, setDescricao] = useState(movie?.descricao || '');
  const [avaliacao, setAvaliacao] = useState(movie?.avaliacao || 0);

  const salvar = async () => {
  if (!titulo || !ano || !genero) {
    Alert.alert('Erro', 'Preencha os campos obrigatórios');
    return;
  }

  const payload = {
    titulo,
    ano,
    genero,
    imagem: imagem || 'http://picsum.photos/200/300',
    descricao,
    avaliacao,
  };

  try {
    if (movieId) {
      await api.put(`/filmes/${movieId}`, payload);
    } else {
      await api.post('/filmes', payload);
    }

    await carregarFilmes();

   // addMovie && addMovie(payload);

    Alert.alert('Sucesso', 'Filme salvo com sucesso!');
    navigation.goBack();
  } catch (error) {
    Alert.alert('Erro', 'Falha ao salvar filme');
  }
};

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Título" />
      <TextInput style={styles.input} value={ano} onChangeText={setAno} placeholder="Ano" />
      <TextInput style={styles.input} value={genero} onChangeText={setGenero} placeholder="Gênero" />
      <TextInput style={styles.input} value={imagem} onChangeText={setImagem} placeholder="Imagem" />
      <TextInput style={styles.input} value={descricao} onChangeText={setDescricao} placeholder="Descrição" />

      <Text style={styles.label}>Avaliação</Text>
      <StarRating rating={avaliacao} setRating={setAvaliacao} />

      <TouchableOpacity style={styles.button} onPress={salvar}>
        <Text style={{ color: '#fff' }}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b3b', padding: 16 },
  input: {
    backgroundColor: '#4b4b8f', marginBottom: 10,
    borderRadius: 10, padding: 12, color: '#fff',
  },
  label: { color: '#fff', fontSize: 18 },
  button: {
    backgroundColor: '#2e0dd1', padding: 14,
    borderRadius: 10, alignItems: 'center', marginTop: 20,
  },
});
