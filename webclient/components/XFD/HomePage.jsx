import React from 'react';
import ReactDOM from 'react-dom';
const {hashHistory} = require('react-router');
import {Button} from 'semantic-ui-react';
class HomePage extends React.Component {
constructor () {
super();
this.state = {

        };
}
notify() {
// console.log("inside sendsms");
$.ajax({
  url: '/xfd/notify',
  type:'GET',
success: function(data)
{
        console.log(data);
}.bind(this),
error: function(err)
{
console.log('error occurred on AJAX');
}.bind(this)
});
}

// sendtoslack() {
//   console.log('slack');
//   $.ajax({
//     url: '/xfd/sendtoslack',
//     type:'GET',
//   success: function(data)
//   {
//           console.log(data);
//   }.bind(this),
//   error: function(err)
//   {
//   console.log('error occurred on AJAX');
//   }.bind(this)
//   });
// }

// makecall(){
// console.log("inside makecall");
// $.ajax({
//   url: '/xfd/makecall',
//   type:'GET',
// success: function(data)
// {
//         console.log(data);
// }.bind(this),
// error: function(err)
// {
// console.log('error occurred on AJAX');
// }.bind(this)
// });
// }
//
// sendmail() {
// console.log("inside sendmail");
// $.ajax({
//   url: '/xfd/sendmail',
//   type:'GET',
// success: function(data)
// {
//         console.log(data);
// }.bind(this),
// error: function(err)
// {
// console.log('error occurred on AJAX');
// }.bind(this)
// });
// }

render () {
return (
<div>

<Button onClick={this.notify.bind(this)}>click me</Button>
{/* <Button onClick={this.sendtoslack.bind(this)}>slack</Button> */}
{/* <Button onClick={this.makecall.bind(this)}>make call</Button> */}
{/* <Button onClick={this.sendmail.bind(this)}>send mail</Button> */}
</div>
);
}
}

module.exports = HomePage;
