import React, { Component } from 'react';

export default class Filter extends Component {

    render() {
        return (
            <div className="d-flex flex-row ml-2">
                <form onSubmit={this.props.handleSubmit()}>
                    <label>
                        <select value={this.props.value} onChange={this.props.handleChange}>
                            <option value="5">5 étoiles et plus</option>
                            <option value="4">4 étoiles et plus</option>
                            <option value="3">3 étoiles et plus</option>
                            <option value="2">2 étoiles et plus</option>
                            <option value="1">1 étoile et plus</option>
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
            </div>
        );
    }

}
