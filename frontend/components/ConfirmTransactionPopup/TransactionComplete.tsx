import {useRouter} from "next/router";

interface Props {
    contractAddress: string | null,
}

const TransactionComplete = (props: Props) => {
    const router = useRouter();

    const redirectToContract = () => {
        router.push(`/contract/${props.contractAddress}`)
    }

    return (
        <div className="flex flex-col">
            <p className="text-xl font-bold text-center m-9">Congratulations!</p>
            <p className="text-8xl text-center my-10">🥳</p>
            <p className="text-lg text-center">Your transaction is complete! You may close the tab now.</p>
            {props.contractAddress && 
                <button
                    className="mt-4 text-black bg-green-200
                    hover:bg-green-400 focus:ring-4 focus:ring-transparent 
                    font-medium rounded-lg text-base px-5 py-3 mx-32 sm:w-auto text-center"
                    onClick={redirectToContract}
                >
                    View contract
                </button>               
            }
        </div>
    )
}
export default TransactionComplete;
