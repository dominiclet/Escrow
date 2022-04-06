import { Step, Stepper } from 'react-form-stepper';
import {ContractState} from '../interfaces/DashboardDetails'

interface Props {
    state: ContractState;
}

const StepperComponent = (props: Props) => {
    if (props.state == 4) {
        return (
            <div>
                <span className="px-2 py-1 font-medium leading-tight text-green-700 bg-green-100 rounded-sm text-center">Disputed</span>
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
