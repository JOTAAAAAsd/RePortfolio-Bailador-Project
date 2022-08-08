import React from "react";

import AppRouting from "./routing/AppRouting";



import { AuthProvider } from "./CONTEXT/Auth_context";


// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import "../src/statics/css/styles.css";

// Context
import ThemeProvider from 'react-bootstrap/ThemeProvider'


const App = () => {



  return (
    <>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs"
      >

        <AuthProvider>

          <AppRouting />

        </AuthProvider>

      </ThemeProvider>
    </>
  );
}

export default App;