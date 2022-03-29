export interface TransactionReceipt {
    blockHash: string,
    blockNumber: string,
    contractAddress: string,
    cumulativeGasUsed: string,
    effectiveGasPrice: string, 
    from: string, 
    gasUsed: string,
    transactionHash: string,
    to: string,
}