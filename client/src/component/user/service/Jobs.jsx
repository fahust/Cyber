
import React from 'react';


export default class GetInformation extends React.Component {
    constructor(props){
      super(props);

      this.state = {
          user:this.props.user,
          information:null,
      }
    }

    componentDidMount(){
    }

      render() {

        
        namesJobs = [ 'Reporter',
          "Data's hacker" ,
          "Crypto-money's hacker",
          "Module's developper",
          "Data's scanning",
          "Module injector",
          "Module extractor",
          "Data's debbug",
          "Virus injector",
          "User's debug",
          "Member thief",
          "Member seller",
          "Member buyer",
          "Delete illegals logs",
          "Detect and report illegals logs",]
        var jobs = this.state.user.data.jobExp.map((exp,index) => {
          return <div key={information.title} className="list-card"></div>
        });
  
        return (
          <div>
            {information}
          </div>
        )
      }


}