import Table from '../../components/Table';

var testContractDetails: Array<{name:string, counterParty:string, stage:string}> = Array(
    {"name": "Contract for stripper", "counterParty": "John", "stage": "Awaiting performance"},
    {"name": "Contract for goods", "counterParty": "Jayesh", "stage": "Completed"},
);

const index = () => {
  return (
    <div className="flex h-screen w-screen bg-background">
        <div className="flex flex-col w-screen m-10">
            <div className="flex flex-row flow-root p-10">
                <p className="float-left font-bold text-xl">Overview</p>
                <div className="float-right">
                    <div className="grid grid-cols-3 gap-4">
                        <p>Account name</p>
                        <p>Wallet address</p>
                        <button 
                            className="text-black bg-red-300
                            hover:bg-red-400 focus:ring-4 focus:ring-transparent 
                            font-medium rounded-full text-base w-full sm:w-auto text-center"
                            >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
            <div className="flex justify-center">
                <button
                    className="self-center text-white bg-gray hover:bg-black 
                    rounded-full px-4 py-4 text-sm"
                    >
                    CREATE A NEW CONTRACT
                </button>
            </div>
            <div className="p-10">
                <Table role="Purchaser" contractDetails={testContractDetails}/>
                <Table role="Service Provider" contractDetails={testContractDetails}/>
            </div>
        </div>
    </div>
  )
}

export default index