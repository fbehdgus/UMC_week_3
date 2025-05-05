
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Movie, MovieResponse, MovieDetail,MovieCredits } from '../types/movie';

import axios from 'axios';





const MovieDetailPage = () => {

    const [details, setdetails] = useState<MovieDetail>();
    const [credits, setcredits] = useState<MovieCredits>();
    const {movieId} = useParams();

    useEffect(() => {
        const fetchMovieDetails = async () => {
          // 응답에 대한 타입을 정의해줍니다.
          const { data } = await axios.get<MovieDetail>(
           `https://api.themoviedb.org/3/movie/${movieId}?language=ko`,
            {
              headers: {
                accept: 'application/json',
               Authorization:  `Bearer ${import.meta.env.VITE_TMDB_KEY}`
              },
            }
          );
    
          setdetails(data);
         
        };
    
        fetchMovieDetails();
      }, [movieId]);

    useEffect(() => {
        const fetchMovieCredits = async () => {
          // 응답에 대한 타입을 정의해줍니다.
          const { data } = await axios.get<MovieCredits>(
           `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko`,
            {
              headers: {
                accept: 'application/json',
                Authorization: import.meta.env.VITE_TMDB_KEY
              },
            }
          );
    
          setcredits(data);
          console.log(data);
        };
    
        fetchMovieCredits();
      }, [movieId]);





    
      return (
        <div className="relative bg-black min-h-screen">
            
          {/* Poster Background */}
          <img
            src={`https://image.tmdb.org/t/p/w500${details?.poster_path}`}
            alt={details?.title}
            className="w-full h-96 object-cover opacity-70 absolute top-0 left-0 z-0"
          />
      
          {/* Main Content */}
          <div className="relative z-10 pt-96 p-8 text-white">
            {/* Title */}
            <h1 className="text-4xl font-extrabold text-center mb-4 text-pink-400">
              {details?.title}
            </h1>
      
            {/* Vote Average */}
            <h1 className="text-lg font-semibold text-center flex justify-center items-center gap-2 mb-4">
              🍿 평균 {details?.vote_average}
            </h1>
      
            {/* Release Date */}
            <h1 className="text-lg font-medium text-center mb-4">
              🎬 개봉일 {details?.release_date}
            </h1>
      
            {/* Runtime */}
            <h1 className="text-lg font-medium text-center mb-4">
              ⏰ 상영시간 {details?.runtime}분
            </h1>
      
            {/* Overview */}
            <h1 className="text-md text-gray-300 text-center mb-8 px-4">
              {details?.overview && details.overview.length > 300
                ? `${details.overview.slice(0, 300)}...`
                : details?.overview}
            </h1>
           
      
            {/* Credit Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 mt-8">
              {credits?.cast?.slice(0, 10).map((person) => (
                <div key={person.id} className="flex flex-col items-center">
                  <img
                    src={`https://image.tmdb.org/t/p/w200${person.profile_path}`}
                    alt={person.name}
                    className="w-24 h-24 object-cover rounded-full shadow-md mb-2"
                  />
                  <h3 className="text-sm font-semibold text-center">{person.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

export default MovieDetailPage;