import React from 'react';

const Filter = (props) => {

    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <label>
                    <select inputvalue={props.inputvalue} onChange={props.handleChange} className="btn btn-primary ml-4">
                        <option value="5">5 étoiles et plus</option>
                        <option value="4">4 étoiles et plus</option>
                        <option value="3">3 étoiles et plus</option>
                        <option value="2">2 étoiles et plus</option>
                        <option value="1">1 étoile et plus</option>
                    </select>
                </label>
                <input className="btn  btn-primary ml-2 mt-2 mb-2" type="submit" value="Submit" />
            </form>
        </div>
    );
}

export default Filter;


