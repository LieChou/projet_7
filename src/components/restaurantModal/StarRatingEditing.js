import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class StarRatingEditing extends Component {
    constructor() {
        super();
        this.state = {
            rating: 1
        };
    }

    onStarClick(nextValue, prevValue, name) {
        console.log('nextValue: %s, prevValue: %s, name: %s,', nextValue, prevValue, name);
        this.setState({
            rating: nextValue
        })
        this.props.onStarUpdated(nextValue)
    }


    render() {

        const { rating } = this.state;

        return (
            <div>
                <StarRatingComponent
                    name="rating"
                    value={rating}
                    onStarClick={this.onStarClick.bind(this)}
                />
            </div>

        )

    }





}