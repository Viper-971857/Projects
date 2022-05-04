// import {BrowserRouter,Route} from 'react-router-dom';
// import {useEffect} from 'react';
// import {useDispatch,useSelector} from 'react-redux';
// import {getUser,loadUser} from '../actions/user'
// import Header from '../Components/Header/Header';
// import Home from '../Components/Home/Home';
// import About from '../Components/About/About';
// import Footer from '../Components/Footer/Footer';
// import Projects from '../Components/Projects/Projects';
// import Contact from '../Components/Contact/Contact';
// import Login from '../Components/Login/Login';
// import AdminPanel from '../Components/Admin/AdminPanel';
// import Timeline from '../Components/Admin/Timeline';
// import Youtube from '../Components/Admin/Youtube';
// import Project from '../Components/Admin/Project';



// function Router (){

//     const dispatch = useDispatch();

//     const { isAuthenticated } = useSelector((state) => state.login);
//     const { loading, user } = useSelector((state) => state.user);

//     useEffect(() => {
//         dispatch(getUser());
//         dispatch(loadUser());
//     }, [dispatch]);


//     return(

//         <BrowserRouter>

//             {
//                 loading ? (<div>Loading</div>) : (

//                 <>
//                     <Header/>

//                     <Route exact path="/" component={Home}
//                      youtubes={user.youtube}
//                   timelines={user.timeline}
//                   skills={user.skills}  />
//                     <Route exact path="/about" component={About} about={user.about} />
//                     <Route exact path="/projects" component={Projects} projects={user.projects} />
//                     <Route exact path="/contact" component={Contact} />
//                     <Route exact path="/account" component={ isAuthenticated ? <AdminPanel/> : <Login/> } />
//                     <Route exact path="/admin/timeline" component={ isAuthenticated ? <Timeline/> : <Login/> } />
//                     <Route exact path="/admin/youtube" component={ isAuthenticated ? <Youtube/> : <Login/> } />
//                     <Route exact path="/admin/project" component={ isAuthenticated ? <Project/> : <Login/> } />
        
//                     <Footer/>
//                 </>
        
//                 )
//             }
           
//         </BrowserRouter>

//     )

// }


// export default Router;


import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../Components/Home/Home";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import About from "../Components/About/About";
import Projects from "../Components/Projects/Projects";
import Contact from "../Components/Contact/Contact";
import Login from "../Components/Login/Login";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser, loadUser } from "../actions/user";
import AdminPanel from "../Components/Admin/AdminPanel";
import Timeline from "../Components/Admin/Timeline";
import Youtube from "../Components/Admin/Youtube";
import Project from "../Components/Admin/Project";
import Loader from "../Components/Loader/Loader";

function App () {
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.login);
  const { loading, user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Router>
      {loading ? (
        <Loader/>
      ) : (
        <>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  youtubes={user.youtube}
                  timelines={user.timeline}
                />
              }
            />
            <Route path="/about" element={<About/>} />
            <Route
              path="/projects"
              element={<Projects projects={user.projects} />}
            />
            <Route path="/contact" element={<Contact />} />
            <Route
              path="/account"
              element={isAuthenticated ? <AdminPanel /> : <Login />}
            />
            <Route
              path="/admin/timeline"
              element={isAuthenticated ? <Timeline /> : <Login />}
            />
            <Route
              path="/admin/youtube"
              element={isAuthenticated ? <Youtube /> : <Login />}
            />

            <Route
              path="/admin/project"
              element={isAuthenticated ? <Project /> : <Login />}
            />
          </Routes>

          <Footer />
        </>
      )}
    </Router>
  );
}

export default App;