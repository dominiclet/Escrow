export interface EthProvider {
    isMetaMask: boolean;
    isConnected: () => boolean;
    selectedAddress: string;
}