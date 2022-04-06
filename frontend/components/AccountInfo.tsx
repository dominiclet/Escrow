import { Account } from '../interfaces/DashboardDetails';

interface Props {
    user: Account
}

const AccountInfo = (props: Props) => {

    return (
        <div className="float-right">
            <div className="grid grid-cols-3 gap-4">
                <p className="flex justify-end">{props.user.username}</p>
                <p className="flex jusitfy-end">{props.user.walletId.slice(0,5) + '...' + props.user.walletId.slice(-3)}</p>
            </div>
        </div>
    )
}

export default AccountInfo