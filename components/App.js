// AppClient.js
import React, { Component } from 'react'

// Utilities
import AppStore from '../stores/AppStore'
import AppDispatcher from '../dispatcher/AppDispatcher'

// Components
import Nav from './Nav'
import Footer from './Footer'
import Loading from './Loading'

// Pages
import Blog from '../pages/Blog'
import Work from '../pages/Work'
import Default from '../pages/Default'
import NoMatch from '../pages/NoMatch'

export default class App extends Component {
  
  _onChange() {
    this.setState(AppStore)
  }

  constructor(){
    super()
  }

  // Add change listeners to stores
  componentDidMount() {
    AppStore.addChangeListener(this._onChange.bind(this))
  }

  // Remove change listeners from stores
  componentWillUnmount() {
    AppStore.removeChangeListener(this._onChange.bind(this))
  }

  getStoreBrowser(){

    AppDispatcher.dispatch({
      action: 'get-store-browser'
    });

  }

  render(){
    
    // Server first
    let data = this.props.route.data
    
    if(!data){

      // Browser next
      data = AppStore.data

    }

    // Show loading for browser
    if(!data.ready){

      this.getStoreBrowser()

      let style = {
        marginTop: 120
      }
      return (
        <div className="container text-center" style={ style }>
          <Loading />
        </div>
      );
    }

    let globals = data.globals;
    let pages = data.pages;
    let Routes = React.cloneElement(this.props.children, { data: data });

    return (
      <div>
        <Nav pages={ pages }/>
        { Routes }
        <Footer globals={ globals }/>
      </div>
    );
  }
}