type Falsey = number | false | null | undefined | "";

type Arg<ClassName extends string> =
  | ClassName
  | Falsey
  | Record<ClassName, string | true | Falsey>;

export const classes = <ClassName extends string>(
  ...args: Arg<ClassName>[]
) => {
  const classNames: ClassName[] = [];

  for (const arg of args) {
    if (typeof arg === "string" && arg !== "") {
      classNames.push(arg);
    } else if (typeof arg === "object" && arg !== null) {
      classNames.push(
        ...(Object.keys(arg) as ClassName[]).filter((key) => Boolean(arg[key]))
      );
    }
  }

  return classNames.join(" ");
};
