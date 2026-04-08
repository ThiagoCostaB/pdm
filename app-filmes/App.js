import React, { useState } from 'react';
import Routes from './navigation';

export default function App() {
  const [movies, setMovies] = useState([
    {
      id: '1',
      titulo: 'Interestelar',
      ano: '2014',
      genero: 'Ficção',
      imagem: 'https://picsum.photos/200/300?random=1',
      descricao: 'Uma jornada épica pelo espaço e pelo tempo.',
      avaliacao: 5,
    },
    {
      id: '2',
      titulo: 'Batman',
      ano: '2022',
      genero: 'Ação',
      imagem: 'https://picsum.photos/200/300?random=2',
      descricao: 'O cavaleiro das trevas em uma nova investigação.',
      avaliacao: 4,
    },
    {
      id: '3',
      titulo: 'Toy Story',
      ano: '1995',
      genero: 'Animação',
      imagem: 'https://picsum.photos/200/300?random=3',
      descricao: 'Brinquedos ganham vida quando ninguém está olhando.',
      avaliacao: 5,
    },
  ]);

  const addMovie = (movie) => setMovies((prev) => [...prev, movie]);
  const updateMovie = (updatedMovie) => {
    setMovies((prev) => prev.map((m) => (m.id === updatedMovie.id ? updatedMovie : m)));
  };
  const removeMovie = (id) => {
    setMovies((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <Routes
      movies={movies}
      addMovie={addMovie}
      updateMovie={updateMovie}
      removeMovie={removeMovie}
    />
  );
}
