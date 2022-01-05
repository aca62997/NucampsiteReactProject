import React, { Component } from "react";
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, Modal, ModalHeader, ModalBody, FormGroup, Form, Label, Input } from "reactstrap";
import { Link } from "react-router-dom";
import { Control, LocalForm, Errors } from "react-redux-form";

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);

      this.state = {
          isModalOpen: false,
          rating: " ",
          author: " ",
          comment: " ",
          touched: {
              rating: false,
              author: false,
              comment: false
          }
    };

      this.toggleModal = this.toggleModal.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
    }

    handleSubmit(values) {
        console.log("Current state is " + JSON.stringify(values));
        alert("Current state is " + JSON.stringify(values));
    }
    
    render() {
        return (
            <div>
                <Button outline onClick={this.toggleModal}>
                    <i className="fa fa-pencil fa-lg" /> Submit Comments
                </Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={values => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label>Rating</Label>
                                <Control.select model=".rating" id="rating" name="rating" className="form-control">
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Control.select>
                            </div>
                            <div className="form-group">
                                <Label>Your Name</Label>
                                <Control.text model=".author" id="author" name="author" className="form-control" placeholder="Your Name" validators={{
                                    required,
                                    minLength: minLength(2),
                                    maxLength: maxLength(15),
                                }} />
                                    <Errors className="text-danger" model=".author" show="touched" component="div" messages={{
                                        required: "Required",
                                        minLength: "Must be at least 2 characters",
                                        maxLength: "Must be 15 characters or less"
                                    }} />
                                
                            </div>
                            <div className="form-group">
                                <Label>Comments</Label>
                                <Control.text model=".text" id="text" name="text" rows="6" className="form-control">
                                    
                                </Control.text>
                            </div>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
    


function RenderCampsite({ campsite }) { 
    return (
        <div className="col-md-5 m-1">
        <Card>
            <CardImg top src={campsite.image} alt={campsite.name} />
            <CardBody>
                <CardText>{campsite.description}</CardText>
            </CardBody>
        </Card>
        </div>
    );
};

function RenderComments({ comments }) {
    if (comments) {
        return (
          <React.Fragment>
            <div class="col-md-5 m-1">
              <h4>Comments</h4>
              {comments.map((comment) => (
                <div key={comment.id}>
                  {comment.text}
                  <br />
                  --{comment.author}, &nbsp;
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  }).format(new Date(Date.parse(comment.date)))}
                  <br />
                  <br />
                </div>
              ))}
            </div>
    
            <CommentForm />
          </React.Fragment>
        );
    }
    else {
        return (<div></div>);
    }
}


function CampsiteInfo(props) {
    if (props.campsite) {
        console.log("This is working");
        return (
          <div className="container">
            <div className="row">
              <div className="col">
                <Breadcrumb>
                  <BreadcrumbItem><Link to="/directory">Directory</Link></BreadcrumbItem>
                  <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                </Breadcrumb>
                <h2>{props.campsite.name}</h2>
                <hr />
              </div>
            </div>
            <div className="row">
              <RenderCampsite campsite={props.campsite} />
              <RenderComments comments={props.comments} />
            </div>
          </div>
        );
        
    }
    else {
        return(<div></div>);
    }
}

export default CampsiteInfo;
