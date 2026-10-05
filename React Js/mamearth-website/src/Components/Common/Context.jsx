import React, { createContext, useState } from 'react'
import { toast } from 'react-toastify';

var ContextApi = createContext();

export default function Context({ children }) {

    var cartItems = JSON.parse(localStorage.getItem('cartItems'))

    var [cartData, setCartData] = useState(cartItems ?? []);
    var [isLogin, setIsLogin] = useState('');

    const addToCart = (product) => {

        // var checkCart = cartData.filter((v) => {
        //     if(v.id == product.id){
        //         return v
        //     }
        // })

        var checkCart = cartData.filter((v) => v.id == product.id)

        if(checkCart.length == 0){
            var data = {
                id : product.id,
                name : product.name,
                image : product.image,
                price : product.price,
                description : product.description,
                quantity : 1,
                category_name : product.category_name
            }

            setCartData([data, ...cartData]);
            toast.success('Add to Cart.')

            localStorage.setItem('cartItems', JSON.stringify([data, ...cartData]))
        } else {
            var cartUpdate = cartData.map((v) => {
                if(v.id == product.id){
                    v.quantity++;
                    return v
                } else{
                    return v
                }
            })

            setCartData([...cartUpdate]);
            toast.success('Update Cart.')

            localStorage.setItem('cartItems', JSON.stringify([...cartUpdate]))
        }
    }

    const removeCart = (id) => {
        if(confirm('Are you sure you want to delete ?')){
            var finalCart = cartData.filter((v) => v.id != id)

            setCartData([...finalCart])
            localStorage.setItem('cartItems', JSON.stringify([...finalCart]))
            toast.success('Remove data from cart.')
        }
    }

    const updateCart = (id, type) => {
        if(type == 'minus'){
            var updateCart = cartData.map((v) => {
                if(v.id == id && v.quantity > 1){
                    v.quantity--;
                    toast.success('Quantity Update.')
                    return v
                } else {
                    return v
                }
            })

            setCartData([...updateCart]);
            localStorage.setItem('cartItems',JSON.stringify([...updateCart]))
            
        } else {
            var updateCart = cartData.map((v) => {
                if(v.id == id && v.quantity < 5){
                    v.quantity++;
                    toast.success('Quantity Update.')
                    return v
                } else {
                    return v
                }
            })

            setCartData([...updateCart]);
            localStorage.setItem('cartItems',JSON.stringify([...updateCart]))
        }
    }

    const data = { cartData, isLogin, addToCart, removeCart, updateCart }

    return (
        <>
            <ContextApi.Provider value={ data }>
                { children }
            </ContextApi.Provider>
        </>
    )
}

export { ContextApi }
