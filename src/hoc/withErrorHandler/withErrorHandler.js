import React,{Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Model from '../../Component/UI/Modal/Modal';

const withErrorHandler = (WrappedContainer,axios) =>{
    return class extends Component{

            state={
                error:null
            }
            
        componentWillMount(){
            this.reqInterceptors = axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });
            this.resInterceptors = axios.interceptors.response.use(res=>res, error=>{
                this.setState({error:error})
            });
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.reqInterceptors);
            axios.interceptors.response.eject(this.resInterceptors);
        }

        onClickHandler(){
            this.setState({error:null});
        }
        
        render()
        {
            return(
                <Auxiliary>
                <Model show={this.state.error} modalClicked={this.onClickHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Model>
            <WrappedContainer/>
            </Auxiliary>
            );
        }
    }
}

export default withErrorHandler;