import React, { forwardRef } from 'react';
import {
  BoxProps,
  Box,
  ElementProps,
  MantineSize,
  MantineColor,
  MantineRadius,
} from '../../../core';
import { useSliderContext } from '../Slider.context';

export interface SliderRootProps extends BoxProps, ElementProps<'div'> {
  size: MantineSize | (string & {}) | number;
  children: React.ReactNode;
  color: MantineColor | undefined;
  disabled: boolean | undefined;
  variant?: string;
  thumbSize: string | number | undefined;
  radius: MantineRadius | (string & {}) | number | undefined;
}

export const SliderRoot = forwardRef<HTMLDivElement, SliderRootProps>(
  ({ size, disabled, variant, color, thumbSize, radius, ...others }: SliderRootProps, ref) => {
    const { getStyles } = useSliderContext();

    return (
      <Box
        tabIndex={-1}
        variant={variant}
        size={size}
        ref={ref}
        {...getStyles('root')}
        {...others}
      />
    );
  }
);

SliderRoot.displayName = '@mantine/core/SliderRoot';
