import { initUser } from './user';
import { NUM } from '../utils/constants';
import { tokenToDecimal } from '../utils/tokens';
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
    participants: Address[],
    cliff: i32,
    vestingTime: i32,
): Collective => {
    const id = collectiveAddress.toHexString();
    let col = Collective.load(id);
    if (!col) {
        col = new Collective(id);
        col.ownerAddress = ownerAddress.toHexString();
        // col.participants = participants;
        col.creation_date = creationDate;
        col.cliff = cliff;
        col.vesting_time = vestingTime;
        col.initialized = false;
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
        users,
        cliff,
        vestingTime
    );
    for (let i = 0; i < users.length; i++) {
        initUser(users[i]);
        initCollectiveParticipant(
            collectiveAddress,
            users[i],
            names[i],
            tokens[i],
            tokenToDecimal(amounts[i], 18, 7),
            tokenToDecimal(prices[i], 18, 7),
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
): void => {
    const id = generateCpId(
        collectiveAddress,
        participantAddress,
    );
    let cp = CollectiveParticipant.load(id);
    if (cp) {
        if (side == 'staked') {
            cp.stakedAmount = cp.stakedAmount.plus(amount);
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
        let cpc = CollectiveParticipantClaim.load(id);
        if (cpc) {
            const claimAmount = tokenToDecimal(claims[i], 18, 7);
            cpc.claimAmount = cpc.claimAmount.plus(claimAmount);
            cpc.save();
        }
    }
}

export const setPoolInitialized = (
    collectiveAddress: Address,
): void => {
    const id = collectiveAddress.toHexString();
    let col = Collective.load(id);
    if (col) {
        col.initialized = true;
        col.save();
    }
}