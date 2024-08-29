import './App.css'
import { Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import IndexPage from './pages/IndexPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import axios from 'axios'
import RecipePage from './pages/RecipePage'
import { UserContextProvider } from './UserContext'
import StoragePage from './pages/StoragePage'
import RecipeFormPage from './pages/RecipeFormPage'


axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path='/' element={<IndexPage/>} />
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/recipe' element={<RecipePage />}></Route>
          <Route path='/storage' element={<StoragePage />}></Route>
          <Route path='/recipe/new' element={<RecipeFormPage />}></Route>
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App
