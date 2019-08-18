import React from 'react';
import Gallery from '../gallery';
import style from '../style/Restaurant.module.css';

const Restaurant = ({info}) => {
    return (
        <div className={[style.item, style.box_shadow].join(' ')}>
            <h2>{info.name}</h2>
            <img src={Gallery[info.id]} alt={info.name} />
            <div className={style.item_info}>
                <p>{Array(1,2,3,4,5).map((star) => {
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
        </div>
    )
};

export default Restaurant;