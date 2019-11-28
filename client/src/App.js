import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import TextCard from './TextCard';
import Footer from './Footer';
import logo from './logo.svg';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle></GlobalStyle>
      <Header>
        <img src={logo} className="App-logo" alt="logo" />
      </Header>
      <TextCard />
      <Footer>
        © 2019 by Mike Barkmin.
        <a href="https://github.com/mikebarkmin/lesbar.club">
          GitHub Repository
        </a>
      </Footer>
    </ThemeProvider>
  );
}

export default App;
