import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { useState, useEffect } from "react"
import { db } from "./data/db"

function App() {
  const initialCart=()=>{
    const localStorageCart=localStorage.getItem("cart")
    return localStorageCart? JSON.parse(localStorageCart):[]
  }
  //hooks
  const [data]=useState(db);
  const [cart,setCart]=useState(initialCart)
  const MIN_ITEM=1
  const MAX_ITEM=5
  

  useEffect(()=>{
      localStorage.setItem('cart',JSON.stringify(cart))
  },[cart])

  function addToCart(item){
    const itemsExists= cart.findIndex((guitar)=>guitar.id===item.id)
    if(itemsExists>=0){//existe en el carrito
        if(cart[itemsExists].quantity>=MAX_ITEM) return
        console.log("ya existe en el caarrito")
        const updateCart=[...cart]
        updateCart[itemsExists].quantity++
        setCart(updateCart)
    }else{
    console.log("No existe..Agregando..")
    item.quantity=1;
    setCart([...cart,item])
  }
  }
  function removeFromCart(id){
    setCart(prevCart=>prevCart.filter(guitar=>guitar.id!==id))
  }

//incrementar carrito
  function increaseQuantity(id){

    const updateCart=cart.map(item=>{
      if(item.id===id && item.quantity<MAX_ITEM){
        return{
          ...item,
          quantity:item.quantity+1
        }
      }
      return item
    })
    setCart(updateCart)

  }

//Decrementar carrito
  function decreaseQuantity(id){
    const updateCart=cart.map(item=>{
      if(item.id===id && item.quantity>MIN_ITEM){
        return{
          ...item,
          quantity:item.quantity-1
        }
      }
      return item
    })
    setCart(updateCart)
  }
  function clearCart(){
    setCart([])
  }
  return (
    <>
    
    <Header
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      clearCart={clearCart}
    />
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">

          {data.map((guitar)=>(
    
            <Guitar 
             key={guitar.id }
             guitar={guitar}
             setCart={setCart}
             addToCart={addToCart}

            />
          ))}

        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>

     
    </>
  )
}

export default App
