import { MoneyInput } from "money-react";
import { useState } from "react";

const App = () => {
  const [amount, setAmount] = useState("5001.0");
  return (
    <div>
      Vite + React
      <div>
        <MoneyInput
          name="ok"
          value={amount}
          onChange={(v) => setAmount(v)}
        ></MoneyInput>
      </div>
    </div>
  );
};

export default App;
