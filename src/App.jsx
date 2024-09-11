import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState();
  const [totalPages, setTotalPages] = useState(0);

  const fetchProducts = async() => {
    //for backend approach
    const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page*10-10}`);

    //for frontend approach
    // const response = await fetch(`https://dummyjson.com/products`);
    const data = await response.json();

    console.log(data);
    if(data && data.products) {
    setProducts(data.products);
    setTotalPages(data.total / pageSize);
    }
    console.log(products);
  }

  //  for frontend approach
  // useEffect(() => {
  //   fetchProducts();
  // }, [])

  //for backend approach
  useEffect(() => {
    fetchProducts();
  }, [page])

  const pageHandler = (value) => {
    setPage(value);
  }

  //Frontend approach

  // return (
  //   <>
  //     { 
  //       products?.length > 0 && <div className='grand-parent'>
  //         {products.slice(page*10 - pageSize, page*10).map((product) => {
  //           console.log(product);
  //           return (
  //             <div className='parent'>
  //               <img src={product.images[0]} alt={product.category}  key={product.id}/>
  //               <p>{product.title}</p>
  //             </div>
  //         )
  //         })}
  //       </div>
        
  //     }
  //     {products?.length > 0 && <div className='tabs'> 
  //       {page!=1 && <button onClick={() => pageHandler(page-1)}>Prev</button>}
  //       {Array.from({length : Math.ceil(products?.length/pageSize)}, (_, index) => (
  //         <button key={index+1} onClick={() => pageHandler(index+1)}>{index+1}</button>
  //       ))}
  //       {page !=(Math.ceil(products.length/pageSize)) && <button onClick={() => pageHandler(page+1)}>Next</button>}
  //     </div>}
  //   </>
  // )

  //Backend approach
  return (
    <>
      { 
        products?.length > 0 && <div className='grand-parent'>
          {products.map((product) => {
            console.log(product);
            return (
              <div className='parent'>
                <img src={product.images[0]} alt={product.category}  key={product.id}/>
                <p>{product.title}</p>
              </div>
          )
          })}
        </div>
        
      }
      {products?.length > 0 && <div className='tabs'> 
        {page!=1 && <button onClick={() => pageHandler(page-1)}>Prev</button>}
         {Array.from({length : totalPages}, (_, index) => (
           <button key={index+1} onClick={() => pageHandler(index+1)}>{index+1}</button>
         ))}
         {page !=totalPages && <button onClick={() => pageHandler(page+1)}>Next</button>}
       </div>}
    </>
  )
}

export default App
