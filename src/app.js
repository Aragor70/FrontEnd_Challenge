import React, {useMemo, useState, useLayoutEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled from 'styled-components';

import SideNavBar from "./components/sidenavbar";

import Discover from "./pages/discover";

import './css/app.scss'; 


import { ScreenContext } from './store/store';

const App = (props) => {

  const [screenSize, setScreenSize] = useState(null)

  useLayoutEffect(() => {
    
    window.addEventListener('resize', () => setScreenSize([window.innerWidth]));

    setScreenSize([window.innerWidth])

    return () => window.removeEventListener('resize', () => setScreenSize([window.innerWidth]));

  }, []);


  const value = useMemo(() => ({ screenSize, setScreenSize }), [screenSize]);

  
    return (
      <Router>
        <ScreenContext.Provider value={value}>
        <PageContainer>

          <SideNavBar {...props} />
          <ContentWrapper>
            <Switch>
              <Route exact path="/discover" component={Discover} {...props}/>
            </Switch>
          </ContentWrapper>
        </PageContainer>
        </ScreenContext.Provider>
      </Router>
    );
}
export default App;

const ContentWrapper = styled.main`
  
`

const PageContainer = styled.main`
  overflow-x: hidden;
  box-sizing: border-box;
`
