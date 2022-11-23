import {
    Address,
    BigDecimal,
} from "@graphprotocol/graph-ts";


export class Num {
    public ZERO: BigDecimal;
    public ONE: BigDecimal;
    public MINUS_ONE: BigDecimal;
    public THIRTY_PERCENT: BigDecimal;
    public PWRD_START_FACTOR: BigDecimal;
    public GVT_START_FACTOR: BigDecimal;
}

export class Addr {
    public ZERO: Address;
    public GVT: Address;
    public PWRD: Address;
    public UNISWAPV2_GVT_GRO: Address;
    public UNISWAPV2_GRO_USDC: Address;
    public UNISWAPV2_USDC_WETH: Address;
}