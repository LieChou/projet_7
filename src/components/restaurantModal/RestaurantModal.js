import React, { Component } from 'react';
import { StarRatingEditing } from '..';


export default class RestaurantModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedRestaurant: 0,
            //restaurantRatings: this.props.restaurant.ratings,
            //restaurants: this.props.restaurants,
            restaurant: this.props.restaurant
        }
    }

    setSelectedRestaurant = (r) => {
        this.setState({
            selectedRestaurant: r,
        })
    }


    render() {
        return (
            <div>
                <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#uniqueModal" aria-expanded="false" aria-controls="uniqueModal">Ajouter un avis</button>
                <div className="modal fade" id="uniqueModal" tabIndex="-1" role="dialog" aria-labelledby="uniqueModal">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addReview">Votre avis sur ce restaurant:</h5>
                                <button type="button btn-primary btn-small" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div id="rating">
                                    Note : <br />
                                    <StarRatingEditing
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Votre commentaire: </label>
                                    <textarea className="form-control" id="review" row="3"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button type="button" onClick={this.setSelectedRestaurant} className="btn btn-primary">Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>
                {console.log(this.state.restaurant)}
            </div>
        )
    }
}

