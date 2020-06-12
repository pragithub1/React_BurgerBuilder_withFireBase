import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import DrawerToggler from '../SideDrawer/DrawerToggler/DrawerToggler';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = (props) =>(
    <header className={classes.Toolbar}>
        <DrawerToggler clicked={props.clickedToggler}/>
        <Logo height="80%"/>
        <nav className={classes.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
);

export default toolbar;