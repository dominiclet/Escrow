import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useWeb3 } from "@3rdweb/hooks";
import axios from 'axios';

export default function Home() {
    const { address, connectWallet } = useWeb3();
    const router = useRouter();

    const goToDasboard = () => {
        router.push("/dashboard")
    }

    return (
        <>
            {address ? 
                (goToDasboard())
                :
                (
                <div className="flex flex-col h-screen mx-auto items-center justify-center">
                    <h1 className="flex justify-center m-10">Please connect your Metamask wallet to continue</h1>
                    <button className="mb-10 text-black bg-send-button
                        hover:bg-blue-500 focus:ring-4 focus:ring-transparent 
                        font-medium rounded-lg text-base px-5 py-3 sm:w-auto text-center"
                        onClick={() => connectWallet("injected")}>
                        Connect Wallet
                        </button>
                </div>
                )
            }
        </>
    )
}