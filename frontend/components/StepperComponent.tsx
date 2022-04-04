import { Step, Stepper } from 'react-form-stepper';
import {ContractState} from '../interfaces/DashboardDetails'

interface Props {
    state: ContractState;
}

const StepperComponent = (props: Props) => {
        return (
        <div className=''>
            <Stepper steps={[{ label: 'Awaiting Offer' }, { label: 'Awaiting Acceptance' }, { label: 'Awaiting Performance' }, { label: 'Dispute'}, { label: 'Complete' }]} 
            activeStep={props.state} />
        </div>
    )
}

export default StepperComponent
