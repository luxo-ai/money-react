import React from "react";

import styles from "./PhantomButton.module.css";
import { classes } from "../helpers/classes";
import type { ButtonBaseProps, WithAriaLabelProps } from "./types";

type PhantomButtonProps = ButtonBaseProps;

export const PhantomButton = ({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledby,
  style,
  children,
  onClick,
  className,
  disabled,
  type = "button",
}: WithAriaLabelProps<PhantomButtonProps>) => {
  return (
    <button
      aria-disabled={disabled}
      disabled={disabled}
      aria-labelledby={ariaLabelledby}
      aria-label={ariaLabel}
      style={style}
      type={type}
      className={classes(styles.root, className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
