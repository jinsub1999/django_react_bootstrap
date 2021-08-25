import React from "react";
import axios from "axios";
import {useState} from "react";
import Navbar from "./NavBar";
import {Route} from "react-router-dom";
import ProductDetail from "./products/ProductDetail";
import ProductPage from "./products/ProductPage";
import LoginForm from "./userComponent/LoginForm";
import {useEffect} from "react";
import {Cookies} from "react-cookie";
import SignupForm from "./userComponent/SignupForm";
import {webDataType} from "./types/types";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;

function App() {
  const [webData, setWebData] = useState<webDataType>({username: "", token: ""});
  useEffect(() => {
    const getUserInfo = async () => {
      const usr_name = await axios.get("http://localhost:8000/common/get_user/").then((res) => res.data);
      setWebData((webData) => ({
        ...webData,
        username: usr_name
      }));
    };
    getUserInfo();
  }, []);
  useEffect(() => {
    async function getToken() {
      try {
        const res = await axios({method: "GET", url: "http://localhost:8000/common/get_csrf/"}).then(() => {
          const c = new Cookies();
          setWebData((webData) => ({
            ...webData,
            token: c.get("csrftoken")
          }));
        });
      } catch (e) {
        console.error(e);
      }
    }
    getToken();
  }, []);
  return (<div className="App">
    <Navbar data={webData}/>

    <Route exact={true} path="/">
      <div className="p-3">
        <ul className="list-group">
          <li className="list-group-item">
            Welcome! Tap "products" on Navbar to enter your product into our store.
          </li>
        </ul>
      </div>
    </Route>
    <Route path="/products" exact={true}>
      <ProductPage data={webData}/>
    </Route>
    <Route path="/products/:id">
      <ProductDetail/>
    </Route>

    <Route path="/login">
      <LoginForm data={webData}/>
    </Route>
    <Route path="/signup">
      <SignupForm token={webData.token}/>
    </Route>
    <Route path="/info">
      <div className="p-3">
        <ul className="list-group">
          <li className="list-group-item">
            Visit
            <a className="link-dark m-1" href="https://github.com/jinsub1999">
              my github page!
            </a>
          </li>
        </ul>
      </div>
    </Route>
  </div>);
}

export default App;
