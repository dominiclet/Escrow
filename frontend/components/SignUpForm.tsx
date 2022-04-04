import axios from "axios";
import {useEffect, useState} from 'react';
import { useRouter } from "next/router";
import { apiRoot } from "../config";

interface Props {
    walletId: string;
}

const SignUpForm = (props: Props) => {
    const register = (walletId : string) => {
        const res = axios.post(apiRoot + "/account/register", {
            walletId: walletId,
            Username: (document.getElementById("username") as HTMLInputElement).value
        }) 
    }

    const goToDashboard = () => {
        router.push("/dashboard")
    }

    const router = useRouter()

    // get user account
    const [userLoaded, setUserLoaded] = useState<boolean>();
    const [loadSignUp, setLoadSignUp] = useState<boolean>();
    var existingUser = null
    useEffect(() => {
        axios.get(`${apiRoot}/account/${props.walletId}`, {})
        .then(res => {
            setUserLoaded(true);
            setLoadSignUp(false);
            goToDashboard()
        }).catch(error => {
            if(error.response == 'Does not exist'){
                setLoadSignUp(true);
            } else {
                alert(error.response);
            }
        })
    }, [])

    return (
        (
            userLoaded && loadSignUp ? 
            (
                <div>
                    <div className='flex h-screen w-screen bg-zinc-300 items-center justify-center'>
                        <div className="flex flex-col w-screen h-72 w-80 items-center justify-center bg-white">
                        <h1 className="flex justify-center font-bold text-2xl text-center text-stone-700 w-3/4 mb-1">Register with Us</h1>
                        <p className='text-neutral-400 w-3/4 mt-1 mb-5 text-center text-sm'>Register by giving your account a username!</p>
                            <form className="flex flex-col">
                                <div className="mb-6">
                                    <input type="username" id="username" className="bg-gray-50 border border-gray-100 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Type your username here" required/>
                                </div>
                                <button className='rounded-xl bg-cyan-700 text-white p-2 justify-center'
                                    onClick={
                                        () => {
                                            register(props.walletId)
                                            router.push("/dashboard/")
                                        }}>
                                        Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )
            :
            <h1>Loading....</h1>
        )
    )
}

export default SignUpForm
