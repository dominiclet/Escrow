import { useState, useEffect } from 'react';
import { disconnect } from 'process';
import {useRouter} from 'next/router';
import SideMenuOptions from '../components/SideMenuOptions'

interface Props {
    username:String
}

const SideMenu = (props: Props) => {

    const router = useRouter();

    /*
    const leaveChat = () => {
        router.push('/new-chat')
    }
    */

    return (
        <div className="flex flex-col items-center h-full w-1/5 bg-white">
            <div className="flex justify-center items-end m-5 text-xl">
                Escrow Logo
            </div>
            <SideMenuOptions/>
        </div>
        
    )
}

export default SideMenu             
/*   
                <div>
                    <button 
                        className="mb-10 text-black bg-light-red 
                        hover:bg-red-400 focus:ring-4 focus:ring-transparent 
                        font-medium rounded-lg text-base px-5 py-3 w-full sm:w-auto text-center"                
                    >Leave Chat</button>
                </div>
*/