import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import { Provider } from "react-redux";

import { THEME_SETTINGS } from "themeSettings";
import { UtilityStyles } from "Styles/Utils";
import Website from "Components/Website";
import { store } from "redux/store";

const theme = createTheme(THEME_SETTINGS);

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <Website />
          <UtilityStyles />
        </MuiThemeProvider>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
