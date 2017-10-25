
const React = require('react');
const ReactDOM = require('react-dom');
const { hashHistory, Route, Router} = require('react-router');

const Homepage = require('./components/XFD/HomePage')

const MainComp = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar/>
                <br/>
                <br/>
                <br/>
                <br/>
                {this.props.children}
            </div>
        );
    }
});
ReactDOM.render(
    <Router history={hashHistory}>
      <Route path="/" component={Homepage}/>
</Router>, document.getElementById('app'));
