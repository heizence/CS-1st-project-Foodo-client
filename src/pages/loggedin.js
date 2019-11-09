import React from "react";
import {
  Route
  //BrowserRouter as Router
} from "react-router-dom";
import Main from "../components/Main";
import Menus from "./menus";
import Recipes from "./recipes";
import StockList from "../components/StockList";
import AddFood from "../components/AddFood";
import Chart from '../components/Chart';

const LoggedIn = ({
  data,
  fetchlogin,
  fetchSignUp,
  handleVid,
  mixmenu,
  gotempty,
  setmenu,
  searchItems,
  FoodOnChange,
  onTextChanged,
  renderSuggestions,
  enteredId,
  enteredPw,
  setnullmenu
}) => (
  <div>
    <Route
      path="/main"
      exact={true}
      render={props => (
        <Main
          {...props}
          fetchlogin={fetchlogin}
          fetchSignUp={fetchSignUp}
          enteredId={enteredId}
          enteredPw={enteredPw}
        />
      )}
    />
    {console.log("loginmenu", data.pickedind)}

    <Route
      path="/menus"
      exact={true}
      render={props => (
        <Menus
          {...props}
          pickedind={data.pickedind}
          mixmenu={mixmenu}
          setmenu={setmenu}
          menu={data.menu}
          
        />
      )}
    />

    <Route
      path="/lists"
      exact={true}
      render={props => (
        <Recipes
          {...props}
          menu={data.menu}
          pickedind={data.pickedind}
          video={data.currvideo}
          videos={data.videos}
          handleVid={handleVid}
        />
      )}
    />

    <div>
      <Route
        path="/StockList"
        exact={true}
        render={() => (
          <StockList
            user={data.user.id}
            gotempty={gotempty}
            setnullmenu={setnullmenu}
            cat={data.cat}
          />
        )}
      />
      <Route
        path="/"
        exact={true}
        render={() => (
          <StockList
            user={data.user.id}
            setnullmenu={setnullmenu}
            cat={data.cat}
          />
        )}
      />
    </div>
    <Route
      path="/AddFood"
      exact={true}
      render={() => (
        <AddFood
          text={data.text}
          searchItems={searchItems}
          FoodOnChange={FoodOnChange}
          onTextChanged={onTextChanged}
          renderSuggestions={renderSuggestions}
        />
      )}
    />
    <Route
    path="/Chart"
    exact={true}
    render={() => (
      <Chart/>
    )}
    />
  </div>
);

export default LoggedIn;
