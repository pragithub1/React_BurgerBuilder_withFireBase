import React,{Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.module.css';
import SideDrawer from '../../Component/Navigation/SideDrawer/SideDrawer';
import Toolbar from '../../Component/Navigation/Toolbar/Toolbar';

class Layout extends Component{
    state = {
        showSideDrawer : false
    }

    sideDrawerHandler = () =>{
        this.setState({showSideDrawer:false});
    }

    togglerHandler = () =>{
        this.setState((preState)=>{
            return{showSideDrawer:!preState.showSideDrawer};
        });
    }

    render(){
        return(
            <Auxiliary >
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerHandler}/>
        <Toolbar clickedToggler={this.togglerHandler}/>
        <main className={classes.content}>
            {this.props.children}
        </main>
        </Auxiliary>
        );
    }
}

export default Layout;