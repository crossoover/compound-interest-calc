import React, { FC, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import storage from "local-storage-fallback";
import { ThemeProvider } from "styled-components";

import { defaultState } from "./state/defaultState";
import { VariablesForm } from "./components/VariablesForm";
import { GlobalStyle, AppWrapper, HeaderWrapper, AppContainer, Divider } from "./styles/GlobalStyles";
import { CompoundInterestChart } from "./components/CompoundInterestChart";
import { ToggleThemeButton } from "./components/ToggleThemeButton";

export const getInitialTheme = () => {
  const savedTheme = storage.getItem("theme");
  return savedTheme ? JSON.parse(savedTheme) : { mode: "light" };
}

const App: FC = () => {
  const [state, setState] = useState(defaultState);
  const [theme, setTheme] = useState(getInitialTheme);
  
  useEffect(() => {
    storage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  const toggledTheme = () => setTheme({ mode: theme.mode === "dark" ? "light" : "dark" })
  
  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyle />
        <AppWrapper>
          <HeaderWrapper>
            <h1>Compound Interest Calculator</h1>
            <ToggleThemeButton onClick={toggledTheme} theme={theme} />
          </HeaderWrapper>
          <Divider />
          <VariablesForm onUpdate={variables => setState(variables)} />
          <Divider />
          <CompoundInterestChart {...state} />
        </AppWrapper>
      </AppContainer>
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
