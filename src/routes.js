import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { App } from './App';
import { DesignListForm } from './components/designList/DesignListForm.jsx';
import { MedicalDetail } from './components/SearchMedical/MedicalDetail.jsx';
import page404 from './components/page404';

export const AppRoutes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={DesignListForm} />
      <Route path="/medical/:curp" component={MedicalDetail} />
      <Route component={page404} />
    </Switch>
  </App>
);
