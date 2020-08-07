function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  class Information {
    constructor(data){
        this.users = data.users;
        this.blackMarket = data.blackMarket;
        this.informations = data.informations;
        this.maxJobs = data.maxJobs;
        this.maxStats = data.maxStats;
    }

    scanInformation(socket,data){
        if(this.users[data.user.username].data.informations[data.information.title]){
            if(this.users[data.user.username].data.informations[data.information.title].virus.type !== 0){
                return true;
            }
            return false;
        }
    }

    addInformation(socket,data){
        if(this.users[data.user.username]){
            if(!this.users[data.user.username].data.informations[data.information.title] && !this.informations[data.information.title]){
                this.users[data.user.username].data.informations[data.information.title] = data.information;
                this.informations[data.information.title] = data.information;
                /*{
                    data.report : {};
                    data.title : '';
                    content
                    data.virus : {
                        type:0,
                        level:0,
                    }
                }*/
                return this.getInformations(socket,data);
            }
        }
    } 

    piracyInformation(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.cible.username].data.interuptable.byUser === data.user.username){
                return this.getInformation(socket,data);
            }
        }
    }

    readInformation(socket,data){
        if(this.users[data.cible.username]){//catch virus
            if(this.users[data.cible.username].data.informations[data.information.title].virus.type !== 0){
                if(this.users[data.user.username].data.virus.type === 0 && data.user.username != this.users[data.cible.username].data.informations[data.information.title].virus.owner)
                    this.users[data.user.username].data.virus = this.users[data.cible.username].data.informations[data.information.title].virus;
            }
        }
        return this.getInformation(socket,data);
    }

    getInformation(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.cible.username].data.informations[data.information.title]){
                return this.users[data.cible.username].data.informations[data.information.title];
            }
        }
    }

    getInformations(socket,data){
        var loadInformations = 1;
        var maxLoadInformations = 20;
        var arrayInformationsToSended = [];
        for (var i = data.maxInformations; i < this.informations.length; i++) {
            if((data.filterOwner == 1 && this.informations[i].owner == this.data.user.owner) 
            || (data.filterOwner == 2)
            || (data.filterOwner == 3 && this.informations[i].owner != this.data.user.owner)){
                arrayInformationsToSended.push(this.informations[i]);
                loadInformations++
            }
            if(loadInformations > maxLoadInformations)
                break;
        }
        return {
            maxInformations : data.maxInformations+maxLoadInformations,
            informations : arrayInformationsToSended,
        }
    }

    deleteInformation(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].data.informations[data.information.title]){
                delete this.users[data.user.username].data.informations[data.information.title];
                this.informations = array.filter(function (el) {
                    return el != undefined;
                  });
            }
        }
    }

    voteInformation(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.cible.username].data.informations[data.information.title]){
                this.users[data.cible.username].data.informations[data.information.title].vote += data.vote;
                return this.users[data.cible.username].data.informations[data.information.title];
            }
        }
    }

    reportInformation(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.cible.username].data.informations[data.information.title]){
                this.users[data.cible.username].data.informations[data.information.title].report[data.user.username] = data.user.username;
                return this.users[data.user.username].data.informations[data.information.title];
            }
        }
    }

}

module.exports = Information;