
import React, {useState} from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import './index.css'
import ErrorPage from './components/ErrorPage';
import { GameSelection } from './components/GameSelection';
import { TicTacToe } from './routes/TicTacToe';
import { Connect4 } from './routes/Connect4';
import {NavBar} from './components/NavBar';
import { Footer } from './components/Footer';
import { Canvas } from "./components/Canvas";

const router = createBrowserRouter([
    {
        path:'/',
        element: <GameSelection/>,
        errorElement: <ErrorPage/>,
    },
    {
        path:'/tictactoe',
        element: <TicTacToe/>,
        errorElement: <ErrorPage/>,
    },
    {
        path:'/connect4',
        element: <Connect4/>,
        errorElement: <ErrorPage/>,
    }
])

function App() {

    const [darkMode,setDarkMode] = useState(true)

    return (
        <div className={`${darkMode ? 'dark':'light'}` }>
            <Canvas></Canvas>
            <div className='	font-sans w-full h-full'>
            <NavBar darkMode={darkMode} setDarkMode={setDarkMode}/>
            <div className="flex h-screen justify-center items-center">
                <RouterProvider router={router} />
            </div>
            <Footer/>
            </div>

        </div>
    )        
}

export default App