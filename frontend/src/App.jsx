
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
            <div className='bg-indigo-200 dark:bg-[#242424] transition-colors duration-500	font-sans'>
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