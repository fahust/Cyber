function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  class User {
    constructor(data){
        this.users = data.users;
        this.blackMarket = data.blackMarket;
        this.modules = data.modules;
        this.maxJobs = data.maxJobs;
        this.maxStats = data.maxStats;
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
                    modules : {

                    },
                    informations : {

                    },
                    logs : {

                    },
                    jobExp : {
                        1 : 1,
                        2 : 1,
                        3 : 1,
                        4 : 1,
                        5 : 1,
                        6 : 1,
                        7 : 1,
                        8 : 1,
                        9 : 1,
                        10 : 1,
                        11 : 1,
                        12 : 1,
                        13 : 1,
                        14 : 1,
                    }
                },
                socket : socket,
            }

            this.users[data.user.username] = user;
        }

    }

    getUser(socket,data){
        if(this.users[data.username]){
            return this.users[data.username].data;
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

}

module.exports = User;