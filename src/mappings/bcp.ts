// TO BE REPLACED
import {
    LogDeposit,
} from '../../generated/GRouter/GRouter';
import {
    LogNewCollectiveInitialized
} from '../../generated/Factory/BuidlCollective';
import { NUM } from '../utils/constants';
import { tokenToDecimal } from '../utils/tokens';
import {
    setNewAdmin,
    setTokensStaked,
    setTokensClaimed,
    setNewCollective,
    setPoolInitialized,
} from '../setters/collective';


export function HandleNewCollectiveInitialized(event: LogNewCollectiveInitialized): void {
    setNewCollective(
        event.address,
        event.transaction.from,
        event.block.timestamp.toI32(),
        [], // event.params.name,
        event.params.tokens,
        event.params.price,
        event.params.users,
        event.params.targets, // Amounts?
        event.params.cliff.toI32(),
        event.params.vestimTime.toI32(),
    );
}

export function HandleNewAdmin(event: LogDeposit): void {
    setNewAdmin(
        event.transaction.from,
        event.transaction.from, // event.params.newAdmin,
    );
}

export function HandleTokensStaked(event: LogDeposit): void {
    setTokensStaked(
        event.address,
        event.address, // event.params.user,
        tokenToDecimal(event.params.calcAmount, 18, 7), // event.params.amount,
    );
}

export function HandleTokensUnstaked(event: LogDeposit): void {
    setTokensClaimed(
        event.address,
        event.address, //event.params.user
        [], // event.params.tokens,
        [], // event.params.claim
        NUM.ZERO,
    );
}

export function HandleTokensClaimed(event: LogDeposit): void {
    setTokensClaimed(
        event.address,
        event.address, //event.params.user
        [], // event.params.tokens,
        [], // event.params.claim
        tokenToDecimal(event.params.calcAmount, 18, 7), // event.params.unstakedAmount
    );
}

export function HandleNewPoolInitialized(event: LogDeposit): void {
    setPoolInitialized(
        event.address,
    );
}
