import { MantineColor, MantineTheme } from '../../theme.types';
import { parseThemeColor } from '../parse-theme-color/parse-theme-color';
import { darken } from '../darken/darken';

interface GetVariantColorsInput {
  color: MantineColor | undefined;
  theme: MantineTheme;
  variant: string;
  name: string;
}

type GetVariantColorsResult = Record<`--${string}`, string>;

export function getVariantColors({
  color,
  theme,
  variant,
  name,
}: GetVariantColorsInput): GetVariantColorsResult {
  const parsed = parseThemeColor({ color, theme });

  if (variant === 'filled') {
    if (parsed.isThemeColor) {
      if (parsed.shade === undefined) {
        return {
          [`--mantine-${name}-bg`]: `var(--mantine-color-${color}-filled)`,
          [`--mantine-${name}-hover`]: `var(--mantine-color-${color}-filled-hover)`,
        };
      }

      return {
        [`--mantine-${name}-bg`]: `var(--mantine-color-${parsed.color}-${parsed.shade})`,
        [`--mantine-${name}-hover`]: `var(--mantine-color-${parsed.color}-${
          parsed.shade === 9 ? 8 : parsed.shade + 1
        })`,
      };
    }

    return {
      [`--mantine-${name}-bg`]: color!,
      [`--mantine-${name}-hover`]: darken(color!, 0.1),
    };
  }

  if (variant === 'light') {
    return {};
  }

  if (variant === 'subtle') {
    return {};
  }

  if (variant === 'outline') {
    return {};
  }

  if (variant === 'transparent') {
    return {};
  }

  if (variant === 'gradient') {
    return {};
  }

  if (variant === 'default') {
    return {};
  }

  return {};
}
