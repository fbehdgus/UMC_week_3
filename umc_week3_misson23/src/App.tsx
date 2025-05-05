import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider,useParams} from "react-router-dom";
import HomePage from "./pages/home.tsx";
import NotFound from "./pages/not-found.tsx";
import MoviesPage from "./pages/movies.tsx";
import RootLayout from "./layout/root-layout.tsx";
import LoadPage from './components/LoadPage.tsx';
import MovieDetailPage from './pages/MovieDetailPage.tsx';




const router = createBrowserRouter([
  {
      path: '/',
     element: <RootLayout/>,
     errorElement: <NotFound/>,
     children:[
      {index: true, element: <HomePage/>},
      {path: "movies/:category",
      
        element:<LoadPage/>,
      },
      {
        path:"movie/:movieId",
        element:<MovieDetailPage/>
      }
     ]
    }])


function App() {

  return <RouterProvider router={router}/>

  
}

export default App
