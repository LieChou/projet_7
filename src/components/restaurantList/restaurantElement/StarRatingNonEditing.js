import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class StarRatingNonEditing extends Component {
    constructor() {
        super()

        this.state = {
            rating: 1,
            rating_half_star: 3.5,
        };

    }

    onStarClickHalfStar(nextValue, prevValue, name, e) {
        const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

        if (xPos <= 0.5) {
            nextValue -= 0.5;
        }

        console.log('name: %s, nextValue: %s, prevValue: %s', name, nextValue, prevValue);
        // console.log(e);
        this.setState({ rating_half_star: nextValue });
    }

    render() {
        return (
            <StarRatingComponent
                name="AverageRatings"
                editing={false}
                value={this.props.setAverageRatings(this.props.restaurant)}
                onStarClickHalfStar={this.onStarClickHalfStar}
            />
        )
    }
}