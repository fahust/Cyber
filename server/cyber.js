
var fs = require('fs');

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  Information = require('./Information.js');
  Module = require('./Module.js');
  Job = require('./Job.js');
  User = require('./User.js');
  Virus = require('./Virus.js');
  BlackMarket = require('./BlackMarket.js');
  
  class Cyber {
    constructor(){
        this.data = {
            users : {},
            blackMarket : {},
            modules : {},
            maxJobs : 15,
            maxStats : 5,
        }
        
        this.classInformation = new Information(this.data);
        this.classModule = new Module(this.data);
        this.classUser = new User(this.data);
        this.classVirus = new Virus(this.data);
        this.classBlackMarket = new BlackMarket(this.data);
        this.classJob = new Job(this.data,this.classInformation,this.classModule,this.classUser,this.classVirus,this.classBlackMarket);
    }

    clearSocket(value){
        var socket = Object.assign({},value.socket);
        value.socket = {};
        return socket;
    }

    reloadSocket(value,saveSocket){
        value.socket = saveSocket
    }

    saveGame(){
        var users = {};
        for (const [key, value] of Object.entries(this.data.users)) {
          var saveSocket = this.clearSocket(value);
          users[key] = Object.assign({},value)
          this.reloadSocket(value,saveSocket);
        }
  
        try {
          let data = JSON.stringify(users);
          fs.writeFile('users.json', data, (err) => {
              if (err) throw err;
              //delete users;
          });
        } catch (err) {
            console.error(err);
        }
        try {
          let data = JSON.stringify(this.data.blackMarket);
          fs.writeFile('blackMarket.json', data, (err) => {
              if (err) throw err;
          });
        } catch (err) {
            console.error(err);
        }
      }
  
      loadGame(){
        fs.readFile('users.json', (err, data) => {
          if (err) throw err;
          var dataNow = JSON.parse(data);
          this.users = dataNow;
        });
        fs.readFile('blackMarket.json', (err, data) => {
          if (err) throw err;
          var dataNow = JSON.parse(data);
          this.blackMarket = dataNow;
        });
      }

}

module.exports = Cyber;

