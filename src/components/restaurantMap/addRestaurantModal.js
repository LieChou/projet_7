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

export default class AddRestaurantModal extends Component {
    constructor() {
        super();

        this.state = {
            modalIsOpen: true,
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
        this.props.onCloseClick();
    }

    onSubmit() {
        let newRestaurantName = document.getElementById('restaurantName').value;
        let newRestaurantAddress = document.getElementById('restaurantAdress').value;
        let newRestaurantLat = this.props.selectedPlaceLat;
        let newRestaurantLng = this.props.selectedPlaceLng;
        let newRestaurantRatings = this.state.value;
        let newRestaurantComment = document.getElementById('review').value;

        this.createNewArrayRestaurants(newRestaurantName, newRestaurantAddress, newRestaurantLat,
            newRestaurantLng, newRestaurantRatings, newRestaurantComment);

        this.closeModal();
    }

    createNewArrayRestaurants = (newRestaurantName, newRestaurantAddress, newRestaurantLat,
        newRestaurantLng, newRestaurantRatings, newRestaurantComment) => {
        this.props.restaurants.push({
            restaurantName: newRestaurantName,
            address: newRestaurantAddress,
            lat: newRestaurantLat,
            long: newRestaurantLng,
            ratings: [{
                stars: newRestaurantRatings,
                comment: newRestaurantComment
            }]
        })
        console.log(this.props.restaurants)
        let newArrayRestaurants = [];
        newArrayRestaurants = this.props.restaurants
        this.props.updateRestaurants(newArrayRestaurants);
    }

    onStarUpdated = (newValue) => {
        this.setState({
            value: newValue
        })
    }


    render() {
        return (
            <div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Modal"
                >
                    <h4 className="text-center">Ajouter un restaurant</h4><br />
                    <form >
                        <div >
                            <label className="form-groupe"><strong>Nom du restaurant</strong></label><br />
                            <input className="form-control" type="text" placeholder="Nom du restaurant" id="restaurantName"></input><br />
                        </div>
                        <div>
                            <label className="form-groupe"><strong>Adresse</strong></label><br />
                            <input className="form-control" type="text" placeholder="75 rue du Cloitre, 75003 Paris" id="restaurantAdress"></input><br />
                        </div><br />

                        <div className="text-center"><strong>Votre avis sur ce restaurant</strong></div>
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

