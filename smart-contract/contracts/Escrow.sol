// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Escrow {
	address public payer;
	address payable public payee;

	enum State { A_OFFER, A_ACCEPTANCE, A_PERFORMANCE, COMPLETE}
	State public currState;

	modifier onlyPayer() {
		require(msg.sender == payer, "Only payer can call this method");
		_;
	}

	modifier onlyPayee() {
		require(msg.sender == payee, "Only payee can call this method");
		_;
	}

	constructor(address _payer, address payable _payee) {
		payer = _payer;
		payee = _payee;
		currState = State.A_OFFER;
	}

	function offer() onlyPayer external payable {
		require(currState == State.A_OFFER, "Offer already made");
		require(msg.value > 0, "Amount cannot be zero");
		currState = State.A_ACCEPTANCE;
	}

	function accept() onlyPayee external {
		require(currState == State.A_ACCEPTANCE, "Unable to accept contract");
		// Maybe require payee to pay some acceptance fee
		currState = State.A_PERFORMANCE;
		// Contract is now "locked" for performance
	}

	function confirmPerformance() onlyPayer external {
		require(currState == State.A_PERFORMANCE, "Contract is not in the performance stage");
		payee.transfer(address(this).balance);
		currState = State.COMPLETE;
	}
}