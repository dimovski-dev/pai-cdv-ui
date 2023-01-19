import { Fragment } from 'react';
import {createBrowserRouter} from 'react-router-dom'
import {
  Route,
  Routes
} from "react-router-dom";
import { AddUser } from '../../pages/AddUser';
import { EditUser } from '../../pages/EditUser';
import { Login } from '../../pages/Login';

import { Main } from '../../pages/Main';

export const AppRouter = () => {

  return (
      <Fragment>
          {
              <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path='/login' element={<Login/>} />
                  <Route path='/add' element={<AddUser/>} />
                  <Route path='/edit' element={<EditUser/>} />
              </Routes>
          }
      </Fragment>
  )
}