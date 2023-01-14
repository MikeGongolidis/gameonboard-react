
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

    const [darkMode,setDarkMode] = useState(false)

    return (
        <div className={`${darkMode ? 'dark':'light'}` }>
            <div className='bg-indigo-300 dark:bg-[#242424] font-sans'>
            <nav>
                <button onClick={() => setDarkMode(!darkMode) }>Dark Mode</button>
            </nav>
            <RouterProvider router={router} />
            <footer className=' absolute bottom-0 w-full bg-white dark:bg-black text-black dark:text-white'> This is the footer</footer>
            </div>

        </div>
    )        
}

export default App