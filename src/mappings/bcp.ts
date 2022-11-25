import { log } from '@graphprotocol/graph-ts';
import { tokenToDecimal } from '../utils/tokens';
import {
    setNewAdmin,
    setTokensClaimed,
    setNewCollective,
    setPoolInitialized,
    setTokensStakedOrUnstaked,
} from '../setters/collective';
import {
    LogNewAdmin,
    LogTokensStaked,
    LogTokensClaimed,
    LogTokensUnstaked,
    LogNewPoolInitialized,
    LogNewCollectiveInitialized,
// } from '../../generated/templates/BuidlCollective/BuidlCollective';
} from '../../generated/templates/BuidlCollective/BuidlCollective';


export function handleNewCollective(event: LogNewCollectiveInitialized): void {
    log.error('****** HandleNewCollectiveInitialized {}',[event.params.cliff.toString()]);
    setNewCollective(
        event.address,
        event.transaction.from,
        event.block.timestamp.toI32(),
        event.params.namesOfParticipants,
        event.params.tokens,
        event.params.price,
        event.params.users,
        event.params.targets,
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

export function HandleTokensStaked(event: LogTokensStaked): void {
    setTokensStakedOrUnstaked(
        event.address,
        event.params.user,
        tokenToDecimal(event.params._assetValue, 18, 7),
        'stake',
    );
}

export function HandleTokensUnstaked(event: LogTokensUnstaked): void {
    setTokensStakedOrUnstaked(
        event.address,
        event.params.user,
        tokenToDecimal(event.params._assetValue, 18, 7),
        'unstaked',
    );
}

export function HandleTokensClaimed(event: LogTokensClaimed): void {
    setTokensClaimed(
        event.address,
        event.params.user,
        event.params.tokens,
        event.params.amounts,
        tokenToDecimal(event.params.share, 18, 7), // TODO: event.params.unstakedAmount
    );
}

export function HandleNewPoolInitialized(event: LogNewPoolInitialized): void {
    setPoolInitialized(
        event.address,
    );
}
