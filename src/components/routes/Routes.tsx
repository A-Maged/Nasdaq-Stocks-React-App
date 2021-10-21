import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';

import { Home } from 'components/pages/home';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  );
}
