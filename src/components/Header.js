import React, { Component } from 'react';
import {  Collapse, NavbarToggler, ModalBody, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { Navbar, NavbarBrand, NavItem, Nav, Modal, ModalHeader } from 'reactstrap'
import { NavLink } from 'react-router-dom';

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isNavOpen: false,
            isModalOpen: false,
            
            signUpSelected: false
        }
    }
    toggleNav = () => {
        this.setState({ isNavOpen: !this.state.isNavOpen })
    }
    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }
    handleLogin = (event) => {
        this.toggleModal();
        this.props.loginUser({ username: this.username.value, password: this.password.value })
        event.preventDefault();
    }
    handleLogOut = (event) => {
        this.props.logOut()
        event.preventDefault();
    }
    signUp=()=>{
        this.setState({signUpSelected:!this.state.signUpSelected})
        this.toggleModal()

    }
    handleSignUp=(event)=>{
        this.signUp()
        console.log(this.props)
        this.props.signupNewUser({username:this.username.value,password:this.password.value,firstname:this.firstname.value,lastname:this.lastname.value})
        event.preventDefault();
    }
    render() {
        // this.setState({username:this.props.auth.username})
        return (
            <>

                <Navbar dark expand="md">
                    <div className='container'>
                        <NavbarBrand className="mr-auto" href='#' >
                            <img src="logo.jpeg" height="30" width="41"
                                alt=" Nikt" />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.toggleNav} />

                        <Collapse isOpen={this.state.isNavOpen} navbar>
                            <Nav navbar>
                                <NavItem >
                                    <NavLink className="nav-link" to="/home">
                                        <span className="fa fa-home fa-lg"> Home</span>
                                    </NavLink>
                                </NavItem>
                                {   this.props.auth.loggedUser ?
                                <NavItem>
                                <NavLink className="nav-link" to={`/products/${this.props.auth.loggedUser}`}>
                                    <span className="fa fa-list fa-lg"> Products</span>
                                </NavLink>
                                </NavItem>:
                                <NavItem>
                                <NavLink className="nav-link" to='/products'>
                                    <span className="fa fa-list fa-lg"> Products</span>
                                </NavLink>
                                </NavItem>

                                }
                               
                                <NavItem>
                                    <NavLink className="nav-link" to="/aboutus">
                                        <span className="fa fa-info fa-lg"> About Us</span>
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-link" to="/contactus">
                                        <span className="fa fa-address-card  fa-lg"> Contact Us</span>
                                    </NavLink>
                                </NavItem>
                            </Nav>
                            <Nav className='ml-auto'>

                                <NavItem>
                                    {!this.props.auth.isAuthenticated ?
                                        <div>
                                            <Button outline onClick={this.toggleModal} className='navbar-button'>


                                                {this.props.auth.isLoading ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : <span className="fa fa-sign">Login</span>
                                                }
                                            </Button>
                                            <Button outline onClick={this.signUp} className='navbar-button ml-auto'>
                                                <span className="fa fa-sign">SignUp</span>
                                                
                                            </Button>
                                        </div>

                                        :
                                        <div>
                                            <div className="navbar-text mr-3">{this.props.auth.user.username}</div>
                                            <Button outline onClick={this.handleLogOut} className='navbar-button'>


                                                {this.props.auth.isLoading ?
                                                    <span className="fa fa-spinner fa-pulse fa-fw"></span>
                                                    : <span className="fa fa-sign  ">Logout</span>
                                                }
                                            </Button>  </div>



                                    }
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </div>
                </Navbar>



                {/* <Jumbotron>
                <div className="container ">
                    <div className="row row-header">
                        <div className="col-12 col-sm-6">
                            <h1>Nikt</h1>
                            <p>A platform that allows you to advertize your products to the world</p>
                        </div>
                    </div>
                </div>
            </Jumbotron> */}
            <div>
            {!this.state.signUpSelected ?
            <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    
                    <ModalHeader toggle={this.toggleModal}>Login</ModalHeader>
                    <ModalBody className="ModalBody">
                        <Form onSubmit={this.handleLogin}>
                            <FormGroup>
                                <Label htmlFor="username"> Username</Label>
                                <Input type="text" id="username" name="username"
                                    placeholder="username" innerRef={(input) => this.username = input} />
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="password"> Password</Label>
                                <Input type="password" id="password" name="password" placeholder='password'
                                    innerRef={(ps) => this.password = ps} />
                            </FormGroup>
        
                            <FormGroup check>
                                <Label check>
                                    <Input type="checkbox" id="remember" name="remember" />
                            Remember me
                            </Label>
                            </FormGroup>
                            <FormGroup>
                                <Button className="bg-primary" type="submit" value="submit">Sign in</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody> 
                </Modal>:
                 <Modal isOpen={this.state.isModalOpen} toggle={this.signUp}>
                    
                 <ModalHeader toggle={this.signUp}>Register Here</ModalHeader>
                 <ModalBody className="ModalBody">
                     <Form onSubmit={this.handleSignUp}>
                         <FormGroup>
                             <Label htmlFor="username"> Username</Label>
                             <Input type="text" id="username" name="username"
                                 placeholder="username" innerRef={(input) => this.username = input} />
                         </FormGroup>
                         <FormGroup>
                             <Label htmlFor="password"> Password</Label>
                             <Input type="password" id="password" name="password" placeholder='password'
                                 innerRef={(ps) => this.password = ps} />
                         </FormGroup>
                         <FormGroup>
                             <Label htmlFor="Firstname"> First Name</Label>
                             <Input type="text" id="firstname" name="firstname" placeholder='First name'
                                 innerRef={(fname) => this.firstname = fname} />
                         </FormGroup>
                         <FormGroup>
                             <Label htmlFor="Lastname"> Last Name</Label>
                             <Input type="text" id="Lastname" name="Lastname" placeholder='Last name'
                                 innerRef={(Lastname) => this.lastname = Lastname} />
                         </FormGroup>
     
                         
                         <FormGroup>
                             <Button className="bg-primary" type="submit" value="submit">Sign up</Button>
                         </FormGroup>
                     </Form>
                 </ModalBody> 
             </Modal>
    }
            </div>
            </>
        );
    }
}
export default Header;