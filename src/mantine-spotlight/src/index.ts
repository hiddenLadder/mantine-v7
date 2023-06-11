export {
  spotlight,
  createSpotlightStore,
  useSpotlight,
  openSpotlight,
  closeSpotlight,
  toggleSpotlight,
} from './spotlight.store';
export type { SpotlightState, SpotlightStore } from './spotlight.store';

export { Spotlight } from './Spotlight';
export { SpotlightAction } from './SpotlightAction';
export { SpotlightActionsGroup } from './SpotlightActionsGroup';
export { SpotlightActionsList } from './SpotlightActionsList';
export { SpotlightEmpty } from './SpotlightEmpty';
export { SpotlightFooter } from './SpotlightFooter';
export { SpotlightSearch } from './SpotlightSearch';

export type {
  SpotlightFactory,
  SpotlightFilterFunction,
  SpotlightProps,
  SpotlightStylesNames,
} from './Spotlight';
export type { SpotlightActionProps, SpotlightActionStylesNames } from './SpotlightAction';
export type {
  SpotlightActionsGroupProps,
  SpotlightActionsGroupStylesNames,
} from './SpotlightActionsGroup';
export type {
  SpotlightActionsListProps,
  SpotlightActionsListStylesNames,
} from './SpotlightActionsList';
export type { SpotlightEmptyProps, SpotlightEmptyStylesNames } from './SpotlightEmpty';
export type { SpotlightFooterProps, SpotlightFooterStylesNames } from './SpotlightFooter';
export type { SpotlightSearchProps, SpotlightSearchStylesNames } from './SpotlightSearch';
