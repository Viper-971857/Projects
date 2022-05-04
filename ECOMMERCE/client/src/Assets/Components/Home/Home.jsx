import React,{Fragment, useEffect} from 'react';
import './Home.scss';
import Product from "./Product";
import MetaData from "../Layout/MetaData";
import {getProduct} from '../../Actions/ProductAction';
import {useSelector,useDispatch} from 'react-redux';
import Loader from '../Layout/Loader/Loader';

const product = {
    name:"Blue Shirt",
    images:[{url:"https://i.ibb.co/DRST11n/1.webp"}],
    price:"3000",
    id:"viper"
}


const Home = () => {

    const dispatch = useDispatch();
    const {loading,Products} = useSelector((state) => state.Products)

    useEffect(()=>{
        dispatch(getProduct())
    },[dispatch]);

  return (
    
    <Fragment>

            {loading ? <Loader/> : <Fragment>

<MetaData title="ECOMMERCE"/>

<div className="banner">

    <p>Welcome to Ecommerce</p>
    <h1>FIND AMAZING PRODUCTS BELOW</h1>

    <a href="#container">
        <button>Scroll</button>
    </a>

</div>

<h2 className="homeHeading">Featured Products</h2>

<div className="container" id="container">

   <Product product={product}/>
   <Product product={product}/>
   <Product product={product}/>
   <Product product={product}/>

   <Product product={product}/>
   <Product product={product}/>
   <Product product={product}/>
   <Product product={product}/>

   {/* {Products && Products.map(Products => (
       <Product Products={Products}/>
   ))} */}


</div>

</Fragment>
}

    </Fragment>

  )
}

export default Home