import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';


export default class RestaurantModal extends Component {
    render() {
        return (
            <div>
                <button className="btn btn-primary" type="button" data-toggle="modal" data-target="#addReview" aria-expanded="false" aria-controls="addReview">Ajouter un avis</button>
                <div className="modal fade" id="addReview" tabIndex="-1" role="dialog" aria-labelledby="addReview">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="addReview">Votre avis {this.props.restaurant.restaurantName}:</h5>
                                {console.log(this.props.restaurant.restaurantName)}
                                <button type="button btn-primary btn-small" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div>
                                    Note : <br />
                                    <StarRatingComponent
                                        name="addRating"
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Votre commentaire: </label>
                                    <textarea className="form-control" id="review" row="3"></textarea>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Fermer</button>
                                <button type="button" className="btn btn-primary">Ajouter</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

