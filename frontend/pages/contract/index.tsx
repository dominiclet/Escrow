import StepperComponent from "../../components/StepperComponent";

interface Contract {
    name: string;
    contractAddress: string;
    counterParty: string;
    stage: string;
    role: string;
    expiry: string;
}

const index =  (props: Contract) => {
  return (    
    <div className="flex h-screen w-screen bg-background">
        <div className="flex flex-col w-screen m-10">
            <div className="flex flex-row flow-root p-10">
                <h1 className="float-left font-bold text-xl">Contract Overview</h1> 
                <div className="float-right">
                    <div className="grid grid-cols-3 gap-4">
                        <p>Account name</p>
                        <p>Wallet address</p>
                        <button 
                            className="text-black bg-red-300
                            hover:bg-red-400 focus:ring-4 focus:ring-transparent 
                            font-medium rounded-full text-base w-full sm:w-auto text-center">
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <section className="p-6">
                <p className="font-bold text-lg">{props.name}</p>
            </section>
            <div className="flex flex-col align-center m-10">
                <table className="bg-[#FFF] w-full">
                    <thead>
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 uppercase border-b border-gray-600">
                            <th className="px-4 py-3">Contract Information</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="white">
                        <tr className="text-gray-700">
                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <p className="font-semibold text-black font-semibold">Contract Name</p>
                                </div>
                            </td>                    
                            <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">{props.name}</span>
                            </td>
                        </tr>
                        <tr className="text-gray-700">
                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <p className="font-semibold text-black font-semibold">Counter Party Name</p>
                                </div>
                            </td>                    
                            <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-50 rounded-sm">{props.counterParty}</span>
                            </td>
                        </tr>
                        <tr className="text-gray-700">
                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <p className="font-semibold text-black font-semibold">Contract Address</p>
                                </div>
                            </td>                    
                            <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-medium leading-tight text-green-700 bg-green-20 rounded-sm">{props.contractAddress}</span>
                            </td>
                        </tr>
                        <tr className="text-gray-700">
                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <p className="font-semibold text-black font-semibold">Completion Date</p>
                                </div>
                            </td>                    
                            <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-medium leading-tight text-green-700 bg-green-20 rounded-sm">{props.expiry}</span>
                            </td>
                        </tr>
                    </tbody>
                    <tbody className="flex flex-row justify-center">
                    </tbody>
                </table>
                <table className="bg-[#FFF] w-full">
                    <thead>
                        <tr className="text-gray-700">
                            <td className="px-4 py-3">
                                <th className="font-semibold text-black font-semibold">Stage</th>
                            </td>                    
                        </tr>
                    </thead>
                    <div>
                        <StepperComponent stage={props.stage}/>
                    </div>
                </table>
                <table className="bg-[#FFF] w-full">
                    <thead>
                        <tr className="text-gray-700">
                            <td className="px-4 py-3">
                                <th className="justify-center font-semibold text-black font-semibold">Actions to be Taken</th>
                            </td>                    
                        </tr>
                    </thead>
                    <div>
                        {//<ButtonBelt stage={props.stage}/>
}
                    </div>
                </table>
            </div>
        </div>
    </div>
  )
}

export default index