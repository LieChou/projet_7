import React, { Component } from 'react';
import Modal from 'react-modal';
import { StarRatingEditing } from '..';
import axios from 'axios';

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
            value: 1,
            address: 'Vous avez cliqué sur'
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
        let newRestaurantAddress = document.getElementById('restaurantAddress').value;

        console.log(newRestaurantAddress)
        this.props.handleGeocodingOnModal(newRestaurantAddress, this.createNewArrayRestaurants)
    }

    createNewArrayRestaurants = (newRestaurantAddress, newRestaurantLat, newRestaurantLng) => {
        let newRestaurantName = document.getElementById('restaurantName').value;
        let newRestaurantComment = document.getElementById('review').value;
        let newRestaurantRatings = this.state.value;

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
        let newArrayRestaurants = [];
        newArrayRestaurants = this.props.restaurants
        this.props.updateRestaurants(newArrayRestaurants);
        this.closeModal();
    }

    onStarUpdated = (newValue) => {
        this.setState({
            value: newValue
        })
    }

    componentDidMount() {
        this.reverseGeocoding();
    }

    //use lat,lng to return restaurant formatted address
    reverseGeocoding = () => {
        let lat = this.props.selectedPlaceLat;
        let lng = this.props.selectedPlaceLng;

        axios.get(`${'https://cors-anywhere.herokuapp.com/'}https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyActrrpA2NipKHnS8ksfgblNKuMcJiB_lE`)
            .then(response => response.data.results[0].formatted_address)
            .then(address => this.setState({ address }))
            .then(console.log(this.state.address))
            .catch(err => {
                console.log(err);
            });
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
                            <input className="form-control" type="text" placeholder={this.state.address} id="restaurantAddress"></input><br />
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

