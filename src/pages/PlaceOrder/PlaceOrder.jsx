
import "./PlaceOrder.css"
import React, { useContext, useEffect, useState } from 'react'

import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";


const PlaceOrder = () => {


    const { getTotalCartAmount,token,url,food_list,cartItems, } = useContext(StoreContext);

    const [data, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        street: "",
        city: "",
        state: "",
        zipcode: "",
        country: "",
        phone: ""
    })
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name
        const value = event.target.value
        setData(data => ({ ...data, [name]: value }))
    }

    const deliveryFee = ()=>{
        if(getTotalCartAmount() == 0){
            return 0;
        }
        else if(getTotalCartAmount() < 150){
            return 5;
        }
        else{
            return 0;
        }
    }

    useEffect(() => {
     
        if (getTotalCartAmount() === 0) {
            navigate('/')
        }
    }, )

    return (
        <div className='place-order'>
               <div className="place-order-left">
                <p className='title'>Delivery Information</p>
                <div className="multi-field">
                    <input type="text" name='firstName' onChange={onChangeHandler} value={data.firstName} placeholder='First name' required />
                    <input type="text" name='lastName' onChange={onChangeHandler} value={data.lastName} placeholder='Last name' required />
                </div>
                <input type="email" name='email' onChange={onChangeHandler} value={data.email} placeholder='Email address' required />
                <input type="text" name='street' onChange={onChangeHandler} value={data.street} placeholder='Street' required />
                <div className="multi-field">
                    <input type="text" name='city' onChange={onChangeHandler} value={data.city} placeholder='City' required />
                    <input type="text" name='state' onChange={onChangeHandler} value={data.state} placeholder='State' required />
                </div>
                <div className="multi-field">
                    <input type="text" name='zipcode' onChange={onChangeHandler} value={data.zipcode} placeholder='Zip code' required />
                    <input type="text" name='country' onChange={onChangeHandler} value={data.country} placeholder='Country' required />
                </div>
                <input type="text" name='phone' onChange={onChangeHandler} value={data.phone} placeholder='Phone' required />
            </div>
            <div className="place-order-right">
            <div className="cart-total">
          <h2>Cart Totals</h2>
          <div>
            <div className="cart-total-details"><p>Subtotal</p><p>${getTotalCartAmount()}</p></div>
            <hr />
            <div className="cart-total-details"><p>Delivery Fee</p><p>${deliveryFee()}</p></div>
            <hr />
            <div className="cart-total-details"><b>Total</b><b>${getTotalCartAmount()===0?0:getTotalCartAmount()+deliveryFee()}</b></div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO Payment</button>
        </div>
            

            </div>
        </div>
    )
}

export default PlaceOrder
