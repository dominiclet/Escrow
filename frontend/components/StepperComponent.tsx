import { Step, Stepper } from 'react-form-stepper';

interface Props {
    stage: string;
}

const StepperComponent = (props: Props) => {
        return (
        <div className=''>
            <Stepper steps={[{ label: 'Awaiting Offer' }, { label: 'Awaiting Acceptance' }, { label: 'Awaiting Performance' }, { label: 'Complete' }]} 
            activeStep={props.stage} />
        </div>
    )
}

export default StepperComponent
