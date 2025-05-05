import { useEffect, useState } from 'react';
import { Movie, MovieResponse } from '../types/movie';
import LoadingSpinner from './LoadingSpinner';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { useParams } from 'react-router-dom';

interface LoadPageProps {
  catedgory: string;
}

const LoadPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [ispending, setIspending] = useState(false);
  const [isError, setIsError] = useState(false);
  const [page, setPage] = useState(1);
 
  const {category}  = useParams();
  useEffect(() => {
    const fetchMovies = async () => {
      // 응답에 대한 타입을 정의해줍니다.
      
      setIspending(true);
      try{
      const { data } = await axios.get<MovieResponse>(
        `https://api.themoviedb.org/3/movie/${category}?language=en&page=${page}`,
        {
          headers: {
            accept: 'application/json',
            Authorization:  `Bearer ${import.meta.env.VITE_TMDB_KEY}`
          },
        }
      );
      console.log(import.meta.env.VITE_TMDB_KEY)
      setMovies(data.results);
      console.log(category);
    }catch{  
      setIsError(true);
      }finally{
        setIspending(false);
      }
    };
    fetchMovies();
    }, [page, category]);

    if(isError){
        
      return <div className='flex items-center justify-center h-dvh'>영화 정보를 불러오지 못했습니다.</div> 
    }

  return (
    <>
    <div className='flex items-center justify-center gap-6 mt-5'> 

    <button className='bg-[#dda5e3] text-white px-6 py-2 rounded-lg shadow-md cursor-pointer'
    disabled={page===1} 
    onClick={()=>setPage((prev)=>prev-1)}>이전</button>

    <span>{page}페이지</span>
    
    <button className='bg-[#dda5e3] text-white px-6 py-2 rounded-lg shadow-md cursor-pointer'
    
    onClick={()=>setPage((prev)=>prev+1)}>다음
        </button>


    </div>
    {ispending && (
        <div className='flex items-center justify-center h-dvh'>
        <LoadingSpinner/>
        </div>
        
        )}
    {!ispending &&(
    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 p-20 mx-auto max-w-7xl">
      
      {movies?.map((movie) => (
       
          <MovieCard key={movie.id} movie={movie}/>
      
      ))}
    </ul>
    )}
    </>
  );
};

export default LoadPage;