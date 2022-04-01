export interface EthProvider {
    isMetaMask: boolean;
    isConnected: () => boolean;
    selectedAddress: string;
    request: (request: Request) => any;
}

interface Request {
    method: string,
    params: string[],
}