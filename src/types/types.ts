/**
 * Los types o interfaces sirven para describir los tipos de datos
 * Hay que definir un archivo de types, para colocar los types que se usan en varios lados
 * 
 * La sintaxis de una interface es:
 * interface Guitar {}
 */
export type Guitar = {
    id: number
    name: string
    image: string
    description: string
    price: number
}

// hereda las propiedades de Guitar
export type GuitarCart = Guitar & {
    quantity: number
}
// export interface GuitarCart extends Guitar {}