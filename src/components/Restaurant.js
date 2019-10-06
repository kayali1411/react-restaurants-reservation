import React, { useState, useEffect } from 'react';
import Gallery from '../gallery';
import style from '../style/Restaurant.module.css';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

const Restaurant = ({info}) => {
    const minDate = new Date();

    const [portalState, setPortalState] = useState(false);
    const [date, setDate]               = useState(minDate.setDate(minDate.getDate()+1));

    const handleChange = (date) => {
        setDate(date);
        toggleCalendar();
    };

    const toggleCalendar = () => {
        setPortalState(!portalState);
    };

    return (
        <div className={[style.item, style.box_shadow].join(' ')} onClick={toggleCalendar}>
            <h2>{info.name}</h2>
            <img src={Gallery[info.id]} alt={info.name} />
            <div className={style.item_info}>
                <p>{[1,2,3,4,5].map((star) => {
                    if(info.rating >= star) {
                        return (<span key={star} className={[style.star, style.star_checked].join(' ')}></span>)
                    } else {
                        return (<span key={star} className={style.star}></span>)
                    }
                })}</p>
                <p>
                    {Array(parseInt(info.price)).fill('$').map(() => (<span key={Math.random()} className={style.money}></span>))}
                </p>
            </div>
            <div>
                <p>Cuisines:<br/> {info.cuisines.join('-')}</p>
            </div>
            {
                portalState && (
                    <DatePicker
                        selected={date}
                        onChange={handleChange}
                        minDate={minDate}
                        onClickOutside={toggleCalendar}
                        withPortal
                        inline
                    />
                )
            }
        </div>
    )
};

export default Restaurant;