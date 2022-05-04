import {BrowserRouter,Route} from 'react-router-dom';
import Header from '../Components/Layout/Header/Header';
import Footer from '../Components/Layout/Footer/Footer';
import Home from '../Components/Home/Home';
import Products from '../Components/Products/Products';
import Search from '../Components/Products/Search';
import Contact from '../Components/Layout/Contact/Contact';
import About from '../Components/Layout/About/About';
import Login from '../Components/User/Login';



function Router (){

    return(

        <BrowserRouter>

            <Header/>

            <Route exact path="/" component={Home} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/search" component={Search} />
            <Route exact path="/contact" component={Contact} />
            <Route exact path="/about" component={About} />
            <Route exact path="/login" component={Login} />

            <Footer/>

        </BrowserRouter>

    )

}


export default Router;