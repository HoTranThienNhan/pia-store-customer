import React, { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { isJsonString } from './utils';
import jwt_decode from "jwt-decode";
import * as UserService from './services/UserService';
import { useDispatch } from 'react-redux';
import { updateUser } from './redux/slices/userSlice';
import axios from 'axios';

export function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    let { storageData, decoded } = handleDecoded();
    if (decoded?.id) {
      handleGetUserDetails(decoded?.id, storageData);
    }
  }, []);

  const handleDecoded = () => {
    let storageData = localStorage.getItem('accessToken');
    let decoded = {}
    if (storageData && isJsonString(storageData)) {
      // storageData contains accessToken when accessToken exists
      storageData = JSON.parse(storageData);
      // decoded contains elements (id, isAdmin) of access token payload
      decoded = jwt_decode(storageData);
    }
    return { decoded, storageData }
  }

  // provide new accessToken if current accessToken is expired
  UserService.axiosJWT.interceptors.request.use(async (config) => {
    const { decoded } = handleDecoded();
    const currentTime = new Date();
    // if expired time of decoded is smaller than current time (milisecond)
    if (decoded?.exp < currentTime.getTime()/1000) {
      const data = await UserService.refreshToken();
      
      config.headers['token'] = `Bearer ${data?.accessToken}`
    }
    return config;
  }, function (error) {
    return Promise.reject(error);
  });


  const handleGetUserDetails = async (id, accessToken) => {
    // res contains user information
    const res = await UserService.getUserDetails(id, accessToken);
    dispatch(updateUser({ ...res?.data, accessToken: accessToken }));
  }


  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page
            const Layout = route.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                } />
            )
          })}
        </Routes>
      </Router>
    </div>
  )
}

export default App