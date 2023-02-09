import { useEffect } from 'react';
import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import AllProducts from './components/AllProducts';
import UserList from './components/subComponents/UserList';
import ShipmentTree from './components/ShipmentTree';
import PageNotFound from './Utility/ErrorPage';

function App() {

  useEffect(() => {

  }, [])
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/all-products" component={AllProducts} />
          <ProtectedRoute exact path="/shipment-progress" component={ShipmentTree} />
          <ProtectedRoute exact path="/user-list" component={UserList} />
          <Route path="*" component={PageNotFound} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
