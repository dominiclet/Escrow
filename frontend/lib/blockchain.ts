
export function maticToWeiInHex(amount: string|number): string {
    if (typeof amount == "string") {
        amount = parseFloat(amount);
    }
    return (amount * 1e18).toString(16);
}