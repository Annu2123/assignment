import SlotForm from "./components/slotForm";
import './App.css'
import { BrowserRouter ,Routes,Route,Link } from 'react-router-dom'
import LoginPage from "./components/login";

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path="/" element={<LoginPage/>}/>
    <Route path="/slotbook" element={<SlotForm/>}/>
   </Routes>
   </BrowserRouter>
   </>
  );
}

export default App;
