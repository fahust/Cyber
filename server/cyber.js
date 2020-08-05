function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  Information = require('./Information.js');
  Module = require('./Module.js');
  Job = require('./Job.js');
  User = require('./User.js');
  Virus = require('./Virus.js');
  blackMarket = require('./BlackMarket.js');
  
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

    saveGame(){
        var listUser = {};
        for (const [key, value] of Object.entries(this.listUser)) {
          var save = this.clearOneUserForEmit(value);
          listUser[key] = Object.assign({},value)
          this.reloadOneUserData(value,save);
        }
  
        try {
          let data = JSON.stringify(listUser);
          fs.writeFile('listUser.json', data, (err) => {
              if (err) throw err;
          });
        } catch (err) {
            console.error(err);
        }
        try {
          let data = JSON.stringify(this.listCardImg);
          fs.writeFile('listCardImg.json', data, (err) => {
              if (err) throw err;
          });
        } catch (err) {
            console.error(err);
        }
        try {
          let data = JSON.stringify(this.listCard);
          fs.writeFile('listCard.json', data, (err) => {
              if (err) throw err;
              console.log('Data written to file');
          });
        } catch (err) {
            console.error(err);
        }
      }
  
      loadGame(){
        /*fs.readFile('listUser.json', (err, data) => {
          if (err) throw err;
          var dataNow = JSON.parse(data);
          this.listUser = dataNow;
        });
        fs.readFile('listCardImg.json', (err, data) => {
          if (err) throw err;
          var dataNow = JSON.parse(data);
          this.listCardImg = dataNow;
        });
        fs.readFile('listCard.json', (err, data) => {
          if (err) throw err;
          var dataNow = JSON.parse(data);
          this.listCard = dataNow;
        });*/
      }

}

module.exports = Cyber;

