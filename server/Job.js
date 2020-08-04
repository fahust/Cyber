function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  
  class Job {
    constructor(data,classInformation,classModule,classUser){
        this.users = data.users;
        this.blackMarket = data.blackMarket;
        this.modules = data.modules;
        this.maxJobs = data.maxJobs;
        this.maxStats = data.maxStats;

        this.classInformation = classInformation;
        this.classModule = classModule;
        this.classUser = classUser;
    }


    ///JOB

    endJob(socket,data){
        /*
            1 : rediger information
            2 : pirater information //interuptable
            3 : pirater monnaie //interuptable
            4 : créer un module
            5 : scan de module (pour trouver un virus)
            6 : implanter un module dans une info
            7 : debuguer un module d'un virus
            8 : implanter virus dans un module
            9 : debuguer un joueur d'un virus
            10 : vol de membre
            11 : vente de membre
            12 : achat de membre
            13 : supprimer logs illégaux
            14 : detecter des illégalité dans les logs d'un joueur //interuptable
        */

        if(data.type === 4){
            return this.classModule.createModule(socket,data);
        }
    }

    /* sert a envoyé des notifs */ 
    startJob(socket,data){
        this.addLog(socket,data)
    }

    /* possibilité pour la cible d'interompre l'action si clique sur notif avant la fin */
    interuptJob(socket,data){
        if()

    }

    addLog(socket,data){
        if(this.users[data.username]){
            this.users[data.username].data.logs = {
                type : data.type,
                cible : data.cible,
                module : data.module,
            }
        }
    }

}

module.exports = Job;