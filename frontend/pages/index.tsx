import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWeb3 } from "@3rdweb/hooks";
import useWallet from '../hooks/useWallet';

export default function Home() {
    const router = useRouter();
    const { ethProvider , requestConnect, isConnected } = useWallet();

    useEffect(() => {
        if (isConnected)
            router.push("/dashboard");
    }, [isConnected]);

    return (
        <div className='flex h-screen w-screen bg-zinc-300 items-center justify-center'>
            <div className="flex flex-col w-screen h-96 w-96 items-center justify-center bg-white">
                <h1 className="flex justify-center font-bold text-2xl text-center text-stone-700 w-3/4">Login/Sign Up</h1>
                <p className='text-neutral-400 mt-1 mb-5'>Connect your Metamask to login or sign up!</p>
                <button className='h-1/3 w-1/3'
                    onClick={() => requestConnect()}>
                        <img src="https://res.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/a9q9vb3gzdnibfegyyma"/>
                </button>
            </div>
        </div>
    );
}