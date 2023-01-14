import React from "react";
import { Link } from "react-router-dom";

export function BackHomeButton(){

    return <Link to="/" className="w-full block rounded-lg py-2 bg-indigo-500 hover:bg-indigo-700 dark:text-white text-sm md:text-lg hover:cursor-pointer">Back to Main menu</Link>
    
}