// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Escrow {
	address payable public payer;
	address payable public payee;
	uint public expiryTime;

	address payable public arbitrator;

	enum State { A_OFFER, A_ACCEPTANCE, A_PERFORMANCE, COMPLETE}
	State public currState;

	uint public payeeProposedExtendedExpiry;
	uint public payerProposedExtendedExpiry;

	modifier onlyPayer() {
		require(msg.sender == payer, "Only payer can call this method");
		_;
	}

	modifier onlyPayee() {
		require(msg.sender == payee, "Only payee can call this method");
		_;
	}

	modifier onlyPayerOrPayee() {
		require(msg.sender == payee || msg.sender == payer, "Only the registered payee or payer can call this method");
		_;
	}

	constructor(address payable _payer, address payable _payee, address payable _arbitrator) {
		payer = _payer;
		payee = _payee;
		arbitrator = _arbitrator;
		currState = State.A_OFFER;
	}

	function extendExpiry() internal {
		require(payeeProposedExtendedExpiry == payerProposedExtendedExpiry, 
			"Expiry time not extended: Payer and payee proposed extended expiry must match (You may check payeeProposedExtendedExpiry or payerProposedExtendedExpiry)");
		expiryTime = payerProposedExtendedExpiry;
		payeeProposedExtendedExpiry = 0;
		payerProposedExtendedExpiry = 0;
	}

	// Function for payer to deposit into the contract
	function offer(uint _expiryTime) onlyPayer external payable {
		require(currState == State.A_OFFER, "Contract not accepting offer");
		require(msg.value > 0, "Please deposit a non-zero amount");
		require(_expiryTime > block.timestamp, "expiryTime must be a future time");
		// Update expiry time
		expiryTime = _expiryTime;
		// Payee will now be allowed to accept payer's offer of deposit
		currState = State.A_ACCEPTANCE;
	}

	// Function to allow payer to withdraw offer / alter offer by withdrawing and re-offering
	function withdrawOffer() onlyPayer external payable {
		require(currState == State.A_ACCEPTANCE, "Cannot withdraw offer as payee has accepted your deposit");
		payer.transfer(address(this).balance);
		// Contract now able to accept a new offer
		currState = State.A_OFFER;
	}

	// Function for payee to accept deposit and 'lock' the escrow contract
	function accept() onlyPayee external {
		require(currState == State.A_ACCEPTANCE, "Unable to accept contract");
		// Contract is now "locked" for performance
		currState = State.A_PERFORMANCE;
	}

	// Function to allow parties to extend expiry time. Both payee and payer must propose matching expiry time
	// for expiry time to be actually updated.
	function proposeExtendExpiry(uint extendedExpiryTime) onlyPayerOrPayee external returns (string memory) {
		require(extendedExpiryTime > expiryTime, "Proposed expiry time must be after current expiry time");
		if (msg.sender == payer) {
			payerProposedExtendedExpiry = extendedExpiryTime;
		} else {
			payeeProposedExtendedExpiry = extendedExpiryTime;
		}
		if (payerProposedExtendedExpiry == 0 || payeeProposedExtendedExpiry == 0) {
			// Other party has not proposed extended expiry time
			return "New expiry time proposed: Please wait for other party to propose expiry time";
		}
		extendExpiry();
		return "Expiry time updated";
	}

	// Function for payer to confirm performance, releasing balance to payee
	function confirmPerformance() onlyPayer external {
		require(currState == State.A_PERFORMANCE, "Contract is not in the performance stage");
		payee.transfer(address(this).balance);
		currState = State.COMPLETE;
	}

	// Function for payee to withdraw the balance if payer does not confirm performance before timer expires
	function expiredWithdraw() onlyPayee external {
		require(currState == State.A_PERFORMANCE, "Contract is not in the performance stage");
		require(block.timestamp >= expiryTime, "Contract has not reached the expiry time");
		payee.transfer(address(this).balance);
		currState = State.COMPLETE;
	}

	// Function for either payer or payee to trigger dispute mechanism. Balance held will be transferred to chosen arbitrator.
	function triggerDispute() onlyPayerOrPayee external {
		require(currState == State.A_PERFORMANCE, "Contract must be in the performance stage for dispute mechanism to be available");
		arbitrator.transfer(address(this).balance);
		currState = State.COMPLETE;
	}

	// Function to check current state
	function getCurrState() view external returns (int _val) {
		if (currState == State.A_OFFER) return 1;
		if (currState == State.A_ACCEPTANCE) return 2;
		if (currState == State.A_PERFORMANCE) return 3;
		if (currState == State.COMPLETE) return 4;
	}
}