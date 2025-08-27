import React, { useMemo, useRef } from "react";

import styles from "./MoneyInput.module.css";
import { type CloseButtonProps } from "@components/CloseButton";
import type { WithAriaLabelProps } from "@components/types";
import { classes } from "./helpers/classes";

const MAX_LENGTH = 30;

type MoneyInputProps = {
  name?: string;
  className?: string;
  disabled?: boolean;
  tabIndex?: number;
  maxDecimalPlaces?: number;
  currencySymbol?: string;
  error?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  children?: React.ReactElement<WithAriaLabelProps<CloseButtonProps>>;
};

export const MoneyInput = ({
  name,
  currencySymbol = "$",
  maxDecimalPlaces = 2,
  error,
  className,
  value,
  disabled,
  tabIndex,
  onChange,
  children,
  ...props
}: MoneyInputProps) => {
  const ref = useRef<HTMLInputElement>(null);
  const inputWidthScale = value ? String(value).length : 1;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const valueString = String(e.currentTarget.value || "");
    const selectionStart = e.currentTarget.selectionStart;

    // Allow control keys
    if (
      ["Backspace", "Delete", "Tab", "ArrowLeft", "ArrowRight"].includes(e.key)
    ) {
      return;
    }

    if (
      valueString.length >= MAX_LENGTH &&
      !["Backspace", "Delete"].includes(e.key)
    ) {
      e.preventDefault();
      return;
    }

    // Allow digits
    if (/^[0-9]$/.test(e.key)) {
      // Check if we're after the decimal point and limit to 4 digits
      const decimalIndex = valueString.indexOf(".");
      if (decimalIndex >= 0 && selectionStart! > decimalIndex) {
        const decimals = valueString.split(".")[1] || "";
        if (decimals.length >= maxDecimalPlaces) {
          e.preventDefault();
        }
      }
      return;
    }

    // Allow one decimal point
    if (e.key === "." && !valueString.includes(".")) {
      return;
    }

    // Block everything else
    e.preventDefault();
  };

  const style = {
    "--money-input-width-scale": inputWidthScale,
  } as React.CSSProperties;

  const currencyStyle = classes(
    styles.currency,
    currencySymbol.length > 1 && styles.textSoft
  );

  const closeButton = useMemo(() => {
    if (children) {
      const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onChange?.("");
        ref?.current?.focus();
        children.props?.onClick?.(e);
      };
      return React.cloneElement(children, {
        ...(children.props || {}),
        onClick,
      });
    }
    return null;
  }, [children, onChange]);

  return (
    <div className={classes(styles.root, className)}>
      <div className={styles.scrollable}>
        <div
          style={style}
          className={classes(
            styles.input,
            disabled && styles.disabled,
            error && styles.error,
            className
          )}
        >
          <span className={currencyStyle}>{currencySymbol}</span>
          <input
            {...props}
            name={name}
            value={value}
            onChange={onChange ? (e) => onChange(e.target.value) : undefined}
            ref={ref}
            disabled={disabled}
            tabIndex={disabled ? -1 : tabIndex}
            type="text"
            placeholder="0"
            inputMode="decimal"
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
      {value && value.length > 0 && closeButton}
    </div>
  );
};
