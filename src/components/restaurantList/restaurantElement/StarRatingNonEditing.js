import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class StarRatingNonEditing extends Component {
    render() {
        return (
            <StarRatingComponent
                name="AverageRatings"
                emptyStarColor="#ffb400"
                editing={false}
                value={this.props.setAverageRatings(this.props.restaurant)}
                renderStarIcon={(index, value) =>
                    <span>
                        <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                    </span>
                }
                renderStarIconHalf={() =>
                    <span>
                        <span style={{position: 'absolute'}}><i className="far fa-star" /></span>
                        <span><i className="fas fa-star-half" /></span>
                    </span>
                }
            />
        )
    }
}