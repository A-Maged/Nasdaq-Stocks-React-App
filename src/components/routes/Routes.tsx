import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { Home } from 'components/pages/home';
import { Explore } from 'components/pages/explore';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/explore" component={Explore} />
    </Switch>
  );
}
