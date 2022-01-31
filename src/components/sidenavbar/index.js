import React, { useState, useEffect, Fragment, useContext } from "react";
import styled from 'styled-components';
import { Link } from "react-router-dom";

import * as colors from "../../colors";
import Arrow from "../../images/arrow-icon.png";
import SearchWhite from "../../images/search-icon-white.png";
import { withRouter } from "react-router-dom";

import toggleIcon from '../../images/ezgif.com-gif-maker.png'

import {ScreenContext} from '../../store/store';

const SideNavBar = ({ location }) => {
  const [isOpen, setIsOpen] = useState(false);
  /* TODO: Write the necessary functions to open and close the side bar on small screens */
  const path = location.pathname;
  
  const { screenSize } = useContext(ScreenContext);

  useEffect(() => {

    if (screenSize <= 1023) return setIsOpen(false)
    
    return setIsOpen(true)
    
  }, [screenSize])

  return (
    <Fragment>

        {
          isOpen ?

            <SideNavBarCont className={isOpen ? 'visible' : ''}>
              {/* TODO: Implement a hamburger icon that controls the open state of the side bar */}
              {/* The side bar should slide in from left */}
              <SideNavMainLink to="/" exact className={path === '/' ? 'active' : ''}>
                Wesley
                <img src={Arrow} alt="Arrow pointing down" />
              </SideNavMainLink>
              <SideNavMainLink to="/discover" className={path === '/discover' ? 'active' : ''}>
                Discover
                <img src={SearchWhite} alt="Magnifying glass" />
              </SideNavMainLink>
              <SideNavHeader><HeaderText>Watched</HeaderText></SideNavHeader>
              <NavLink to="/watched/movies">Movies</NavLink>
              <NavLink to="/watched/tv-shows">Tv Shows</NavLink>
              <SideNavHeader><HeaderText>Saved</HeaderText></SideNavHeader>
              <NavLink to="/saved/movies">Movies</NavLink>
              <NavLink to="/saved/tv-shows">Tv Shows</NavLink>
              {
                screenSize <= 1023 && 

                  <CloseNavBar onClick={() => setIsOpen(!isOpen)}>
                    X
                  </CloseNavBar>
              }
              
            </SideNavBarCont> :
            <TopNavBarCont>
              <img src={toggleIcon} alt="toggle-icon" style={{ width: '50px', height: '35px', cursor: 'pointer' }} onClick={() => setIsOpen(!isOpen)} />
              {
                path === '/discover' ? <span>Discover</span> :  path === '/' ? <span>Home</span> : ''
              }
            </TopNavBarCont>
        }

    </Fragment>
  );
}
export default withRouter(SideNavBar)

const SideNavBarCont = styled.div`
  position: fixed;
  z-index: 9;
  width: 260px;
  height: 100%;
  background-color: ${colors.sideNavBar};
  color: white;
  display: none;

  &.visible 
  {
    display: block;
  }
`

const SideNavMainLink = styled(Link)`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 35px 35px;
  font-size: 1.6em;
  font-weight: 700;
  color: white;

  &:hover, &:focus-visible {
    background: ${colors.sideNavBarHover};
  }

  &.active {
    background: ${colors.primaryColor};
  }
`

const SideNavHeader = styled.div`
  font-size: 1.6em;
  font-weight: 700;
  padding: 25px 0 15px 35px;
`
const CloseNavBar = styled.div`
  font-size: 1.6em;
  font-weight: 700;
  position: fixed;
  top: 0;
  right: 0;
  color: ${colors.sideNavBar};
  padding: 25px;
  cursor: pointer;
`
const TopNavBarCont = styled.div`
  font-size: 1.6em;
  font-weight: 700;
  padding: 25px;
  display: flex;
  align-items: center;
  column-gap: 25px;
`

const HeaderText = styled.div`
  padding: 0 35px 10px 0;
  border-bottom: 1px solid ${colors.lightBackground};
`

const NavLink = styled(Link)`
  display: block;
  color: white;
  opacity: .8;
  font-size: 1.2em;
  padding: 10px 35px;

  &:hover, &:focus-visible {
    opacity: 1;
    background: ${colors.sideNavBarHover};
  }

  &.active { 
    background: ${colors.primaryColor};
    opacity: 1;
  }
`