
import { Route, Switch } from "react-router-dom";
import { ROUTES } from './utils/index';
import Home from './containers/Home';
import Products from './containers/Products';
import Basket from './containers/Basket';
import ProductDetail from './containers/ProductDetail';
import { BrowserRouter } from 'react-router-dom';
import { AppProvider } from './providers/appProvider';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path={ROUTES.HOME.MAIN} component={Home} />
          <Route exact path={ROUTES.PRODUCTS.MAIN} component={Products} />
          <Route exact path={ROUTES.PRODUCTS.DETAILED} component={ProductDetail} />
          <Route exact path={ROUTES.BASKET.MAIN} component={Basket} />
        </Switch>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
