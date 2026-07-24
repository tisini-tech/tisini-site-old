import React, { ReactNode } from "react";
import { ColorModeContext, useMode } from "./ScoresTheme";
import { CssBaseline, ThemeProvider } from "@mui/material";

type ThemeProviderWrapperProps = {
  children: ReactNode;
};

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
}) => {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={[theme, colorMode]}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeProviderWrapper;
