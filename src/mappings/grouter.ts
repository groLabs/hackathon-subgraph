import {
    LogDeposit,
    LogWithdrawal,
} from '../../generated/GRouter/GRouter';
import { GRouterTx } from '../../generated/schema';
import { tokenToDecimal } from '../utils/tokens';

const setDeposit = (
    ev: LogDeposit,
    type: string
): void => {
    let id = ev.transaction.hash.toHex() + "-" + ev.logIndex.toString();
    let grTx = GRouterTx.load(id);
    if (!grTx) {
        grTx = new GRouterTx(id);
        grTx.sender = ev.params.sender;
        grTx.amount = tokenToDecimal(ev.params.tokenAmount, 18, 7);
        grTx.type = type;
        grTx.save();
    }
}

const setWithdrawal = (
    ev: LogWithdrawal,
    type: string,
): void => {
    let id = ev.transaction.hash.toHex() + "-" + ev.logIndex.toString();
    let grTx = GRouterTx.load(id);
    if (!grTx) {
        grTx = new GRouterTx(id);
        grTx.sender = ev.params.sender;
        grTx.amount = tokenToDecimal(ev.params.tokenAmount, 18, 7);
        grTx.type = type;
        grTx.save();
    }
}

export function handleDeposit(event: LogDeposit): void {
    setDeposit(
        event,
        'core_deposit',
    );
}

export function handleWithdrawal(event: LogWithdrawal): void {
    setWithdrawal(
        event,
        'core_withdrawal'
    );
}
