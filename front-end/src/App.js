import './App.css';
import Nav from './components/Nav';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Footer from './components/footer';
import Signup from './components/sign-up';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/login';
import AddProduct from './components/products';
import ProductsList from './components/productslist';
import UpdateProduct from './components/updateproduct';

function App() {
  return (  
    <div className="App">
      <BrowserRouter>
      <Nav/>
      <Routes>

        <Route element={<PrivateComponent />}>
        <Route path='/' element={<AddProduct/>} />
       <Route path='/Add' element={<ProductsList />} />
        <Route path='/update/:id' element={<UpdateProduct/>} />
        <Route path='/logout' element={<h1>Logout page</h1>} />
        <Route path='/profile' element={<h1>Profile  page</h1>} />
        </Route>
        
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;
