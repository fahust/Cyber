function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  class Virus {
    constructor(data){
        this.users = data.users;
        this.blackMarket = data.blackMarket;
        this.modules = data.modules;
        this.maxJobs = data.maxJobs;
        this.maxStats = data.maxStats;
        this.maxVirus = 5
    }

    injectVirusIntoInformation(socket,data){
        if(this.users[data.user.username].data.informations[data.information.title]){
            if(this.users[data.user.username].data.informations[data.information.title].virus.type === 0){
                var type = randomIntFromInterval(1,maxVirus);
                var level = randomIntFromInterval(1,this.users[data.user.username].data.jobExp[data.type])
                this.users[data.user.username].data.informations[data.information.title].virus = {
                    type:type,
                    level:level,
                }
                return this.users[data.user.username].data.informations[data.information.title].virus;
            }
        }
        return false;
    }

    debugVirusIntoInformation(socket,data){
        if(this.users[data.cible.username]){//all players and me
            if(this.users[data.user.username].data.informations[data.information.title]){
                if(this.users[data.user.username].data.informations[data.information.title].virus.type !== 0){
                    if(this.users[data.user.username].data.jobExp[data.type] >= this.users[data.cible.username].data.informations[data.information.title].virus.level){
                        this.users[data.cible.username].data.informations[data.information.title].virus = {
                            type:0,
                            level:0,
                        }
                        return true;
                    }
                }
            }
        }
        return false;
    }
    

}

module.exports = Virus;