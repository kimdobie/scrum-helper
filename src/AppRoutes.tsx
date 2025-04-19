import { ReactElement } from 'react';
import { Route, Routes } from 'react-router-dom';

import ROUTES from './AppRouteNames';

import Home from './pages/Home';
import Version from './pages/Version';

import FourOhFour from './pages/FourOhFour';
import StandUpPicker from './pages/StandUpPicker';
import IceBreaker from './pages/IceBreaker';

const AppRoutes = (): ReactElement => (
  <>
    <Routes>
      <Route path={ROUTES.HOME.route} element={<Home />} />
      <Route path={ROUTES.VERSION.route} element={<Version />} />
      <Route path={ROUTES.STANDUP.route} element={<StandUpPicker />} />
      <Route path={ROUTES.ICEBREAKER.route} element={<IceBreaker />} />
      <Route path='*' element={<FourOhFour />} />
    </Routes>
  </>
);

export default AppRoutes;
