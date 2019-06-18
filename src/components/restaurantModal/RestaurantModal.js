import React, { Component } from 'react';
import Modal from 'react-modal';
import { StarRatingEditing } from '..';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        width: '500px',
        transform: 'translate(-50%, -50%)'
    }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#root')

export default class RestaurantModal extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: false,
            value: 1
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    onSubmit() {
        let newReview = document.getElementById('review').value;
        console.log(newReview);
        console.log(this.props.restaurant)
        this.closeModal()
        this.props.onCommentAdded(this.props.restaurant.restaurantName, newReview, this.state.value)
    }

    onStarUpdated = (newValue) => {
        this.setState({
            value: newValue
        })
    }


    render() {
        return (
            <div>
                <button className="btn btn-primary" type="button" onClick={this.openModal}>Ajouter un avis </button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Reusable Modal"
                >

                    <h5>Votre avis: </h5>

                    <form>
                        <div id="rating">
                            Note : <br />
                            <StarRatingEditing
                                onStarUpdated={this.onStarUpdated}
                            />
                        </div>
                        <div className="form-group">
                            <label>Votre commentaire: </label>
                            <textarea className="form-control" id="review" row="3"></textarea>
                        </div>
                    </form>
                    <button className="btn btn-primary " type="button" onClick={this.closeModal}>Fermer</button>
                    <button className="btn btn-primary float-right" type="button" onClick={this.onSubmit}>Ajouter</button>
                </Modal>
            </div>
        );
    }
}

