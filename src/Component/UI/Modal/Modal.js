import React,{Component} from 'react';
import Backdrop from '../Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import classes from './Modal.module.css';

class Modal extends Component
{
    shouldComponentUpdate(nextProps, nextState)
    {
        return nextProps.show !== this.props.show || nextProps.children!== this.props.children ;
    }

    componentWillUpdate(){
        console.log('Modal Update, comptWillUpdate');
    }
    render(){
        return(
            <Auxiliary>
                <Backdrop show={this.props.show} clicked={this.props.modalClicked}/>
            <div className={classes.Modal}  style = {{
                transform : this.props.show ? 'translateY(0)' : '-100vh',
                opacity: this.props.show ? '1' : '0',
                zIndex : this.props.show ? '500' : '-1',
            }}>
                {this.props.children}
            </div>
            </Auxiliary>
        );
    }
   
}

export default Modal;