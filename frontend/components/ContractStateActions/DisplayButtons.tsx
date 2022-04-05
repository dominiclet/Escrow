import {Account, Contract, ContractState} from '../../interfaces/DashboardDetails';
import AcceptOffer from './AcceptOffer';
import ConfirmPerformance from './ConfirmPerformance';
import ExpiredWithdraw from './ExpiredWithdraw';
import Offer from './Offer';
import TriggerDispute from './TriggerDispute';
import WithdrawOffer from './WithdrawOffer';
import ExtendExpiry from './ExtendExpiry';

interface Props {
    user: Account;
    contract: Contract;
}

const DisplayButtons = (props: Props) => {

    const role = ():string => {
        if (props.user.username === props.contract.payee.username) {
            return "payee" // change back
        } else return "payer"
    }

    if (props.contract.state === ContractState.A_OFFER && role() === 'payer') {
        return (
            <div>
                <Offer contract={props.contract}/>
            </div>
        )
    } else if (props.contract.state === ContractState.A_ACCEPTANCE) {
        if (role() === 'payer') {
            return (
                <div className="grid grid-cols-2 justify-center">
                    <div className="justify-self-center self-center">
                        <WithdrawOffer contract={props.contract}/>
                    </div>
                    <div>
                        <ExtendExpiry contract={props.contract}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="grid grid-cols-2 justify-center">
                    <div className="justify-self-center self-center">
                        <AcceptOffer contract={props.contract}/>
                    </div>
                    <div>
                        <ExtendExpiry contract={props.contract}/>
                    </div>
                </div>
            )
        }
    } else if (props.contract.state === ContractState.A_PERFORMANCE) {
        if (role() === 'payer') {
            return (
                <div className="grid grid-cols-3 justify-center">
                    <div className="justify-self-center self-center">
                        <ConfirmPerformance contract={props.contract}/>
                    </div>
                    <div className="justify-self-center self-center">
                        <TriggerDispute contract={props.contract}/>
                    </div>
                    <div>
                        <ExtendExpiry contract={props.contract}/>
                    </div>
                </div>
            )
        } else {
            return (
                <div className="grid grid-cols-3 justify-center">
                    <div className="justify-self-center self-center">
                        <ExpiredWithdraw contract={props.contract}/>
                    </div>
                    <div className="justify-self-center self-center">
                        <TriggerDispute contract={props.contract}/>
                    </div>
                    <div>
                        <ExtendExpiry contract={props.contract}/>
                    </div>
                </div>
            )
        }
    } else {
        return (
            <div className="m-10">
                <h1>No actions available at this stage</h1>
            </div>
        )        
    }
}

export default DisplayButtons