import React from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody } from 'reactstrap';
import { Link } from 'react-router-dom';

function About(props) {

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>About Us</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>About Us</h3>
                    <hr />
                </div>                
            </div>
            <div className="row row-content">
                <div className="col-12 col-md-6">
                    <h2>Our Objective</h2>
                    <p> Nikt aims at giving you more power to digitally market your products to the world.</p>
                    <p> Nikt intends to become one of the world largest online market platform.</p>

                    <p>Nikt gives you the platform to upload images of your product with some few details
                        about the product and you are good to go. direct your <em> freinds </em>
                        and <em>customers </em>to your url on nikt to find your products.</p>
                </div>
                <div className="col-12 col-md-5">
                  
                </div>
                <div className="col-12">
                    <Card>
                        <CardBody className="bg-faded">
                            <blockquote className="blockquote">
                                <p className="mb-0">“As social media grows and matures, showing a return becomes critical.” </p>
                                <footer className="blockquote-footer"> Heidi Cohen,<br></br>
                                <cite title="Source Title">50 Inspirational Marketing Quotes,
                                https://blog.wishpond.com/post/70494294231/50-inspirational-marketing-quotes-2013</cite>
                                </footer>
                            </blockquote>
                        </CardBody>
                    </Card>
                </div>
            </div>
            
        </div>
    );
}

export default About;    