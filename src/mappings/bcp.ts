import { NUM } from '../utils/constants';
import { tokenToDecimal } from '../utils/tokens';
import { LogDeposit } from '../../generated/GRouter/GRouter';
import {
    LogClaim,
    LogNewAdmin,
    LogNewCollectiveInitialized,
} from '../../generated/Factory/BuidlCollective';
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
        // ** TEMP [], // event.params.name,
        event.params.tokens,
        event.params.price,
        event.params.users,
        event.params.targets, // Amounts?
        event.params.cliff.toI32(),
        event.params.vestimTime.toI32(),
    );
}

export function HandleNewAdmin(event: LogNewAdmin): void {
    setNewAdmin(
        event.address,
        event.params.newAdmin,
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

export function HandleTokensClaimed(event: LogClaim): void {
    setTokensClaimed(
        event.address,
        event.params.user,
        event.params.tokens,
        event.params.amounts, // event.params.claim,
        tokenToDecimal(event.params.share, 18, 7), // event.params.unstakedAmount
    );
}

export function HandleNewPoolInitialized(event: LogDeposit): void {
    setPoolInitialized(
        event.address,
    );
}
