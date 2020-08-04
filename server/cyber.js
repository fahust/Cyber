class Cyber {
    constructor(){
        this.users = {};
        this.informations = {};
        this.modules = {};
    }



    ///INFORMATION

    addInformation(socket,data){
        if(this.users[data.user.username]){
            if(!this.users[data.user.username].informations[data.information.title]){
                this.users[data.user.username].informations[data.information.title] = data.information;
            }
        }
    } 

    getInformation(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].informations[data.information.title]){
                return this.users[data.user.username].informations[data.information.title];
            }
        }
    }

    getInformations(socket,data){
        if(this.users[data.user.username]){
            return this.users[data.user.username].informations[data.information.title];
        }
    }

    deleteInformation(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].informations[data.information.title]){
                delete this.users[data.user.username].informations[data.information.title];
            }
        }
    }



    ///MODULES

    addModuleIntoInformation(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].informations[data.information.title]){
                if(!this.users[data.user.username].informations[data.information.title].module){
                    this.users[data.user.username].informations[data.information.title].module = data.information.module;
                }
            }
        }
    } 

    useModuleIntoInformation(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].informations[data.information.title]){
                if(this.users[data.user.username].informations[data.information.title].module){
                    //augmentation des stats
                    delete this.users[data.user.username].informations[data.information.title].module;
                }
            }
        }
    } 

    deleteModuleIntoInformation(socket,data){
        if(this.users[data.user.username]){
            if(this.users[data.user.username].informations[data.information.title]){
                if(this.users[data.user.username].informations[data.information.title].module){
                    delete this.users[data.user.username].informations[data.information.title].module;
                }
            }
        }
    } 



    ///JOB

    endJob(socket,data){
        /*
            1 : rediger information
            1 : pirater information
            3 : pirater monnaie
            4 : detecter des illégalité dans les logs d'un joueur
            5 : scan de module (pour trouver un virus)
            6 : implanter un module dans une info
            7 : debuguer un module d'un virus
            8 : implanter virus dans un module
            9 : debuguer un joueur d'un virus
            10 : vol de membre
            11 : vente de membre
            12 : achat de membre
            13 : supprimer logs
        */

        if(data.type === 1){
            
        }
    }

    /* sert a envoyé des notifs */ 
    startJob(socket,data){
        this.addLog(socket,data)
    }

    addLog(socket,data){
        if(this.users[data.username]){
            this.users[data.username].logs = {
                type : data.type,
                cible : data.cible,
                module : data.module,
            }
        }
    }



    ///USER

    createUser(socket,data){
        if(!this.users[data.username]){
            var user = {
                username : data.username,
                password : data.password,
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

                }
            }

            this.users[data.username] = user;
        }

    }

    subStat(socket,data){
        if(this.users[data.username]){
            if(this.users[data.username].stats[data.typeStat]-data.value >= 1)
                this.users[data.username].stats[data.typeStat] -= data.value
        }
    }

    addStat(socket,data){
        if(this.users[data.username]){
            //if(this.users[data.username].stats[data.typeStat]-data.value >= 1)
            this.users[data.username].stats[data.typeStat] += data.value
        }
    }

}