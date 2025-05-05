// movies.tsx

import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../types/movie';

import axios from 'axios';
import MovieCard from '../components/MovieCard';

const MoviesPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      // 응답에 대한 타입을 정의해줍니다.
      const { data } = await axios.get<MovieResponse>(
        'https://api.themoviedb.org/3/movie/popular?language=en&page=2',
        {
          headers: {
            accept: 'application/json',
            Authorization:import.meta.env.VITE_TMDB_KEY
          },
        }
      );

      setMovies(data.results);
      console.log(data.results);
    };

    fetchMovies();
  }, []);

  return (
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-20 mx-auto max-w-7xl">
      
      {movies?.map((movie) => (
       
          <MovieCard key={movie.id} movie={movie}/>
      
      ))}
    </ul>
  );
};

export default MoviesPage;