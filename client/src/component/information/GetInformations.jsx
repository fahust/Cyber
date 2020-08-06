
import React from 'react';
import ScanVirus from './service/ScanInformation';
import CreateInformation from './service/CreateInformation';



export default class GetInformations extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        user:this.props.user,
        informations:[],
        maxInformations:10,
        page: 1,
        filterOwner:1,//1 me // 2 all //
        filterType:1,//1 white // 2 green //3 blue
      }
    }

    componentDidMount(){
      this.props.socket.emit('getInformations', {data : {
        maxInformations:this.state.maxInformations,
        filterOwner:this.state.filterOwner,
        filterType:this.state.filterType,
      }})

      this.props.socket.on("getInformations", data => {
        Object.keys(data.data.informations).forEach(information => {
          this.state.informations.push(data.data.informations[information]);
        });
        //this.state.informations = data.data.informations;
        this.state.maxInformations = data.data.maxInformations;
        this.setState({});
      });
    }

    handleChange = event => {
      var name = event.target.name;
      if(this.state[name] !== event.target.value){
        this.state[name] = event.target.value;
        this.state.maxInformations = 10;
        this.state.informations = [];

        this.props.socket.emit('getInformations',{data:{
          maxInformations:this.state.maxInformations,
          filterOwner:this.state.filterOwner,
          filterType:this.state.filterType,
        }});

        this.setState({})
      }
    }

    render() {
      
      window.onscroll = () => {
        if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
            this.props.socket.emit('getInformations', {data : {
              maxInformations:this.state.maxInformations,
              filterOwner:this.state.filterOwner,
              filterType:this.state.filterType,
            }})
             alert("you're at the bottom of the page");
        }
      };
      
      if(this.state.informations !== null){
        var informations = this.state.informations.map((information,index) => {
          return <div key={index} className="list-card">
            {information.title}  {information.content.substring(0,30)+'...'} {information.vote} 
            <ScanVirus information={this.state.information} user={this.props.user} socket={this.props.socket}/>
            <button>Remove Virus</button>
            <button>Piracy Information</button>
            </div>
        })
      }

      return (
        <div>

          <select name="filterOwner" className="order-by-owner" onChange={this.handleChange}>
            <option value="0">Owned by all</option>
            <option value="1">Owned by me</option>
            <option value="2">Owned by other</option>
          </select>

          <select name="filterType" className="order-by-level" onChange={this.handleChange}>
            <option value="0">Commun</option>
            <option value="1">Rare</option>
            <option value="2">Very rare</option>
            <option value="3">Epic</option>
            <option value="4">Unique</option>
            <option value="4">Divine</option>
          </select>

          <CreateInformation user={this.props.user} socket={this.props.socket}/>
          
          {informations}
          <div>test</div>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
          <div>test</div>
        </div>
      )
    }


}