import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./Routes/Routes.jsx";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
