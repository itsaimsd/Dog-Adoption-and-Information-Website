import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import Login from './Pages/Login/Login.jsx';
import Signup from './Pages/Signup/Signup.jsx';
import Home from './components/Home/Home.jsx';
import Layout from './Layout.jsx';
import List from './components/List/List.jsx';
import ListDetail from './components/List/ListDetail.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Layout />}>  
        <Route index element={<Home />}/> 
        <Route path="/search/:searchTerm" element={<Home />} />
        <Route path="/lists" element={<List />} />
        <Route path="/list/:listName" element={<ListDetail isEditMode={false} />} />
        <Route path="/edit/:listName" element={<ListDetail isEditMode={true} />} />
        {/* <Route path="/search/:category" element={<Home />} />    */}
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
