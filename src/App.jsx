import AddNote from './pages/AddNote'
import {Routes,Route,BrowserRouter} from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import EditNote from './components/EditNote';

const  App=()=> {
  return (
    <>
    <BrowserRouter className="main-content">
    <Sidebar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path='/add/' element={<AddNote/>}/>
      <Route path='/edit/:id' element={<EditNote/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}
export default App
