import './App.css'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from "./Routes/Routes.jsx";

function App() {

  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  )
}

export default App
