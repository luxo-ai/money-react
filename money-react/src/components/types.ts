export type WithAriaLabelProps<T> = T & {
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export type ButtonBaseProps = {
  children?: React.ReactNode;
  onClick?:
    | ((e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void)
    | undefined;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
};
