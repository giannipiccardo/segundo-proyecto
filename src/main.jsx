import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import PokemonCard from './Components/PokemonCard.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App route={route} />,
  },
  {
    path: "pokemon/:pokemonId",
    element: <PokemonCard />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
