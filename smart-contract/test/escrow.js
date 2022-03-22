const Escrow = artifacts.require("Escrow");

contract("Basic functionality test", async accounts => {
    it("should put 10000 gwei into contract", async () => {
        const instance = await Escrow.deployed();
        await instance.offer(Date.now(), {
            from: accounts[0],
            value: 10000,
        });
        const balance = await web3.eth.getBalance(instance.address);
        assert.equal(balance, 10000);
    });

    it("should not allow payer to accept", async () => {
        const instance = await Escrow.deployed();
        try {
            await instance.accept({
                from: accounts[0],
            });
        } catch (error) {
            const onlyPayee = error.message.search("Only payee") >= 0;
            assert(onlyPayee);
        }
    });

    it("allows payee to accept, and does not allow payer to withdraw anymore", async () => {
        const instance = await Escrow.deployed();
        await instance.accept({
            from: accounts[1],
        });
        try {
            await instance.withdrawOffer({
                from: accounts[0],
            });
        } catch (error) {
            const cannotWithdraw = error.message.search("Cannot withdraw") >= 0;
            assert(cannotWithdraw);
        }
    })
});