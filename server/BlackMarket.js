function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  class BlackMarket {
    constructor(data){
        this.users = data.users;
        this.blackMarket = data.blackMarket;
        this.modules = data.modules;
        this.maxJobs = data.maxJobs;
        this.maxStats = data.maxStats;
    }
    
}

module.exports = BlackMarket;