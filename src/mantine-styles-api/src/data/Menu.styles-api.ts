import type { MenuFactory } from '@mantine/core';
import { PopoverStylesApi } from './Popover.styles-api';
import type { StylesApiData } from '../types';

export const MenuStylesApi: StylesApiData<MenuFactory> = {
  selectors: {
    ...PopoverStylesApi.selectors,
    divider: '`Menu.Divider` root element',
    label: '`Menu.Label` root element',
    item: '`Menu.Item` root element',
    itemLabel: 'Label of `Menu.Item`',
    itemSection: 'Left and right sections of `Menu.Item`',
  },

  vars: {},
};
