import React, {Component} from 'react';
import Nav from './nav/nav';
import ListMake from './left/ListMake';
import Constructors from './constructors/constructors';
import GoogleLogin from 'react-google-login';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Profiles from "./materials/Profiles";
import Fill from "./materials/Fill";
import Download from "./constructors/Download";
import AddProfiles from "./add/Profiles";
import AddFill from "./add/Fill";
import EditProfiles from "./edit/Profiles";
import ViewProfiles from "./view/Profiles";
import {Procurement, ViewProcurement} from "./components";

class App extends Component {
    constructor(props) {
        super(props);
        this.items = props.items;
        this.state = {user: {}, checkLogin: true};
        this.responseGoogle = this.responseGoogle.bind(this)
    }

    responseGoogle(response) {
        if (response.profileObj)
            this.setState({user: response.profileObj, checkLogin: false})
    }

    styleLogin = {
        height: '100vh'
    };

    checkLogin() {
        if (!this.state.checkLogin || true) {
            return (
                <Router>
                    <div>
                        <Nav user={this.state.user}/>

                        <Route exact path="/" component={ListMake}/>
                        <Route exact path="/materials" component={Profiles}/>
                        <Route exact path="/constructors" component={Constructors}/>
                        <Route exact path="/procurement" component={Procurement}/>
                        <Route path="/materials/fill" component={Fill}/>
                        <Route path="/constructors/download/:id" component={Download}/>
                        <Route path="/add/profiles/" component={AddProfiles}/>
                        <Route path="/add/fill/" component={AddFill}/>
                        <Route path="/edit/profiles/:id" component={EditProfiles}/>
                        <Route path="/profiles/:id" component={ViewProfiles}/>
                        <Route path="/procurement/:id" component={ViewProcurement}/>
                    </div>
                </Router>
            )
        } else {
            return (
                <div className="container">
                    <div className="row" style={this.styleLogin}>
                        <div className="col"></div>
                        <div className="col align-self-center">
                            <GoogleLogin
                                className="btn btn-dark btn-block"
                                buttonText="Войти"
                                clientId="702458358632-1beu8hbcjb5re5o300t9kisb0l1r97uo.apps.googleusercontent.com"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                            />
                        </div>
                        <div className="col"></div>
                    </div>
                </div>)
        }
    }

    render() {
        return this.checkLogin();
    }
}

export default App;
