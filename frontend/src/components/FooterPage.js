import React from 'react'
import { Card, Button, Col, Row, Container} from 'react-bootstrap';



const FooterPage = () => {
  return (
    <Card className="text-left">
    <Card.Body>
    <Container className="text-left">
                    <Row>
                        <Col md="6">
                            <h5 className="text-uppercase mb-4 mt-3 font-weight-bold">Footer Content</h5>
                            <p>Here you can use rows and columns here to organize your footer content. Lorem ipsum dolor sit
                            amet, consectetur adipisicing elit.</p>
                        </Col>
                        <hr className="clearfix w-100 d-md-none" />
                        <Col md="2">
                            <h5> <i class="far fa-credit-card"></i> Safe Payment</h5>
                            <p><small>
                            Pay with the world's most popular and secure payment methods.
                            </small>
                            </p>
                        </Col>
                        <hr className="clearfix w-100 d-md-none" />
                        <Col md="2">
                            <h5><i class="fas fa-truck"></i> Delivery Policy</h5>
                            <p><small>
                            Our Buyer Protection covers your purchase from click to delivery.
                            </small>
                            </p>
                        </Col>
                        <hr className="clearfix w-100 d-md-none" />
                        <Col md="2">
                            <h5><i class="fas fa-sync"></i> Easy Change</h5>
                            <p><small>
                            Try it out for 3 days and if there are problems then can be returned within those 3 days.
                            </small>
                            </p>
                        </Col>
                    </Row>
                </Container>
    </Card.Body>
    <Card.Footer className="text-center" padding ="10px">
    <div className="text-center">
                    <ul className="list-unstyled list-inline">
                        <li className="list-inline-item"><a className="btn-floating btn-lg btn-fb mx-1"><i className="fa fa-facebook"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-lg btn-tw mx-1"><i className="fa fa-twitter"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-lg btn-gplus mx-1"><i className="fa fa-google-plus"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-lg btn-li mx-1"><i className="fa fa-linkedin"> </i></a></li>
                        <li className="list-inline-item"><a className="btn-floating btn-lg btn-dribbble mx-1"><i className="fa fa-dribbble"> </i></a></li>
                    </ul>
                </div>
                &copy; {new Date().getFullYear()} Copyright:<a>Proshop</a>
    </Card.Footer>
  </Card>
  )
}

export default FooterPage
