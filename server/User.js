function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  class User {
    constructor(data){
        this.users = data.users;
        this.blackMarket = data.blackMarket;
        this.informations = data.informations;
        this.maxJobs = data.maxJobs;
        this.maxStats = data.maxStats;
    }

    deleteIllegalsLogs(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.user.username].data.jobExp[data.type] >= this.users[data.cible.username].data.stats.tech){
                Object.keys(this.users[data.cible.username].data.logs).forEach(element => {
                    if(this.users[data.cible.username].data.logs[element].type === 2 || this.users[data.cible.username].data.logs[element].type === 3 || 
                    this.users[data.cible.username].data.logs[element].type === 9 || this.users[data.cible.username].data.logs[element].type === 11 || 
                    this.users[data.cible.username].data.logs[element].type === 12 || this.users[data.cible.username].data.logs[element].type === 13 || 
                    this.users[data.cible.username].data.logs[element].type === 14 ){
                        delete this.users[data.cible.username].data.logs[element];
                    }
                });
                return true;
            }
        }
        return false;
    }

    detectIllegalsLogs(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.user.username].data.jobExp[data.type] >= this.users[data.cible.username].data.stats.tech){
                var logsIllegals = {};
                Object.keys(this.users[data.cible.username].data.logs).forEach(element => {
                    if(this.users[data.cible.username].data.logs[element].type === 2 || this.users[data.cible.username].data.logs[element].type === 3 || 
                    this.users[data.cible.username].data.logs[element].type === 9 || this.users[data.cible.username].data.logs[element].type === 11 || 
                    this.users[data.cible.username].data.logs[element].type === 12 || this.users[data.cible.username].data.logs[element].type === 13 || 
                    this.users[data.cible.username].data.logs[element].type === 14 ){
                        logsIllegals[element] = Object.assign({}, this.users[data.cible.username].data.logs[element]);
                        delete this.users[data.cible.username].data.logs[element];
                    }
                });
                this.users[data.cible.username].data.prisonMinute = Date.now()+((Object.keys(logsIllegals).length)*60000);
                return logsIllegals;
            }
        }
        return false;
    }

    debugVirusIntoPlayer(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.cible.username].data.virus.type !== 0){
                if(this.users[data.user.username].data.jobExp[data.type] >= this.users[data.cible.username].data.virus.level){
                    this.users[data.cible.username].data.virus = {
                        type:0,
                        level:0,
                    }
                    return true;
                }
            }
        }
        return false;
    }

    piracyMonaie(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.user.username].data.stats.tech >= this.users[data.cible.username].data.stats.firewall){
                var cryptoMoney = randomIntFromInterval(1,this.users[data.user.username].data.jobExp[data.type]);
                this.users[data.cible.username].data.stats.cryptoMoney -= cryptoMoney;
                this.users[data.user.username].data.stats.cryptoMoney += cryptoMoney;
                return cryptoMoney;
            }
        }
        return false;
    }

    connectUser(socket,data){
        if(this.users[data.user.username]){
          this.users[data.user.username].socket = socket;
          socket.emit('user connected', { data: this.users[data.user.username].data });
          //jwt.sign({ user: req.body.user.username ,iat:Date.now() }, this.signed)
          return this.listUser[data.user.username];
        }
    }

    createUser(socket,data){
        if(!this.users[data.user.username]){
            var user = {
                data : {
                    username : data.user.username,
                    password : data.user.password,
                    stats : {
                        reputation : 1,
                        tech : 1,
                        firewall : 1,
                        bandwidth : 20,
                        cryptoMoney : 100,
                    },
                    modules : {},
                    informations : {},
                    logs : {},
                    jobExp : {
                        1 : 1,2 : 1,3 : 1,4 : 1,5 : 1,6 : 1,7 : 1,8 : 1,9 : 1,10 : 1,11 : 1,12 : 1,13 : 1,14 : 1,
                    },
                    interuptable : {
                        byUser : '',
                        type : 0,
                    },
                    virus : {
                        type:0,
                        level:0,
                    },
                    prisonMinute : Date.now(),
                },
                socket : socket,
            }

            this.users[data.user.username] = user;
            socket.emit('user connected', { data: user.data });
        }else{
            socket.emit('user already exist', {});
        }
    }

    getUser(socket,data){
        if(this.users[data.username]){
            return this.users[data.username].data;
        }
    }

    getUsers(socket,data){
        if(this.users[data.username]){
            var users = {};
            for (const [key, value] of Object.entries(this.users)) {
                users[key] = Object.assign({},value.data)
            }
            return users;
        }
    }

    getUsersConnected(socket,data){
        if(this.users[data.username]){
            var users = {};
            for (const [key, value] of Object.entries(this.users)) {
                if(value.socket.connected == true)
                    users[key] = Object.assign({},value.data)
            }
            return users;
        }
    }

    subStat(socket,data){
        if(this.users[data.username]){
            if(this.users[data.username].data.stats[data.typeStat]-data.value >= 1)
                this.users[data.username].data.stats[data.typeStat] -= data.value
        }
    }

    addStat(socket,data){
        if(this.users[data.username]){
            //if(this.users[data.username].stats[data.typeStat]-data.value >= 1)
            this.users[data.username].data.stats[data.typeStat] += data.value
        }
    }

    /* to send easy information*/
    getFriends(){

    }
    
    addFriend(){

    }
    
    deleteFriend(){

    }

}

module.exports = User;