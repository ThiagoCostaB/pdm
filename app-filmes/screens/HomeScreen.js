import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, TextInput, Image, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function HomeScreen({ navigation, movies }) {
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('');

  const filteredMovies = movies.filter((movie) => {
    const byName = movie.titulo.toLowerCase().includes(search.toLowerCase());
    const byGenre = genreFilter
      ? movie.genero === genreFilter
      : true;
    return byName && byGenre;
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Buscar por nome"
        placeholderTextColor="#ccc"
        value={search}
        onChangeText={setSearch}
      />
      <View style={styles.pickerContainer}>
      <Picker
  selectedValue={genreFilter}
  onValueChange={(value) => setGenreFilter(value)}
  style={styles.picker}
  color='#ccc'
>
  <Picker.Item label="Todos os gêneros" value=""/>
  <Picker.Item label="Ação" value="Ação" />
  <Picker.Item label="Aventura" value="Aventura" />
  <Picker.Item label="Comédia" value="Comédia" />
  <Picker.Item label="Drama" value="Drama" />
  <Picker.Item label="Ficção Científica" value="Ficção Científica" />
  <Picker.Item label="Terror" value="Terror" />
  <Picker.Item label="Romance" value="Romance" />
  <Picker.Item label="Animação" value="Animação" />
  <Picker.Item label="Suspense" value="Suspense" />
</Picker>
</View>

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AdicionarEditar')}
      >
        <Text style={styles.buttonText}>+ Adicionar Filme</Text>
      </TouchableOpacity>

      <FlatList
        data={filteredMovies}
        keyExtractor={(item, index) =>
  item?.id ? item.id.toString() : index.toString()
}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Detalhes', { movieId: item.id })}
          >
            <Image
  source={{
    uri:
      item.imagem ||
      'https://picsum.photos/200/300',
  }}
  style={styles.poster}
/>
            <View>
              <Text style={styles.title}>{item.titulo}</Text>
              <Text style={styles.info}>{item.ano}</Text>
              <Text style={styles.info}>{item.genero}</Text>
              <Text style={styles.info}>{'★'.repeat(item.avaliacao)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0b0b3b', padding: 16 },
  input: {
    backgroundColor: '#4b4b8f', color: '#fff', borderRadius: 10,
    padding: 12, marginBottom: 10,
  },
  addButton: {
    backgroundColor: '#2e0dd1', padding: 14, borderRadius: 10,
    alignItems: 'center', marginBottom: 16,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  card: {
    flexDirection: 'row', backgroundColor: '#4b4b8f',
    padding: 10, borderRadius: 12, marginBottom: 12,
  },
  poster: { width: 60, height: 80, marginRight: 10, borderRadius: 8 },
  title: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  info: { color: '#ddd' },
  pickerContainer: {
  backgroundColor: '#4b4b8f',
  borderRadius: 10,
  marginBottom: 10,
  overflow: 'hidden',
  height: 45,
  justifyContent: 'center',
  paddingHorizontal: 5,
},

picker: {
  color: '#fff',
  height: 50,
  backgroundColor:'#4b4b8f'
},
});