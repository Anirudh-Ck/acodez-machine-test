import './App.css'
import AddUser from './components/AddUser'
import Layout from './components/Layout'
import UpdateUser from './components/UpdateUser'
import UserDetails from './components/UserDetails'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Router>
    <Layout>
      <Routes>
        <Route path="/" element={<UserDetails />} />
        <Route path='/add-user' element={<AddUser/>} />
        <Route path='/edit-user/:id' element={<UpdateUser/>} />
        <Route path='*' element={<UserDetails />} />
      </Routes>
    </Layout>
  </Router>
  );
}

export default App
