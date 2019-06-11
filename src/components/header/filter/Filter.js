import React from 'react';

const Filter = (props) => {

    return (
        <div className="d-flex flex-row ml-2">
            <form onSubmit={props.onSubmit}>
                <label>
                    <select inputvalue={props.inputvalue} onChange={props.handleChange}>
                        <option value="5">5 étoiles et plus</option>
                        <option value="4">4 étoiles et plus</option>
                        <option value="3">3 étoiles et plus</option>
                        <option value="2">2 étoiles et plus</option>
                        <option value="1">1 étoile et plus</option>
                    </select>
                </label>
                <input className="ml-2" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Filter;


