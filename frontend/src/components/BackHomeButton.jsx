import React,{useContext} from "react";
import { Link } from "react-router-dom";
import { WsContext } from "./WsProvider";

export function BackHomeButton(){

    const {_, __,dispatch} = useContext(WsContext);

    return <Link to="/" 
                className="w-full block rounded-lg py-2 bg-indigo-500 hover:bg-indigo-700 dark:text-white text-sm md:text-lg hover:cursor-pointer" 
                onClick={ () => {
                    dispatch({
                        type:'reset',
                        payload: ''
                    })                }}
                >Back to Main menu
                </Link>
    
}