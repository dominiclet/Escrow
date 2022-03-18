import CardGroup from 'react-bootstrap/CardGroup'
import Card from 'react-bootstrap/Card'

interface Props{
    amountIncoming: number,
    amountOutgoing: number,
    totalTransactions: number
}

const StatsPanel = (props: Props) => {
    return (
        <div className="flex flex-row bg-white rounded-full m-10 p-10">
            <div className="flex flex-col justify-center w-1/3 items-center">
                <p className="text-blue-700">Amount Incoming:<br/></p>
                <p className="text-xl font-bold">{props.amountIncoming}</p>
            </div>
            <div className="flex flex-col justify-center w-1/3 items-center">
                <p className="text-blue-700">Amount Outgoing:<br/></p>
                <p className="text-xl font-bold">{props.amountOutgoing}</p>
            </div>
            <div className="flex flex-col justify-center w-1/3 items-center">
                <p className="text-blue-700">Total Transactions:<br/></p>
                <p className="text-xl font-bold">{props.totalTransactions}</p>
            </div>
        </div>
    )
}

export default StatsPanel
