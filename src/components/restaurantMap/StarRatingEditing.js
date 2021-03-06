import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class StarRatingEditing extends Component {
    constructor() {
        super();
        this.state = {
            rating: 1,
            rating_half_star: 1,
        };
    }

    onStarClickHalfStar(nextValue, prevValue, name, e) {
        const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

        if (xPos <= 0.5) {
            nextValue -= 0.5;
        }

        console.log(' nextValue: %s, prevValue: %s, name: %s', nextValue, prevValue, name);
        this.setState({ rating_half_star: nextValue });

        this.props.onStarUpdated(nextValue)
    }


    render() {

        const { rating_half_star } = this.state;

        return (
            <div>
                <StarRatingComponent
                    name="StarRatingEditable"
                    starColor="#ffb400"
                    value={rating_half_star}
                    onStarClick={this.onStarClickHalfStar.bind(this)}
                    emptyStarColor="#ffb400"
                    renderStarIcon={(index, value) =>
                        <span>
                            <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                        </span>
                    }
                    renderStarIconHalf={() =>
                        <span>
                            <span style={{ position: 'absolute' }}><i className="far fa-star" /></span>
                            <span><i className="fas fa-star-half" /></span>
                        </span>
                    }
                />
            </div>

        )

    }


}