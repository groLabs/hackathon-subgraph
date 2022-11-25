import { log } from '@graphprotocol/graph-ts';
import { BuidlCollective } from '../../generated/templates';
import { LogNewBuilderProxyDeployed } from '../../generated/Factory/BuidlerFactory';


export function handleNewProxy(event: LogNewBuilderProxyDeployed): void {
    log.warning('****** handleNewProxy {}', [event.params._clone.toHexString()]);
    BuidlCollective.create(event.params._clone);
}
