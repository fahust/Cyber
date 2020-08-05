function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  class Module {
    constructor(data){
        this.users = data.users;
        this.blackMarket = data.blackMarket;
        this.informations = data.informations;
        this.maxJobs = data.maxJobs;
        this.maxStats = data.maxStats;
    }

    createModule(socket,data){
        if(this.users[data.user.username]){
            var id = randomIntFromInterval(1,99999999999999);
            if(!this.users[data.user.username].data.modules[id]){
                var type = randomIntFromInterval(1,this.maxJobs+this.maxStats);
                
                var level = randomIntFromInterval(1,this.users[data.user.username].data.jobExp[data.type])
                if(type > this.maxJobs)
                    level = randomIntFromInterval(1,this.users[data.user.username].data.stats.tech);
                
                this.users[data.user.username].data.modules[id] = {
                    type : type,
                    level : level,
                    owner : data.user.username,
                    id : id,
                }
                return this.users[data.user.username].data.modules[id];
            }
        }
    } 

    getModule(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.cible.username].data.modules[data.id]){
                return this.users[data.cible.username].data.modules[data.id];
            }
        }
    }

    getModules(socket,data){
        if(this.users[data.cible.username]){
            return this.users[data.cible.username].data.modules;
        }
    }
    
    injectModuleIntoInformation(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].data.modules[data.id]){
                if(this.users[data.user.username].data.jobExp[data.type] >= data.module.level){
                    if(!this.users[data.user.username].data.informations[data.information.title].module){
                        this.users[data.user.username].data.informations[data.information.title].module = data.module;
                        delete this.users[data.user.username].data.modules[data.id]
                    }
                }
            }
        }
    } 

    extractModuleOutInformation(){//need read to extract and risk virus
        if(this.users[data.user.username]){
            if(this.users[data.user.username].data.informations[data.information.title].module){
                if(this.users[data.user.username].data.jobExp[data.type] >= data.module.level){
                    this.users[data.user.username].data.modules[this.users[data.user.username].data.informations[data.information.title].module.id] = data.module;
                    delete this.users[data.user.username].data.informations[data.information.title].module;
                }
            }
        }
    }

    useModule(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].data.modules[data.module.id]){
                //augmentation des stats
                if(this.users[data.user.username].data.modules[data.module.id].type > this.maxJobs){
                    if(this.users[data.user.username].data.modules[data.module.id].type === this.maxJobs+1)
                        this.users[data.user.username].data.stats.reputation = 1;
                    if(this.users[data.user.username].data.modules[data.module.id].type === this.maxJobs+2)
                        this.users[data.user.username].data.stats.tech = 1;
                    if(this.users[data.user.username].data.modules[data.module.id].type === this.maxJobs+3)
                        this.users[data.user.username].data.stats.firewall = 1;
                    if(this.users[data.user.username].data.modules[data.module.id].type === this.maxJobs+4)
                        this.users[data.user.username].data.stats.bandwidth = 1;
                    if(this.users[data.user.username].data.modules[data.module.id].type === this.maxJobs+5)
                        this.users[data.user.username].data.stats.cryptoMoney = 1;
                }else{
                    this.users[data.user.username].data.jobExp[this.users[data.user.username].data.modules[data.module.id].type] += this.users[data.user.username].data.modules[data.module.id].level/10
                }
                delete this.users[data.user.username].modules[data.module.id];
            }
        }
    } 

    deleteModuleIntoInformation(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].data.informations[data.information.title]){
                if(this.users[data.user.username].data.informations[data.information.title].module){
                    delete this.users[data.user.username].data.informations[data.information.title].module;
                }
            }
        }
    } 


}

module.exports = Module;