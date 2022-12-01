import { NUM } from '../utils/constants';
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
} from '../../generated/templates/BuidlCollective/BuidlCollective';


export function handleNewCollectiveInitialized(
    event: LogNewCollectiveInitialized
): void {
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
        event.params.vestingTime.toI32(),
    );
}

export function handleNewAdmin(event: LogNewAdmin): void {
    setNewAdmin(
        event.address,
        event.params.newAdmin,
    );
}

export function handleTokensStaked(event: LogTokensStaked): void {
    setTokensStakedOrUnstaked(
        event.address,
        event.params.user,
        tokenToDecimal(event.params._assetValue, 18, 7),
        'staked',
        tokenToDecimal(event.params._depositedShare, 18, 7),
        event.params._lastCheckpointTWAP.toI32(),
        event.params._lastCheckpointTime.toI32(),
        event.params._lastCheckpointPercentageVested.toI32(),
    );
}

export function handleTokensUnstaked(event: LogTokensUnstaked): void {
    setTokensStakedOrUnstaked(
        event.address,
        event.params.user,
        tokenToDecimal(event.params._assetValue, 18, 7),
        'unstaked',
        tokenToDecimal(event.params._unstakedShare, 18, 7),
        event.params._lastCheckpointTWAP.toI32(),
        event.params._lastCheckpointTime.toI32(),
        event.params._lastCheckpointPercentageVested.toI32(),
    );
}

export function handleTokensClaimed(event: LogTokensClaimed): void {
    setTokensClaimed(
        event.address,
        event.params.user,
        event.params.tokens,
        event.params.amounts,
        tokenToDecimal(event.params.share, 18, 7), // TODO: event.params.unstakedAmount
    );
}

export function handleNewPoolInitialized(event: LogNewPoolInitialized): void {
    setPoolInitialized(
        event.address,
        event.block.timestamp.toI32(),
    );
}
