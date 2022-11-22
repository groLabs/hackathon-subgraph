import { BigInt } from "@graphprotocol/graph-ts"
import {
  Gvt,
  Approval,
  LogAddToWhitelist,
  LogRemoveFromWhitelist,
  LogTransfer,
  OwnershipTransferred,
  Transfer
} from "../generated/Gvt/Gvt"
import { ExampleEntity } from "../generated/schema"

export function handleApproval(event: Approval): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = ExampleEntity.load(event.transaction.from.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ExampleEntity(event.transaction.from.toHex())

    // Entity fields can be set using simple assignments
    entity.count = BigInt.fromI32(0)
  }

  // BigInt and BigDecimal math are supported
  entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.owner = event.params.owner
  entity.spender = event.params.spender

  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.BASE(...)
  // - contract.CHAINLINK_PRICE_DECIMALS(...)
  // - contract.CHAINLINK_PRICE_DECIMAL_FACTOR(...)
  // - contract.DEFAULT_DECIMALS(...)
  // - contract.DEFAULT_DECIMALS_FACTOR(...)
  // - contract.INIT_BASE(...)
  // - contract.PERCENTAGE_DECIMALS(...)
  // - contract.PERCENTAGE_DECIMAL_FACTOR(...)
  // - contract.allowance(...)
  // - contract.approve(...)
  // - contract.balanceOf(...)
  // - contract.balanceOfBase(...)
  // - contract.ctrl(...)
  // - contract.decimals(...)
  // - contract.decreaseAllowance(...)
  // - contract.factor(...)
  // - contract.factor(...)
  // - contract.getAssets(...)
  // - contract.getPricePerShare(...)
  // - contract.getShareAssets(...)
  // - contract.increaseAllowance(...)
  // - contract.name(...)
  // - contract.owner(...)
  // - contract.symbol(...)
  // - contract.totalAssets(...)
  // - contract.totalSupply(...)
  // - contract.totalSupplyBase(...)
  // - contract.transfer(...)
  // - contract.transferFrom(...)
  // - contract.whitelist(...)
}

export function handleLogAddToWhitelist(event: LogAddToWhitelist): void {}

export function handleLogRemoveFromWhitelist(
  event: LogRemoveFromWhitelist
): void {}

export function handleLogTransfer(event: LogTransfer): void {}

export function handleOwnershipTransferred(event: OwnershipTransferred): void {}

export function handleTransfer(event: Transfer): void {}
