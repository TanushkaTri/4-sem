import { createContext, PropsWithChildren, useState } from "react";

interface KeyContextProps {
  pressedKey: string;
  handleChange: (key: string) => void;
}

export const KeyContext = createContext<KeyContextProps>({
  pressedKey: "",
  handleChange: () => {},
});

interface KeyProviderProps extends PropsWithChildren {}

export function KeyProvider(props: KeyProviderProps) {
  const [pressedKey, setPressedKey] = useState<string>("");

  const handleChange = (key: string) => {
    if (key === "bs") {
      setPressedKey("");
      return;
    }

    if (/^[0-9]$/.test(key)) {
      setPressedKey(key);
    }
  };

  return (
    <KeyContext.Provider value={{ pressedKey, handleChange }}>
      {props.children}
    </KeyContext.Provider>
  );
}
