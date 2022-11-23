import {
    log,
    BigInt,
    BigDecimal,
} from '@graphprotocol/graph-ts';
import {
    NUM,
    ADDR,
    DECIMALS,
} from '../utils/constants';

// Converts a BigInt into a N-decimal BigDecimal
export function tokenToDecimal(
    amount: BigInt,
    precision: i32,
    decimals: i32,
): BigDecimal {
    const scale = BigInt.fromI32(10)
        .pow(precision as u8)
        .toBigDecimal();
    return amount.toBigDecimal()
        .div(scale)
        .truncate(decimals);
}
