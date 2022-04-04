import axios from 'axios';
import {useEffect, useState} from 'react';
import { apiRoot } from '../config';
import { Account } from '../interfaces/DashboardDetails';

interface Props {
    walletId: string
}

const AccountInfo = (props: Props) => {

    // get user account
    const [user, setUser] = useState<Account>();
    useEffect(() => {
        axios.get(`${apiRoot}/account/${props.walletId}`, {})
        .then(res => {
            setUser(res.data);
        })
    }, [])

    return (
        (user === undefined ? <div><h1>Loading...</h1></div>
            :
            <div className="float-right">
                <div className="grid grid-cols-3 gap-4">
                    <p className="flex justify-end">{user.username}</p>
                    <p className="flex jusitfy-end">{props.walletId.slice(0,5) + '...' + props.walletId.slice(-3)}</p>
                        <button 
                            className="text-black bg-red-300
                            hover:bg-red-400 focus:ring-4 focus:ring-transparent 
                            font-medium rounded-full text-base w-full sm:w-auto text-center"
                            >
                            Logout
                        </button>
                </div>
            </div>
        )
    )
}

export default AccountInfo