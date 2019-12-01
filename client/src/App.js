import React from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import GlobalStyle from './GlobalStyle';
import Header from './Header';
import TextCard from './TextCard';
import FAQs from './FAQs';
import Footer from './Footer';
import logo from './logo.svg';
import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle></GlobalStyle>
      <Router>
        <Link to="/">
          <Header>
            <img src={logo} className="App-logo" alt="logo" />
          </Header>
        </Link>
        <Switch>
          <Route path="/faq">
            <FAQs />
          </Route>
          <Route path="/">
            <TextCard />
          </Route>
        </Switch>
        <Footer>
          <span>© 2019 by Mike Barkmin. </span>
          <a href="https://github.com/mikebarkmin/lesbar.club">
            GitHub Repository
          </a>
          <span> | </span>
          <Link to="/faq">FAQs</Link>
        </Footer>
      </Router>
    </ThemeProvider>
  );
}

export default App;
