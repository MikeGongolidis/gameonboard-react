
export function NavBar({darkMode,setDarkMode}){
    
    const moon = darkMode ?   `☀️`: `🌚` ;

    return (
    <nav className="hidden md:block h-10 leading-10">
        <div className="flex justify-between gap-2 pt-5">
            <h3 className="ml-5 dark:text-white">
            Game Onboard</h3>
            <ul className="list-none p-0 mr-8 flex ">
                <li className="float-left text-xl ">        <button onClick={() => setDarkMode(!darkMode) }>{moon}</button></li>
            </ul>
        </div>

    </nav>
    )
}