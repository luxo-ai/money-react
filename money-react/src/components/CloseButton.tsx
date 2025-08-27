import { CloseOutlineSvg } from "./CloseOutlineSvg";
import styles from "./CloseButton.module.css";
import { PhantomButton } from "./PhantomButton";
import { classes } from "../helpers/classes";
import type { ButtonBaseProps, WithAriaLabelProps } from "./types";

const DEFAULT_SIZE = "1.375rem";

export type CloseButtonProps = ButtonBaseProps & {
  size?: string | number;
  colorFg?: string;
  colorBg?: string;
};

export const CloseButton = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  style,
  children,
  onClick,
  className,
  disabled,
  type = "button",
  size,
  colorFg,
  colorBg,
}: WithAriaLabelProps<CloseButtonProps>) => {
  let varStyles = {};

  if (colorFg) {
    varStyles = {
      ...varStyles,
      "--close-button-color-fg": colorFg,
    } as React.CSSProperties;
  }

  if (colorBg) {
    varStyles = {
      ...varStyles,
      "--close-button-color-bg": colorBg,
    } as React.CSSProperties;
  }

  return (
    <PhantomButton
      className={classes(styles.root, className)}
      onClick={onClick}
      disabled={disabled}
      type={type}
      style={{ ...style, ...varStyles }}
      aria-labelledby={ariaLabelledby}
      aria-label={!ariaLabelledby && !ariaLabel ? "Close" : ariaLabel}
    >
      {children ? (
        children
      ) : (
        <CloseOutlineSvg
          fill="currentColor"
          aria-hidden
          width={size || DEFAULT_SIZE}
          height={size || DEFAULT_SIZE}
        />
      )}
    </PhantomButton>
  );
};
