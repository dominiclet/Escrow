export interface EthProvider {
    isMetaMask: boolean;
    isConnected: () => boolean;
    selectedAddress: string;
    request: (request: Request) => Promise<any>;
    on: (event: string, eventHandler:() => void) => void;
    networkVersion: string;
}

interface Request {
    method: string,
    params?: string[],
}