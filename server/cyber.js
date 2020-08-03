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

    useJob(socket,data){
        
    }

}