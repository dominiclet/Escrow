import {Account, Contract, ContractState} from '../../interfaces/DashboardDetails';
import Acceptance from './Acceptance';
import Offer from './Offer';
import Performance from './Performance';

interface Props {
    user: Account;
    contract: Contract;
}

const DisplayButtons = (props: Props) => {

    const role = ():string => {
        if (props.user.username === props.contract.payee.username) {
            return "payee"
        } else return "payer"
    }

    if (props.contract.state === ContractState.A_OFFER && role() === 'payer') {
        return (
            <div>
                <Offer/>
            </div>
        )
    } else if (props.contract.state === ContractState.A_ACCEPTANCE) {
        return (
            <Offer/>
        )
    } else if (props.contract.state === ContractState.A_PERFORMANCE) {
        return (
            <div>Performance</div>
        )
    } else {
        return (
            <div className="m-10">
                <h1>No actions available at this stage</h1>
            </div>
        )        
    }

}

export default DisplayButtons