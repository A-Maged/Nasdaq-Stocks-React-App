import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import { Home } from 'components/pages/home';
import { Explore } from 'components/pages/explore';
import { StockDetails } from 'components/pages/stockDetails';

export function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/explore" component={Explore} />
        <Route exact path="/stock-details/:ticker" component={StockDetails} />
      </Switch>
    </Router>
  );
}
