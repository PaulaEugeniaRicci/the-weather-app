import './App.css';
import "./assets/css/Styles.css";
import NavBar from "./components/NavBar";
import CardListContainer from "./components/CardListContainer";
import Footer from "./components/Footer";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
    <div className='min-h-screen evening'>
      <BrowserRouter>
        <NavBar/>
        <Routes>
          <Route path='/' element={<CardListContainer/>} />
          <Route path='/:key' element={<CardListContainer/>} />
        </Routes>
      </BrowserRouter>
    </div>
    <Footer/>
    </>
  );
}

export default App;
