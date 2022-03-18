const SideMenuOptions = () => {
    return (
        <div className="flex flex-col align-items h-full w-full m-10">
            <button 
                className="text-black
                hover:bg-gray focus:ring-4 focus:ring-transparent 
                font-medium text-base px-5 py-3 w-full sm:w-auto text-center"
                >Dashboard</button>
            <button className="text-black
                hover:bg-gray focus:ring-4 focus:ring-transparent 
                font-medium text-base px-5 py-3 w-full sm:w-auto text-center">Disputes</button>
            <button className="text-black
                hover:bg-gray focus:ring-4 focus:ring-transparent 
                font-medium text-base px-5 py-3 w-full sm:w-auto text-center">Help</button>
        </div>
    )
}

export default SideMenuOptions
