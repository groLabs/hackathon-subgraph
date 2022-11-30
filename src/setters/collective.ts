import { initUser } from './user';
import { NUM } from '../utils/constants';
import {
    getBase,
    tokenToDecimal
} from '../utils/tokens';
import {
    generateCpId,
    generateCpcId,
} from '../utils/collectives';
import {
    Address,
    BigInt,
    BigDecimal,
} from '@graphprotocol/graph-ts';
import {
    Collective,
    CollectiveParticipant,
    CollectiveParticipantClaim,
} from '../../generated/schema';


const initCollective = (
    collectiveAddress: Address,
    creationDate: i32,
    ownerAddress: Address,
    cliff: i32,
    vestingTime: i32,
): Collective => {
    const id = collectiveAddress.toHexString();
    let col = Collective.load(id);
    if (!col) {
        col = new Collective(id);
        col.ownerAddress = ownerAddress.toHexString();
        col.creation_date = creationDate;
        col.cliff = cliff;
        col.vesting_time = vestingTime;
        col.started = false;
        col.started_date = 0;
        col.save();
    }
    return col;
}

const initCollectiveParticipant = (
    collectiveAddress: Address,
    participantAddress: Address,
    name: string,
    tokenAddress: Address,
    amount: BigDecimal,
    price: BigDecimal
): CollectiveParticipant => {
    const id = generateCpId(
        collectiveAddress,
        participantAddress,
    );
    let cp = CollectiveParticipant.load(id);
    if (!cp) {
        cp = new CollectiveParticipant(id);
        cp.collectiveAddress = collectiveAddress.toHexString();
        cp.participantAddress = participantAddress.toHexString();
        cp.name = name;
        cp.tokenAddress = tokenAddress;
        cp.amount = amount;
        cp.price = price;
        cp.stakedAmount = NUM.ZERO;
        cp.depositedShare = NUM.ZERO;
        cp.lastCheckpointTWAP = 0;
        cp.lastCheckpointTime = 0;
        cp.lastCheckpointPercentageVested = 0;
        cp.save();
    }
    return cp;
}

const initCollectiveParticipantClaim = (
    collectiveAddress: Address,
    participantAddress: Address,
    tokenAddress: Address,
    claimAmount: BigDecimal,
): CollectiveParticipantClaim => {
    const id = generateCpcId(
        collectiveAddress,
        participantAddress,
        tokenAddress,
    );
    let cpc = CollectiveParticipantClaim.load(id);
    if (!cpc) {
        cpc = new CollectiveParticipantClaim(id);
        cpc.collectiveParticipant = collectiveAddress.toHexString()
            + '-' + participantAddress.toHexString();
        cpc.claimAmount = claimAmount;
        cpc.tokenAddress = tokenAddress;
        cpc.save();
    }
    return cpc;
}

export const setNewCollective = (
    collectiveAddress: Address,
    ownerAddress: Address,
    creationDate: i32,
    names: string[],
    tokens: Address[],
    prices: BigInt[],
    users: Address[],
    amounts: BigInt[],
    cliff: i32,
    vestingTime: i32,
): void => {
    initUser(ownerAddress);
    initCollective(
        collectiveAddress,
        creationDate,
        ownerAddress,
        cliff,
        vestingTime
    );
    for (let i = 0; i < users.length; i++) {
        initUser(users[i]);
        const base = getBase(tokens[i]);
        const amount = tokenToDecimal(amounts[i], base, 7);
        initCollectiveParticipant(
            collectiveAddress,
            users[i],
            names[i],
            tokens[i],
            amount,
            prices[i].toBigDecimal(),
        );
        initCollectiveParticipantClaim(
            collectiveAddress,
            users[i],
            tokens[i],
            NUM.ZERO,
        );
    }
}

export const setNewAdmin = (
    collectiveAddress: Address,
    adminAddress: Address
): void => {
    const id = collectiveAddress.toHexString();
    let col = Collective.load(id);
    if (col) {
        col.ownerAddress = adminAddress.toHexString();
        col.save();
    }
}

// possibly to be removed
export const setTokensStaked = (
    collectiveAddress: Address,
    participantAddress: Address,
    amount: BigDecimal,
): void => {
    const id = generateCpId(
        collectiveAddress,
        participantAddress,
    );
    let cp = CollectiveParticipant.load(id);
    if (cp) {
        cp.stakedAmount = cp.stakedAmount.plus(amount);
        cp.save();
    }
}

export const setTokensStakedOrUnstaked = (
    collectiveAddress: Address,
    participantAddress: Address,
    amount: BigDecimal,
    side: string,
    depositedShare: BigDecimal,
    lastCheckpointTWAP: i32,
    lastCheckpointTime: i32,
    lastCheckpointPercentageVested: i32,
): void => {
    const id = generateCpId(
        collectiveAddress,
        participantAddress,
    );
    let cp = CollectiveParticipant.load(id);
    if (cp) {
        if (side == 'staked') {
            cp.stakedAmount = cp.stakedAmount.plus(amount);
            cp.depositedShare = depositedShare;
            cp.lastCheckpointTWAP = lastCheckpointTWAP;
            cp.lastCheckpointTime = lastCheckpointTime;
            cp.lastCheckpointPercentageVested = lastCheckpointPercentageVested;
        } else if (side == 'unstake') {
            cp.stakedAmount = cp.stakedAmount.minus(amount);
        }
        cp.save();
    }
}

export const setTokensClaimed = (
    collectiveAddress: Address,
    participantAddress: Address,
    tokens: Address[],
    claims: BigInt[],
    unstaked: BigDecimal,
): void => {
    const id = generateCpId(
        collectiveAddress,
        participantAddress,
    );
    let cp = CollectiveParticipant.load(id);
    if (cp) {
        cp.stakedAmount = cp.stakedAmount.minus(unstaked);
        cp.save();
    }
    // missing: deduct claim on amounts
    for (let i = 0; i < tokens.length; i++) {
        const id = generateCpcId(
            collectiveAddress,
            participantAddress,
            tokens[i],
        );
        const base = getBase(tokens[i]);
        const claim = tokenToDecimal(claims[i], base, 7);
        let cpc = CollectiveParticipantClaim.load(id);
        if (cpc) {
            cpc.claimAmount = cpc.claimAmount.plus(claim);
            cpc.save();
        }
    }
}

export const setPoolInitialized = (
    collectiveAddress: Address,
    startDate: i32,
): void => {
    const id = collectiveAddress.toHexString();
    let col = Collective.load(id);
    if (col) {
        col.started = true;
        col.started_date = startDate;
        col.save();
    }
}