import { useLayoutEffect, useRef, useState } from "react";
import type { RefObject } from "react";

const DEFAULT_CHARS = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
] as const;

const DEFAULT_SIZE_PX = 16;

type HookArgs = {
  ref: RefObject<HTMLElement | null>;
};

export const useSizeDigits = ({ ref }: HookArgs) => {
  const [sizeLookup, setSizeLookup] = useState(
    createInitialLookup(DEFAULT_CHARS, DEFAULT_SIZE_PX)
  );

  useLayoutEffect(() => {
    const anchor = ref.current;

    if (!anchor) {
      return;
    }

    const anchorStyle = window.getComputedStyle(anchor);

    const canvas = document.createElement("canvas"); // off-DOM canvas, fast -- avoids layout
    const canvasCtx = canvas.getContext("2d");
    if (!canvasCtx) {
      console.warn(
        "[useSizeDigits] Canvas 2D context not available. Falling back to default sizes."
      );
      return;
    }

    canvasCtx.font = anchorStyle.font;

    const result = {} as Record<(typeof DEFAULT_CHARS)[number], number>;
    for (const char of DEFAULT_CHARS) {
      const metrics = canvasCtx.measureText(char);
      result[char] = metrics.width;
    }

    setSizeLookup(result);
  }, []);

  return sizeLookup;
};

const createInitialLookup = <Char extends string>(
  chars: readonly Char[],
  defaultSize: number
) => {
  const lookup = {} as Record<Char, number>;
  for (const c of chars) lookup[c] = defaultSize;
  return lookup;
};
