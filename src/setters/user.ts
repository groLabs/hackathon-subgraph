import {
    Address,
    BigDecimal,
} from '@graphprotocol/graph-ts';
import {
    User,
} from '../../generated/schema';


const initUser = (
    userAddress: Address
): User => {
    const id = userAddress.toHexString();
    let user = User.load(id);
    if (!user) {
        user = new User(id);
    }
    return user;
}
