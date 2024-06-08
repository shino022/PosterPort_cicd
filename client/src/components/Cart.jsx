// const Cart = () => {
//   return <div className="flex justify-center bg-gray-300 w-full h-[100vh]">
//     <div className="bg-yellow-300 w-[70%] min-w-[350px]">
//         fill
//     </div>
//   </div>;
// };

// export default Cart;


import React from 'react';
import posters from "../data/posters.js";
import { Link } from 'react-router-dom';
import { RxArrowTopRight } from "react-icons/rx";

const Cart = ({ counts }) => {
  // Create a list of posters that are actually in the cart
  const cartItems = posters.filter(poster => counts[poster.id] > 0);
  console.log(cartItems);

  return (
    <div className="flex justify-center w-full h-[100vh]">
      <div className="bg-amber-500 w-[70%] min-w-[350px] px-4 opacity-95">
        <h2 className='text-white text-center m-2 text-2xl'>YOUR CART</h2>
        <div>
          <Link to='/'>
            <button className='flex group justify-center items-center gap-1 text-xl text-amber-500 bg-indigo-500 p-2 rounded-md hover:bg-indigo-700'>HOME <RxArrowTopRight className='group-hover:rotate-45' /></button>
          </Link>
        </div>
        {cartItems.length > 0 ? (
          <ul className='text-white'>
            {cartItems.map(poster => (
              <div className='w-full bg-slate-500 p-2'>
                <li key={poster.id} className='flex items-center gap-5'>
                  <div>
                    <h3>{poster.title}</h3>
                    <img
                      src={poster.imageUrl}
                      alt={poster.title}
                      className="rounded-lg  border border-blue-500 border-opacity-50 h-[300px]"
                    />
                  </div>
                  <div>
                    <p>Quantity: {counts[poster.id]}</p>
                    <p>Price per item: ${poster.price}</p>
                    <p>Total: ${counts[poster.id] * poster.price}</p>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <div>
            <p className='text-white text-3xl mb-2'>Your cart is empty...</p>

          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
