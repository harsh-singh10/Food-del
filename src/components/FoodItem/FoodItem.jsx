import React, { useContext, useState } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';


const FoodItem = ({ image, name, price, desc , id }) => {

    const [itemCount, setItemCount] = useState(0);
    // const {cartItems,addToCart,removeFromCart,url,currency} = useContext(StoreContext);

    return (
        <div className='food-item'>
            <div className='food-item-img-container'>
                <img className='food-item-image' src={image} alt="" />
               {!itemCount
                ? <img className='add' onClick={()=>setItemCount(prev => prev+1)}  src={assets.add_icon_white} alt="" srcset="" />
                : <div className="food-item-counter">
                     
                        <img src={assets.add_icon_green} onClick={()=>setItemCount(prev => prev +1)} alt="" />
                        <p>{itemCount}</p>
                        <img src={assets.remove_icon_red} onClick={()=> setItemCount(prev => prev-1)} alt="" />
                       
                     </div>
               }
            </div>
            <div className="food-item-info">
                <div className="food-item-name-rating">
                    <p>{name}</p> <img src={assets.rating_starts} alt="" />
                </div>
                <p className="food-item-desc">{desc}</p>
                <p className="food-item-price">${price}</p>
            </div>
        </div>
    )
}

export default FoodItem
