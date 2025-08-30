"use client";
import { CloseButton, MoneyInput } from "money-react";
import { useState } from "react";

const Page = () => {
  const [amount, setAmount] = useState("111111");

  return (
    <div className="flex flex-col gap-4 p-4">
      <h1>Test</h1>
      <MoneyInput name="ok" value={amount} onChange={(v) => setAmount(v)}>
        <CloseButton />
      </MoneyInput>
    </div>
  );
};

export default Page;
