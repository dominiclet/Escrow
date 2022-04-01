interface Props {
    errorMsg: string,
}

const TransactionError = ({ errorMsg }: Props) => {
    return (
        <div className="flex flex-col">
            <p className="text-xl font-bold text-center m-9">{errorMsg}</p>
            <p className="text-9xl text-center my-10">😩</p>
        </div>
    );
}
export default TransactionError;