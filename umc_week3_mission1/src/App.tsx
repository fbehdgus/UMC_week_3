import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {createBrowserRouter, RouterProvider,useParams} from "react-router-dom";
import HomePage from "./pages/home.tsx";
import NotFound from "./pages/not-found.tsx";
import MoviesPage from "./pages/movies.tsx";
import RootLayout from "./layout/root-layout.tsx";





const router = createBrowserRouter([
  {
      path: '/',
     element: <RootLayout/>,
     children:[
      {index: true, element: <HomePage/>},
      {path: "movies/:movieId",element:<MoviesPage/>},
      {path:"yaho",element:<NotFound/>}
     ]
    }])


function App() {

  return <RouterProvider router={router}/>

  
}

export default App
