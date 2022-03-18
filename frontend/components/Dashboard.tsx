import StatsPanel from './StatsPanel'

const Dashboard = () => {
    return (
        <div className="flex-row items-center h-screen w-4/5">
            <StatsPanel amountIncoming={1200} amountOutgoing={200} totalTransactions={4}/>
        </div>
    )
}

export default Dashboard
