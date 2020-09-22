import React, { Component } from 'react'
import Home from './home/Home';
import Products from './Products'
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import {  fetchProducts, loginUser, logoutUser, signupNewUser,
     postProduct, deleteItem ,getMatchParams} from '../redux/actionCreator';
import { connect } from 'react-redux';
import Header from './Header';
import Footer from './Footer'
import AboutUs from './AboutUs'

const mapStateToProps = (state) => ({
    products: state.products,
    auth: state.auth
})
const mapDispatchToProps = (dispatch ) => ({
    loginUser:(cred) => dispatch(loginUser(cred)) ,
    logoutUser:() => dispatch(logoutUser()),
    signupNewUser:(info) => dispatch(signupNewUser(info)),
    postProduct : (product) => dispatch(postProduct(product)),
    deleteItem  : (id) => dispatch(deleteItem(id)),
    getMatchParams :(params) =>dispatch(getMatchParams(params)),
    
    // fetchProductsById :(id) => dispatch(fetchProductsById(id)),
    
    fetchProducts: () =>  dispatch(fetchProducts()) 
        
   
})
class Main extends Component {
    state={
        ids:'',
        counter:0

    }
    componentDidMount() {
         this.props.fetchProducts(); 
    }

    render() {
        //  console.log(this.props.signupNewUser)

        const home = () => {
            return (
            <Home 
            products={this.props.products.products}
            isLoading={this.props.products.isLoading}
            errMess={this.props.products.errMess}
            />
            )
        }

        const products = ({match}) => {
            
                   
                
            return (
                <>
                  
                    <Products
                        getMatchParams = {this.props.getMatchParams(match.params.userId)}
                        products={this.props.products.products}
                        isLoading={this.props.products.isLoading}
                        errMess={this.props.products.errMess}
                        auth = {this.props.auth}
                        postProduct= {this.props.postProduct}
                        deleteItem ={this.props.deleteItem}
                    />
                </>


            )
        }

        return (
            <div>
            <Header loginUser={this.props.loginUser}
            auth={this.props.auth} 
            logOut={this.props.logoutUser}
            signupNewUser={this.props.signupNewUser}
            />
            <Switch>
                <Route path='/home' component={home} />
                <Route exact path='/products' component={products} />
                <Route exact path='/products/:userId'  component={products} />
                <Route exact path='/AboutUs'  component={AboutUs} />
                <Redirect to="/home" />
            </Switch>
            <Footer/>
            </div>
            
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));