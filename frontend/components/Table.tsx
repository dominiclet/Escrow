interface Props {
    role: string;
    contractDetails: Array<{
        name: string;
        counterParty: string;
        stage: string; 
    }>
}

const stageColourGreen = (stage: string) => {
    return stage === "Completed"
}

const Table = (props: Props) => {
  return (
    <div>
        <section className="p-6">
            <p className="font-bold text-lg">Contracts as {props.role}</p>
        </section>
        <section className="container mx-auto px-6 font-mono">
            <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
                <div className="w-full overflow-x-auto">
                    <table className="w-full">
                        <thead>
                        <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-[#BBB] uppercase border-b border-gray-600">
                            <th className="px-4 py-3">Name</th>
                            {props.role === "Purchaser" ?
                                <th className="px-4 py-3">Payee</th>
                                :
                                <th className="px-4 py-3">Payer</th>
                            }
                            <th className="px-4 py-3">Stage</th>
                            <th className="px-4 py-3"></th>
                        </tr>
                        </thead>
                        <tbody className="bg-white">
                        {props.contractDetails.map(contract => (
                            <tr className="text-gray-700" key={contract.name}>
                                <td className="px-4 py-3">
                                    <div className="flex items-center text-sm">
                                        <p className="font-semibold text-black font-semibold">{contract.name}</p>
                                    </div>
                                </td>
                                <td className="px-4 py-3 text-ms">{contract.counterParty}</td>
                                
                                <td className="px-4 py-3 text-xs">
                                    {stageColourGreen(contract.stage) ? 
                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm"> 
                                            {contract.stage}
                                        </span>
                                        :
                                        <span className="px-2 py-1 font-semibold leading-tight text-red-700 bg-red-100 rounded-sm">
                                            {contract.stage}
                                        </span>
                                    }
                                </td>                                
                                <td className="px-4 py-3 text-sm">
                                    <button className="self-center text-white bg-gray hover:bg-black 
                                        rounded-full px-4 py-2 text-sm">
                                        View
                                    </button>
                                </td>
                            </tr>                            
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Table