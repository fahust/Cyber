function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  class Job {
    constructor(data,classInformation,classModule,classUser,classVirus,classBlackMarket){
        this.users = data.users;
        this.blackMarket = data.blackMarket;
        this.modules = data.modules;
        this.maxJobs = data.maxJobs;
        this.maxStats = data.maxStats;

        this.classInformation = classInformation;
        this.classModule = classModule;
        this.classUser = classUser;
        this.classVirus = classVirus;
        this.classBlackMarket = classBlackMarket;
    }


    ///JOB

    addInteruptableToCible(socket,data){
        if(this.users[data.cible.username]){
            if(this.users[data.cible.username].data.interuptable.byUser === ''){
                this.users[data.cible.username].data.interuptable = {
                    byUser : data.user.username,
                    type : data.type,
                }
                this.users[data.cible.username].socket.emit('add interuptable', { data: this.users[data.cible.username].data.interuptable });
                return true
            }else{
                return false
            }
        }
    }

    clearInteruptableToCible(socket,data){
        if(this.users[data.cible.username]){
            this.users[data.cible.username].data.interuptable = {
                byUser : '',
                type : 0,
            }
        }
    }

    /* sert a envoyé des notifs et donne possibilité pour la cible d'interompre l'action si clique sur notif avant la fin */
    interuptJob(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].data.interuptable.byUser !== ''){
                this.clearInteruptableToCible(socket,data);
            }
        }
    }

    /*
        1 : rediger information
        2 : pirater information //interuptable //illegal
        3 : pirater monnaie //interuptable //illegal
        4 : créer un module
        5 : scan d'information (pour trouver un virus)
        6 : implanter un module dans une info
        7 : extraire un module d'une info
        8 : debuguer une information d'un virus
        9 : implanter virus dans une information //illegal
        10 : debuguer un joueur d'un virus
        11 : vol de membre //illegal
        12 : vente de membre //illegal
        13 : achat de membre //illegal
        14 : supprimer logs illégaux //illegal
        15 : detecter des illégalité dans les logs d'un joueur //interuptable
    */ 
    endJob(socket,data){
        if(this.users[data.user.username]){
            var value = true;

            if(data.type === 2 || data.type === 3 || data.type === 14){
                if(this.users[data.cible.username].data.interuptable.byUser === '')
                    value = false;
                this.clearInteruptableToCible(socket,data);
            }

            if(data.type === 1){
                value = this.classInformation.addInformation(socket,data);
            }
            if(data.type === 2){
                value = this.classInformation.piracyInformation(socket,data);
            }
            if(data.type === 3){
                value = this.classUser.piracyMonaie(socket,data);
            }
            if(data.type === 4){
                value = this.classModule.createModule(socket,data);
            }
            if(data.type === 5){
                value = this.classInformation.scanInformation(socket,data);
            }
            if(data.type === 6){
                value = this.classModule.injectModuleIntoInformation(socket,data);
            }
            if(data.type === 7){
                value = this.classVirus.extractModuleOutInformation(socket,data);
            }
            if(data.type === 8){
                value = this.classVirus.debugVirusIntoInformation(socket,data);
            }
            if(data.type === 9){
                value = this.classVirus.injectVirusIntoInformation(socket,data);
            }
            if(data.type === 10){
                value = this.classUser.debugVirusIntoPlayer(socket,data);
            }
            if(data.type === 14){
                value = this.classUser.deleteIllegalsLogs(socket,data);
            }
            if(data.type === 15){
                value = this.classUser.detectIllegalsLogs(socket,data);
            }
            
            var exp = 0;
            if(value != false)
                exp = this.addJobExp(socket,data);

            this.users[data.cible.username].socket.emit('end job', { data: this.addLog(socket,data,value,exp) });
            
            return value;
        }
    }

    startJob(socket,data){
        if(this.users[data.user.username] && this.users[data.user.username].prisonMinute <= Date.now()){
            if(data.type === 2 || data.type === 3 || data.type === 14)
                return this.addInteruptableToCible(socket,data);
            return true;
        }else{
            return false
        }
    }

    addJobExp(socket,data){
        return this.users[data.user.username].data.jobExp[data.type] += randomIntFromInterval(1,5)/this.users[data.user.username].data.jobExp[data.type]
    }

    addLog(socket,data,value){
        if(this.users[data.user.username]){
            var date = Date.now();

            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "numeric", minute: "numeric", second: "numeric",  };
            var dateStringed = date.toLocaleDateString('fr-FR', options);

            this.users[data.user.username].data.logs[date] = {
                type : data.type,
                cible : data.cible,
                user : data.user,
                value : value,
                date : dateStringed,
            }

            if(data.user.username != data.cible.username){
                this.users[data.cible.username].data.logs[date] = {
                    type : data.type,
                    cible : data.cible,
                    user : data.user,
                    value : value,
                    date : dateStringed,
                }
            }
            return this.users[data.user.username].data.logs[date];
        }
    }

}

module.exports = Job;