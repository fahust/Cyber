
import React from 'react';
import ScanVirus from './service/ScanInformation';
import CreateInformation from './service/CreateInformation';
import DebugInformation from './service/DebugVirusIntoInformation';
import PiracyInformation from './service/PiracyInformation';
import GetInformation from './GetInformation';



export default class GetInformations extends React.Component {
    constructor(props){
      super(props);

      this.state = {
        informations:[],
        maxInformations:0,
        filterOwner:1,//1 me // 2 all // 3 other
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
        /*Object.keys(data.data.informations).forEach(information => {
          this.state.informations.push(data.data.informations[information]);
        });*/
        //this.state.informations = data.data.informations;
        if(data.value.maxInformations !== 0){
          this.setState(prevState => ({
            informations : [...prevState.informations, data.value.informations],
            maxInformations : data.value.maxInformations,
          }));
        }
      });
    }

    handleChange = event => {
      var name = event.target.name;
      if(this.state[name] !== event.target.value){
        this.setState({
          [name] : event.target.value,
          maxInformations : 10,
          informations : [],
        })

        this.props.socket.emit('getInformations',{data:{
          maxInformations:this.state.maxInformations,
          filterOwner:this.state.filterOwner,
          filterType:this.state.filterType,
        }});
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
             //alert("you're at the bottom of the page");
        }
      };
      
      if(this.state.informations !== null){
        var informations = this.state.informations.map((information,index) => {
          return <div key={information.title} className="list-informations">
            <h1>{information.title}</h1> 
            <GetInformation information={this.state.information} user={this.props.user} socket={this.props.socket}/>
            <ScanVirus information={this.state.information} user={this.props.user} socket={this.props.socket}/>
            <DebugInformation information={this.state.information} user={this.props.user} socket={this.props.socket}/>
            <PiracyInformation information={this.state.information} user={this.props.user} socket={this.props.socket}/>
            <div>Vote : {information.vote} </div>
          </div>
        })
      }

      /*<select name="filterType" className="order-by-level" onChange={this.handleChange}>
        <option value="0">Commun</option>
        <option value="1">Rare</option>
        <option value="2">Very rare</option>
        <option value="3">Epic</option>
        <option value="4">Unique</option>
        <option value="4">Divine</option>
      </select>*/

      return (
        <div>

          <select name="filterOwner" className="order-by-owner" onChange={this.handleChange}>
            <option value="0">Owned by all</option>
            <option value="1">Owned by me</option>
            <option value="2">Owned by other</option>
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