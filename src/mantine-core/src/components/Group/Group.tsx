import React from 'react';
import {
  Box,
  BoxProps,
  StylesApiProps,
  factory,
  ElementProps,
  useComponentDefaultProps,
  useStylesApi,
  MantineSpacing,
  getSpacing,
  useComponentVars,
} from '../../core';
import { filterFalsyChildren } from './filter-falsy-children/filter-falsy-children';
import classes from './Group.module.css';

export type GroupStylesNames = 'root';
export type GroupVariant = string;
export type GroupCssVariables =
  | '--group-gap'
  | '--group-align'
  | '--group-justify'
  | '--group-wrap'
  | '--group-child-width';

export interface GroupStylesParams {
  gap: MantineSpacing | string | number | undefined;
  align: React.CSSProperties['alignItems'] | undefined;
  justify: React.CSSProperties['justifyContent'] | undefined;
  wrap: React.CSSProperties['flexWrap'] | undefined;
  childrenCount: number;
  preventGrowOverflow: boolean | undefined;
  grow: boolean | undefined;
}

export interface GroupProps
  extends BoxProps,
    StylesApiProps<GroupStylesNames, GroupVariant, GroupCssVariables>,
    ElementProps<'div'> {
  /** Controls `justify-content` CSS property, `'flex-start'` by default */
  justify?: React.CSSProperties['justifyContent'];

  /** Controls `align-items` CSS property, `'center'` by default */
  align?: React.CSSProperties['alignItems'];

  /** Controls `flex-wrap` CSS property, `'nowrap'` by default */
  wrap?: React.CSSProperties['flexWrap'];

  /** Key of `theme.spacing` or any valid CSS value for `gap`, numbers are converted to rem (1rem = 16px), `'md'` by default */
  gap?: MantineSpacing | string | number;

  /** Determines whether each child element should have `flex-grow: 1` style, `false` by default */
  grow?: boolean;

  /** Determines whether children should take only dedicated amount of space (`max-width` style is set based on the number of children), `true` by default */
  preventGrowOverflow?: boolean;
}

export interface GroupFactory {
  props: GroupProps;
  ref: HTMLDivElement;
  stylesNames: GroupStylesNames;
  vars: GroupCssVariables;
  stylesParams: GroupStylesParams;
}

const defaultProps: Partial<GroupProps> = {
  justify: 'flex-start',
  align: 'center',
  gap: 'md',
  preventGrowOverflow: true,
};

export const Group = factory<GroupFactory>((props, ref) => {
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    children,
    gap,
    align,
    justify,
    wrap,
    grow,
    preventGrowOverflow,
    vars,
    ...others
  } = useComponentDefaultProps('Group', defaultProps, props);

  const getStyles = useStylesApi({
    name: 'Group',
    className,
    style,
    classes,
    classNames,
    styles,
    unstyled,
  });

  const filteredChildren = filterFalsyChildren(children);
  const childrenCount = filteredChildren.length;
  const childWidth = `calc(${100 / childrenCount}% - (${getSpacing(gap)} - ${getSpacing(
    gap
  )} / ${childrenCount}))`;

  const _vars = useComponentVars<GroupStylesParams>('Group', vars, {
    align,
    gap,
    justify,
    wrap,
    childrenCount,
    preventGrowOverflow,
    grow,
  });

  return (
    <Box
      {...getStyles('root')}
      ref={ref}
      vars={{
        '--group-child-width': grow && preventGrowOverflow ? childWidth : undefined,
        '--group-gap': getSpacing(gap),
        '--group-align': align,
        '--group-justify': justify,
        '--group-wrap': wrap,
        ..._vars,
      }}
      data-grow={grow || undefined}
      {...others}
    >
      {filteredChildren}
    </Box>
  );
});

Group.displayName = '@mantine/core/Group';
