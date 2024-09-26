/**
 * Un hook debe tener siempre "use" al inicio del nombre de la funcion
 * El nombre del archivo no es obligatorio llevar "use", pero convencionalmente se recomienda hacerlo
 * Un hook es una función de JS, puede declararse con "funcion" o como "arrow function"
 * siempre debe exportarse
 * Al crear hooks, hay que tener cuidado con no hacer instancias duplicadas de objetos
 */

import { useEffect, useState, useMemo } from "react";
import { db } from "../data/db";
import { Guitar, GuitarCart } from "../types/types";

export const useCart = () => {

    /**
   * leer si hay elementos en el localstorage
   * @returns 
   */
    const initialCart = () : GuitarCart[] => {
        const localStorageCart = localStorage.getItem('cart') // retorna un valor o null
        return localStorageCart ? JSON.parse(localStorageCart) : [] // inicio del state cart
    }

    // states
    const [data] = useState(db) // lo iniciamos asi, por ser una bd local
    const [cart, setCart] = useState(initialCart)

    const MAX_GUITARS = 5
    const MIN_GUITARS = 1

    // almacenar en localstorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart))
    }, [cart])

    /**
     * Agregar un elemento al carrito
     * @param {*objGuitar Objeto de la guitarra clickeada} objGuitar 
     */
    function addToCart(objGuitar : Guitar) {

        // validar si existe la guitarra en el carrito
        const guitarExist = cart.findIndex(guitar => guitar.id === objGuitar.id) // sacar el indice del obj en el array

        if (guitarExist >= 0) { // existe en el carrito

            // validar el maximo de la guitarra
            if (cart[guitarExist].quantity === MAX_GUITARS) return

            // actualizar el contador sin mutar el state
            const updateCart = [...cart] // primero una copia del state
            updateCart[guitarExist].quantity++ // sumar uno a la guitarra clickeada
            setCart(updateCart) // setear el nuevo state

        } else {
            const newGuitar : GuitarCart = {...objGuitar, quantity: 1}
            setCart([...cart, newGuitar])
        }
    }

    /**
     * Eliminar un elemento del carrito
     * @param {*id ID del carrito} id 
     */
    function removeFromCart(id : Guitar['id']) {
        setCart(prevCart => cart.filter(guitar => guitar.id !== id)) // setear el nuevo state
    }

    /**
     * Agregar guitarras del carrito
     * @param {*id ID del carrito} id 
     */
    function increaseQuantity(id : Guitar['id']) {

        // actualizar el contador sin mutar el state
        const updateCart = cart.map(guitar => {

            if (guitar.id === id && guitar.quantity < MAX_GUITARS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity + 1
                }
            }

            return guitar
        })

        setCart(updateCart) // setear el nuevo state
    }

    /**
     * Eliminar guitarras del carrito
     * @param {*id ID del carrito} id 
     */
    function decreaseQuantity(id : Guitar['id']) {
        // actualizar el contador sin mutar el state
        const updateCart = cart.map(guitar => {

            if (guitar.id === id && guitar.quantity > MIN_GUITARS) {
                return {
                    ...guitar,
                    quantity: guitar.quantity - 1
                }
            }

            return guitar
        })

        setCart(updateCart) // setear el nuevo state
    }

    /**
     * Limpiar el carrito
     */
    function clearCart() {
        setCart([])
    }

    // states derivados
    // verificar si el carrito está vacio
    // useMemo reenderiza unicamente lo indicado, de acuerdo al array de dependencias
    const cartIsEmpty = useMemo(() => cart.length === 0, [cart])

    // sumar el total a pagar con el array method reduce
    // al ser un state derivado, el precio total cambia tambien al usar el boton de + o -
    const cartTotal = useMemo(() => cart.reduce( (total, item) => total + (item.quantity * item.price), 0), [cart])

    return {
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartIsEmpty,
        cartTotal
    }
}