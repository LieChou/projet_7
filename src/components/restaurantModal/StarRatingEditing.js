import React, { Component } from 'react';
import StarRatingComponent from 'react-star-rating-component';

export default class StarRatingEditing extends Component {
    constructor() {
        super();
        this.state = {
            rating: 1,
            rating_half_star: 3.5,
        };
    }

    /*onStarClick(nextValue, prevValue, name) {
        console.log('nextValue: %s, prevValue: %s, name: %s,', nextValue, prevValue, name);
        this.setState({
            rating: nextValue
        })
        this.props.onStarUpdated(nextValue)
    }*/

    onStarClickHalfStar(nextValue, prevValue, name, e) {
        const xPos = (e.pageX - e.currentTarget.getBoundingClientRect().left) / e.currentTarget.offsetWidth;

        if (xPos <= 0.5) {
            nextValue -= 0.5;
        }

        console.log(' nextValue: %s, prevValue: %s, name: %s', nextValue, prevValue, name);
        // console.log(e);
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
                    //emptyStarColor="#ffb400"
                    value={rating_half_star}
                    onStarClick={this.onStarClickHalfStar.bind(this)}
                /*renderStarIcon={(index, value) => {
                    return (
                        <span>
                            <i className={index <= value ? 'fas fa-star' : 'far fa-star'} />
                        </span>
                    );
                }}
                renderStarIconHalf={() => {
                    return (
                        <span>
                            <span style={{ position: 'absolute' }}><i className="far fa-star" /></span>
                            <span><i className="fas fa-star-half" /></span>
                        </span>
                    );
                }}*/
                />
            </div>

        )

    }


}