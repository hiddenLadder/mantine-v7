import React from 'react';
import {
  Box,
  BoxProps,
  StylesApiProps,
  factory,
  ElementProps,
  useProps,
  useStyles,
  createVarsResolver,
  Factory,
  MantineSize,
  getSize,
  getFontSize,
} from '@mantine/core';
import dayjs from 'dayjs';
import { ControlsGroupSettings } from '../../types';
import { PickerControl, PickerControlProps } from '../PickerControl';
import { getYearsData } from './get-years-data/get-years-data';
import { getYearInTabOrder } from './get-year-in-tab-order/get-year-in-tab-order';
import { useDatesContext } from '../DatesProvider';
import { isYearDisabled } from './is-year-disabled/is-year-disabled';
import classes from './YearsList.module.css';

export type YearsListStylesNames =
  | 'yearsListControl'
  | 'yearsList'
  | 'yearsListCell'
  | 'yearsListRow';

export type YearsListCssVariables = {
  yearsList:
    | '--yl-control-size'
    | '--yl-fz'
    | '--yl-control-selected-bg'
    | '--yl-control-selected-color'
    | '--yl-control-selected-bg-hover'
    | '--yl-control-range-bg'
    | '--yl-control-range-bg-hover';
};

export interface YearsListSettings extends ControlsGroupSettings {
  /** Prevents focus shift when buttons are clicked */
  __preventFocus?: boolean;

  /** Determines whether propagation for Escape key should be stopped */
  __stopPropagation?: boolean;

  /** dayjs format for years list, `'YYYY'` by default  */
  yearsListFormat?: string;

  /** Adds props to year picker control based on date */
  getYearControlProps?(date: Date): Partial<PickerControlProps>;

  /** Component size */
  size?: MantineSize;

  /** Determines whether controls should be separated by spacing, true by default */
  withCellSpacing?: boolean;
}

export interface YearsListProps
  extends BoxProps,
    YearsListSettings,
    StylesApiProps<YearsListFactory>,
    ElementProps<'table'> {
  __staticSelector?: string;

  /** Decade for which years list should be displayed */
  decade: Date;
}

export type YearsListFactory = Factory<{
  props: YearsListProps;
  ref: HTMLTableElement;
  stylesNames: YearsListStylesNames;
  vars: YearsListCssVariables;
}>;

const defaultProps: Partial<YearsListProps> = {
  yearsListFormat: 'YYYY',
  size: 'sm',
  withCellSpacing: true,
};

const varsResolver = createVarsResolver<YearsListFactory>((theme, { size }) => {
  const selectedColors = theme.variantColorResolver({
    color: theme.primaryColor,
    theme,
    variant: 'filled',
  });

  const rangeColors = theme.variantColorResolver({
    color: theme.primaryColor,
    theme,
    variant: 'light',
  });

  return {
    yearsList: {
      '--yl-control-size': getSize(size, 'yl-control-size'),
      '--yl-fz': getFontSize(size),
      '--yl-control-selected-bg': selectedColors.background,
      '--yl-control-selected-color': selectedColors.color,
      '--yl-control-selected-bg-hover': selectedColors.hover,
      '--yl-control-range-bg': rangeColors.hover,
      '--yl-control-range-bg-hover': rangeColors.background,
    },
  };
});

export const YearsList = factory<YearsListFactory>((_props, ref) => {
  const props = useProps('YearsList', defaultProps, _props);
  const {
    classNames,
    className,
    style,
    styles,
    unstyled,
    vars,
    decade,
    yearsListFormat,
    locale,
    minDate,
    maxDate,
    getYearControlProps,
    __staticSelector,
    __getControlRef,
    __onControlKeyDown,
    __onControlClick,
    __onControlMouseEnter,
    __preventFocus,
    __stopPropagation,
    withCellSpacing,
    ...others
  } = props;

  const getStyles = useStyles<YearsListFactory>({
    name: __staticSelector || 'YearsList',
    classes,
    props,
    className,
    style,
    classNames,
    styles,
    unstyled,
    vars,
    varsResolver,
    rootSelector: 'yearsList',
  });

  const ctx = useDatesContext();

  const years = getYearsData(decade);

  const yearInTabOrder = getYearInTabOrder(years, minDate, maxDate, getYearControlProps);

  const rows = years.map((yearsRow, rowIndex) => {
    const cells = yearsRow.map((year, cellIndex) => {
      const controlProps = getYearControlProps?.(year);
      const isYearInTabOrder = dayjs(year).isSame(yearInTabOrder, 'year');
      return (
        <td
          key={cellIndex}
          {...getStyles('yearsListCell')}
          data-with-spacing={withCellSpacing || undefined}
        >
          <PickerControl
            {...getStyles('yearsListControl')}
            data-mantine-stop-propagation={__stopPropagation || undefined}
            disabled={isYearDisabled(year, minDate, maxDate)}
            ref={(node) => __getControlRef?.(rowIndex, cellIndex, node!)}
            {...controlProps}
            onKeyDown={(event) => {
              controlProps?.onKeyDown?.(event);
              __onControlKeyDown?.(event, { rowIndex, cellIndex, date: year });
            }}
            onClick={(event) => {
              controlProps?.onClick?.(event);
              __onControlClick?.(event, year);
            }}
            onMouseEnter={(event) => {
              controlProps?.onMouseEnter?.(event);
              __onControlMouseEnter?.(event, year);
            }}
            onMouseDown={(event) => {
              controlProps?.onMouseDown?.(event);
              __preventFocus && event.preventDefault();
            }}
            tabIndex={__preventFocus || !isYearInTabOrder ? -1 : 0}
          >
            {dayjs(year).locale(ctx.getLocale(locale)).format(yearsListFormat)}
          </PickerControl>
        </td>
      );
    });

    return (
      <tr key={rowIndex} {...getStyles('yearsListRow')}>
        {cells}
      </tr>
    );
  });

  return (
    <Box component="table" ref={ref} {...getStyles('yearsList')} {...others}>
      <tbody>{rows}</tbody>
    </Box>
  );
});

YearsList.classes = classes;
YearsList.displayName = '@mantine/core/YearsList';
