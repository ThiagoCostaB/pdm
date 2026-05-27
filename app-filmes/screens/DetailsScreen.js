import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function DetailsScreen({ route, navigation, movies, removeMovie }) {
  const movie = movies.find((m) => m.id === route.params.movieId);

  return (
    <View style={styles.container}>
      <Image source={{ uri: movie.imagem }} style={styles.image} />
      <Text style={styles.title}>{movie.titulo}</Text>
      <Text style={styles.info}>{movie.ano}</Text>
      <Text style={styles.info}>{movie.genero}</Text>
      <Text style={styles.info}>{'★'.repeat(movie.avaliacao)}</Text>
      <Text style={styles.info}>{movie.descricao}</Text>

      <TouchableOpacity
        style={styles.editButton}
        onPress={() => navigation.navigate('AdicionarEditar', { movieId: movie.id })}
      >
        <Text style={styles.text}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => {
          removeMovie(movie.id);
          navigation.goBack();
        }}
      >
        <Text style={styles.text}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b3b', padding: 16 },
  image: { width: '100%', height: 250 },
  title: { color: '#fff', fontSize: 28, fontWeight: 'bold', marginTop: 16 },
  info: { color: '#ddd', fontSize: 18, marginTop: 6 },
  editButton: { backgroundColor: '#2e0dd1', padding: 14, borderRadius: 10, marginTop: 20 },
  deleteButton: { backgroundColor: 'red', padding: 14, borderRadius: 10, marginTop: 10 },
  text: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
