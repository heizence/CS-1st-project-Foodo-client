<Router>
  <Route
    path="/main"
    exact={true}
    render={props => <Main {...props} fetchlogin={this.fetchlogin} />}
  />
  {this.state.videos !== null && (
    <Route
      path="/menus"
      render={props => (
        <Menus
          {...props}
          menu={this.state.menu}
          pic={this.state.currvideo.snippet.thumbnails.high.url}
          video={this.state.currvideo}
          videos={this.state.videos}
          handleVid={this.handleVid}
        />
      )}
    />
  )}
  {this.state.videos !== null && (
    <Route
      path="/lists"
      render={props => (
        <Recipes
          {...props}
          video={this.state.currvideo}
          videos={this.state.videos}
          handleVid={this.handleVid}
        />
      )}
    />
  )}
  <Route
    path="/users/signup"
    render={props => <SignUps {...props} handlesignup={this.handlesignup} />}
  />

  <div>
    <Route
      path="/StockList"
      exact={true}
      render={() => (
        <StockList
          removef={this.removef}
          popone={this.popone}
          popquater={this.popquater}
          user={this.state.user.id}
          FoodData={this.state.FoodList}
        />
      )}
    />
  </div>

  <Route
    path="/AddFood"
    exact={true}
    render={() => (
      <AddFood
        text={this.state.text}
        searchItems={this.items}
        FoodOnChange={this.FoodOnChange}
        onTextChanged={this.onTextChanged}
        renderSuggestions={this.renderSuggestions}
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
</Router>;
