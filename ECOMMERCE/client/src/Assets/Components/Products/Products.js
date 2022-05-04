import React, { Fragment } from 'react';
import './Products.scss';
import {useSelector} from 'react-redux';
import Loader from '../Layout/Loader/Loader';
import Product from '../Home/Product';
import Pagination from 'react-js-pagination'


const product = {
  name:"Blue Shirt",
  images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
  price:"3000",
  id:"viper"
}

const Products = () => {


  const {loading} = useSelector((state) => state.Products)
    


  return (
    <Fragment>

        {loading ? <Loader/> : <Fragment>

              <h2 className='productsHeading'>Products</h2>

              <div className='products'>

              <Product product={product}/>

                  <Product product={product}/>
                  <Product product={product}/>
                  <Product product={product}/>

                  <Product product={product}/>
                  <Product product={product}/>
                  <Product product={product}/>
                  <Product product={product}/>
                  
              </div>

              <div className='paginationBox'>
                  <Pagination
                  nextPageText="NEXT"
                  prevPageText="Previous"
                  firstPageText="1st"
                  lastPageText ="Last"
                  itemClass="page-item"
                  linkClass="page-link"
                  activeClass="pageItemActive"
                  activeLinkClass="pageLinkActive"
                  />
              </div>

          </Fragment>}

    </Fragment>
  )
}

export default Products