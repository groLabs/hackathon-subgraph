import {
    Bytes,
    Address,
    BigDecimal,
} from "@graphprotocol/graph-ts";
import {
    Num,
    Addr,
} from '../types/constants';

// Blocks
export const GENESIS_POOL_GRO_WETH = 13355180;  // Oct-04-2021 10:03:33 PM

// Timestamps
export const TS_LAUNCH = 1622204347;    // Friday 28 May 2021 12:19:07

// Numbers
export const DECIMALS = 7;
export const NO_POOL = -1;
export const NUM: Num = {
    ZERO: BigDecimal.fromString('0'),
    ONE: BigDecimal.fromString('1'),
    MINUS_ONE: BigDecimal.fromString('-1'),
    THIRTY_PERCENT: BigDecimal.fromString('0.3'),
    GVT_START_FACTOR: BigDecimal.fromString('0.005'),
    PWRD_START_FACTOR: BigDecimal.fromString('1'),
}

// Default addresses
export const NO_ADDR = Bytes.empty();

// Contract addresses
export const ADDR: Addr = {
    ZERO: Address.fromString('0x0000000000000000000000000000000000000000'),
    GVT: Address.fromString('0x3ADb04E127b9C0a5D36094125669d4603AC52a0c'),
    PWRD: Address.fromString('0xF0a93d4994B3d98Fb5e3A2F90dBc2d69073Cb86b'),
    UNISWAPV2_GVT_GRO: Address.fromString('0x2ac5bC9ddA37601EDb1A5E29699dEB0A5b67E9bB'),
    UNISWAPV2_GRO_USDC: Address.fromString('0x21C5918CcB42d20A2368bdCA8feDA0399EbfD2f6'),
    UNISWAPV2_USDC_WETH: Address.fromString('0xB4e16d0168e52d35CaCD2c6185b44281Ec28C9Dc'),
}

// Function signatures
export const ERC20_TRANSFER_SIG = '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef';
export const LOG_WITHDRAWAL_SIG_V1 = '0x689bb63474b1590d4af4604d8f614b11b86fc5ae0a73cd6352e2f79adce66407';
export const LOG_WITHDRAWAL_SIG_V23 = '0x64801196bdd255d4dd88bfd3e78324c2d63634b67e53e04166db348f7cd96490';
export const LOG_DEPOSIT_SIG_V1 = '0x8bad9850b3d2edc5660781f45a304359a1ad12bfd16a0c6333f86b9ff55be0a1';
export const LOG_DEPOSIT_SIG_V23 = '0x106d567c81498246019397cc04d5ce37ba76461ce2c881c06a2097b13b9b0fc9';
export const LOG_DEPOSIT_STAKER_SIG = '0x9dbb0e7dda3e09710ce75b801addc87cf9d9c6c581641b3275fca409ad086c62';
export const LOG_WITHDRAW_STAKER_SIG = '0xda9a10d7b992511ddadbfc7ff712c1424ce2058bbcdac8c9876d6f8de590d43f';

// Stablecoin approvals no needed for now (they kill performance!)
// export const DAI_ADDRESS = Address.fromString('0x6B175474E89094C44Da98b954EedeAC495271d0F');
// export const USDC_ADDRESS = Address.fromString('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48');
// export const USDT_ADDRESS = Address.fromString('0xdAC17F958D2ee523a2206206994597C13D831ec7');