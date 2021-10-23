import React, { Component } from 'react';
import {
    Card, CardImg, CardBody, CardTitle, CardText, CardImgOverlay,
    Button, Modal, ModalHeader, ModalBody, FormGroup, Label, Input, Form
} from 'reactstrap'
import Loading from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const RenderProducts = ({ item, auth, deleteItem }) => {
    // if( item.length >1)
    // {
    return (
        item.map((item) => {

            return (
                <div key={item._id} className='col-md-4 col-sm-12'>
                    <div className='product-photo my-15'>
                        <Card>
                            <CardImg width='100%' src={baseUrl + item.image} alt={item.label} />
                            {auth.isAuthenticated ?
                                <CardImgOverlay>

                                    {auth.loggedUser === item.postedBy._id ?
                                        <Button color='danger' outline onClick={() => deleteItem(item._id)}>
                                            <span className='fa fa-times'></span>

                                        </Button> : null
                                    }

                                </CardImgOverlay>
                                : null
                            }
                            <CardBody className='cardbody'>
                                <CardTitle><strong>Label:</strong> {item.label}</CardTitle>
                                <CardText><strong>Price:</strong> {item.price} <i>cedis</i></CardText>
                                <CardText><strong>Contact:</strong> {item.contact}</CardText>
                            </CardBody>
                        </Card>

                    </div>
                </div>
            )
        })
    )

    // }
    // else{
    //     return   (
    //         <div className='col-12 col-md-5'>
    //             <div  className="mt-5">
    //                 <Card>
    //                 <CardImg width='100%' src={baseUrl+item.image}  alt={item.label}/>
    //                 {auth.isAuthenticated ?
    //                 <CardImgOverlay>

    //                     {   auth.loggedUser===item.postedBy._id ?
    //                         <Button color='danger' outline onClick={()=>deleteItem(item._id)}>                     
    //                           <span className='fa fa-times'></span> 

    //                         </Button> :null
    //                         }

    //                 </CardImgOverlay>
    //                  :null
    //                     }
    //                 <CardBody>
    //                     <CardTitle><strong>Label:</strong> {item.label}</CardTitle>
    //                     <CardText><strong>Price:</strong> {item.price} <i>cedis</i></CardText>
    //                     <CardText><strong>Contact:</strong> {item.contact}</CardText>
    //                 </CardBody>
    //                 </Card>

    //             </div>
    //             </div>
    //             )
    // }

}


class Products extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isModalOpen: false,
            selectedFile: null
        }
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
        //
    }
    fileSelectedHandler = (evt) => {
        this.setState({ selectedFile: this.imageFile.files[0] })
    }
    handleAddProduct = (event) => {
        this.toggleModal();
        const fd = new FormData()
        fd.append('imageFile', this.state.selectedFile)
        fd.append('name', this.state.selectedFile.name)
        fd.append('label', this.lable.value)
        fd.append('price', this.price.value)
        fd.append('contact', this.contact.value)
        fd.append('description', this.description.value)
        this.props.postProduct(fd)
        event.preventDefault()
    }
    // handleItemDelete=()=>{

    // }
    render() {

        if (this.props.isLoading) {
            return (
                <div className='container'>
                    <div className='row'>
                        <Loading />
                    </div>
                </div>
            )
        }
        else if (this.props.errMess) {
            return (
                <div className='container'>
                    <div className='row'>
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else
            return (
                <>
                { this.props.auth.isAuthenticated  ?
                <div className='mybotron'>
                <div className='container'>
                    <div className='row align-items-center mt-0'>

                        <div className='col-6'>
                            <h4>buy here</h4>
                        </div>
                        <div className='ml-auto mt-1'>
                            <Button outline onClick={this.toggleModal} className='navbar-button'>
                                <span className="fa fa-plus"></span> Add</Button>
                        </div>
                    </div>
                </div>
            </div>:null
                }
                    

                    <div className='container'>

                        <div className='row'>
                            <RenderProducts item={this.props.products} auth={this.props.auth}
                                deleteItem={this.props.deleteItem}
                            />
                        </div>
                        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                            <ModalHeader toggle={this.toggleModal}><span className='fa fa-plus ml-auto' ></span> Add</ModalHeader>
                            <ModalBody className="ModalBody">
                                <Form onSubmit={this.handleAddProduct}>
                                    <FormGroup >
                                        <Label htmlFor="imageFile"> Upload item mage File</Label>
                                        <Input type="file" id="imageFile" name="imageFile" onChange={this.fileSelectedHandler}
                                            innerRef={(input) => this.imageFile = input} />
                                    </FormGroup>
                                    {/* <FormGroup>
                             <Label htmlFor="name"> Name</Label>
                             <Input type="text" id="name" name="name" placeholder='Name'
                                 innerRef={(ps) => this.name = ps} />
                         </FormGroup> */}
                                    <FormGroup>
                                        <Label htmlFor="lable"> Label</Label>
                                        <Input type="text" id="lable" name="lable" placeholder='Label'
                                            innerRef={(lable) => this.lable = lable} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="price"> Price</Label>
                                        <Input type="text" id="price" name="price" placeholder='price'
                                            innerRef={(price) => this.price = price} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="contact"> Tel/Phone</Label>
                                        <Input type="text" id="contact" name="contact" placeholder='contact'
                                            innerRef={(contact) => this.contact = contact} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Label htmlFor="description"> Description</Label>
                                        <Input type="textarea" id="description" name="description" placeholder='description'
                                            innerRef={(description) => this.description = description} />
                                    </FormGroup>
                                    <FormGroup>
                                        <Button className="bg-primary" type="submit" value="submit">Submit</Button>
                                    </FormGroup>
                                </Form>
                            </ModalBody>
                        </Modal>

                    </div>

                </>
            )
    }

}
export default Products;