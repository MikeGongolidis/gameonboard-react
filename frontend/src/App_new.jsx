
import React, {useState} from 'react';
import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";

import './index.css'
import ErrorPage from './components/ErrorPage';
import { GameSelection2 } from './components/GameSelection2';
import { TicTacToe } from './routes/TicTacToe';
import { Connect4 } from './routes/Connect4';


const router = createBrowserRouter([
    {
        path:'/',
        element: <GameSelection2/>,
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

function Appnew() {

    const [darkMode,setDarkMode] = useState(false)

    return (
        <div className={darkMode ? 'dark':'light'}>
            <nav>
                <button onClick={() => setDarkMode(!darkMode) }>Dark Mode</button>
            </nav>
            <RouterProvider router={router} />
            <footer className='bg-white dark:bg-black text-black dark:text-white'> This is the footer</footer>
        </div>
    )        
}

export default Appnew