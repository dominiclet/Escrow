import { Step, Stepper } from 'react-form-stepper';
import {ContractState} from '../interfaces/DashboardDetails'

interface Props {
    state: ContractState;
}

const StepperComponent = (props: Props) => {
    if (props.state == 4) {
        return (
            <div>
                <Stepper steps={[{label: 'Disputed'}]} 
                activeStep={0} />               
            </div>
        )
    }

    return (
        <div className=''>
            <Stepper steps={[{ label: 'Awaiting Offer' }, { label: 'Awaiting Acceptance' }, { label: 'Awaiting Performance' }, { label: 'Complete'}]} 
            activeStep={props.state} />
        </div>
    )
}

export default StepperComponent
