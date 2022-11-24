import { tokenToDecimal } from '../utils/tokens';
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
import {
    NUM,
} from '../utils/constants';


const initCollective = (
    collectiveAddress: Address,
    creationDate: i32,
    ownerAddress: Address,
    participants: Address[],
    cliff: i32,
    vestingTime: i32,
): Collective => {
    const id = collectiveAddress.toHexString();
    let collective = Collective.load(id);
    if (!collective) {
        collective = new Collective(id);
        collective.ownerAddress = ownerAddress.toHexString();
        collective.participants = participants;
        collective.creation_date = creationDate;
        collective.cliff = cliff;
        collective.vesting_time = vestingTime;
        collective.save();
    }
    return collective;
}

const initCollectiveParticipant = (
    collectiveAddress: Address,
    participantAddress: Address,
    name: string,
    tokenAddress: Address,
    amount: BigDecimal,
    price: BigDecimal
): CollectiveParticipant => {
    const id = collectiveAddress.toHexString() + '-' + participantAddress.toHexString();
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
        cp.unstakedAmount = NUM.ZERO;
    }
    return cp;
}

const initCollectiveParticipantClaim = (
    collectiveAddress: Address,
    participantAddress: Address,
    tokenAddress: Address,
    claimAmount: BigDecimal,
): CollectiveParticipantClaim => {
    const id = collectiveAddress.toHexString()
        + '-' + participantAddress.toHexString()
        + '-' + tokenAddress.toHexString();
    let cpc = CollectiveParticipantClaim.load(id);
    if (!cpc) {
        cpc = new CollectiveParticipantClaim(id);
        cpc.collectiveParticipant = collectiveAddress.toHexString()
            + '-' + participantAddress.toHexString();
        cpc.claimAmount = claimAmount;
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
    initCollective(
        collectiveAddress,
        creationDate,
        ownerAddress,
        users,
        cliff,
        vestingTime
    );
    for (let i = 0; i < users.length; i++) {
        initCollectiveParticipant(
            collectiveAddress,
            users[i],
            names[i],
            tokens[i],
            tokenToDecimal(amounts[i], 18, 7),  //todo: always 18 decimals?
            tokenToDecimal(prices[i], 18, 7),   //todo: always 18 decimals?
        );
        initCollectiveParticipantClaim(
            collectiveAddress,
            users[i],
            tokens[i],
            NUM.ZERO,
        );
    }
}