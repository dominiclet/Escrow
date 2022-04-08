# Instructions to setup Metamask for Polygon testnet

As with any blockchain applications, you will need to set up a crypto wallet to interact with the escrow web application. The escrow web application currently supports Metamask, so a Metamask account will be needed. As the web app is only deployed for testing, it will only be available on the **Polygon testnet**. This allows you to try out the application without incurring any real money, as you can simply get test currencies from the faucet. Follow the instructions below:

1. Install Metamask from [the metamask download page](https://metamask.io/download/). This will add an extension to your browser. Follow the instructions to set up an account.

2. Add the Polygon testnet to your metamask wallet. The instructions provided [here](https://blog.pods.finance/guide-connecting-mumbai-testnet-to-your-metamask-87978071aca8) will show you how to access the settings on your metamask extension. The settings are reproduced below:
    - Network name: Mumbai Testnet
    - New RPC URL: https://rpc-mumbai.maticvigil.com
    - Chain ID: 80001
    - Currency Symbol: MATIC
    - Block Explorer URL: https://polygonscan.com/

3. Request test MATIC tokens (the cryptocurrency used on Polygon) from the faucet. Copy your wallet address by opening the extension and clicking on the top portion of the popup with your account. By default, you should see 'Account 1', along with a snippet of your full wallet address below. Next, visit the [polygon faucet](https://faucet.polygon.technology/), paste your wallet address, and submit. 

4. Within 1-2 minutes, you should see your metamask wallet balance increase. Now you have enough balance in your wallet to pay gas fees and play around with the web application. Have fun!
