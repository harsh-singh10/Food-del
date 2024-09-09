import "./PlaceOrder.css";
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const PlaceOrder = () => {
    const { getTotalCartAmount, token, url, food_list, cartItems,setCartItems } = useContext(StoreContext);

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
    });
    const navigate = useNavigate();

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    const deliveryFee = () => {
        if (getTotalCartAmount() === 0) return 0;
        return getTotalCartAmount() < 150 ? 5 : 0;
    };

    const PayNow = () => {
        alert("We are facing some glitch on online payment use cash on delivery ")
    }

    const placeOrder = async (event) => {
        event.preventDefault();

        let orderItems = [];
        food_list.forEach((item) => {
            if (cartItems[item._id] > 0) {
                let itemInfo = { ...item, quantity: cartItems[item._id] };
                orderItems.push(itemInfo);
            }
        });

        let orderData = {
            address: data,
            items: orderItems,
            amount: getTotalCartAmount() + deliveryFee(),
        };

        try {
            let response = await axios.post(url + "api/order/place", orderData, {
                headers: { token }
            });

            if (response.data.success) {
                alert("Order placed successfully!");
                 setCartItems({})
                navigate('/myorders');
                console.log("every thing is good");
                
            } else {
                alert("Error placing order");
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("There was an error placing the order.");
        }
    };

    useEffect(() => {
        if (getTotalCartAmount() === 0) {
            navigate('/');
        }
    }, [getTotalCartAmount, navigate]); // Add dependencies to prevent re-running on every render

    return (
        <form onSubmit={placeOrder} className='place-order'>
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
                        <div className="cart-total-details"><b>Total</b><b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount() + deliveryFee()}</b></div>
                    </div>
                    <button type='submit'>Cash On Delivery</button> 
                    <button type='button' onClick={PayNow}  >Pay Now</button> 
                </div>
            </div>
        </form>
    );
};

export default PlaceOrder;
