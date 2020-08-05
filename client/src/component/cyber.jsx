
import React from 'react';
import openSocket from 'socket.io-client';
import Connect from './user/userConnect';
import Register from './user/userCreate';
import Menu from './menu/menu';
import Notif from './menu/notif';
const socket = openSocket('http://localhost:12001');


export default class Cyber extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            user:null,
            page:'connect',
        }
    }

    componentDidMount(){
        socket.on("createOk", data => {
            this.state.user = data.data.user;
            this.state.page = 'menu';
            this.setState({});
          });
    }

    changePage = page => {
        if(this.state.party && page === 'menu'){
          //socket.emit("disconnectParty",{})
        }
        this.setState({page:page})
      }

      render() {
        var menu = <Menu socket={socket} user={this.state.user} party={this.state.party} changePage={this.changePage} page={this.state.page}/>;
        if(this.state.user === null && this.state.page === 'connect'){
          var connect = <div><Connect socket={socket} user={this.state.user} changePage={this.changePage}/></div>
        }else if(this.state.user === null && this.state.page ==='register'){
          var register = <div><Register socket={socket} user={this.state.user} changePage={this.changePage}/></div>;
        }/*else if(this.state.user !== null && this.state.page ==='make card'){
          var makeCard = <div><MakeCard socket={socket} user={this.state.user} changePage={this.changePage}/></div>;
        }*/
        
  
        return (
          <div>
            {menu}
            {connect}
            {register}
          </div>
        )
      }


}