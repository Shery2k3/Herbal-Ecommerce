import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import './Branch.css';

const Branch = (props) => {
    return (
        <div className="branch-card">
            <h2>{props.name}</h2>
            <p className='location' >{props.location}</p>
            <p className='phone'>
                <FontAwesomeIcon icon={faPhone} /> {props.phoneNumber}
            </p>
            <a href={props.mapLink} target="_blank" rel="noopener noreferrer">
                Get Direction
            </a>
        </div>
    );
};

export default Branch;
