const io = require('socket.io')();
var Cyber = require('./cyber.js');
var allClients = [];

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
  }


const signed = randomIntFromInterval(0,999999999999999)


cyber = new Cyber(signed);

io.on('connection', socket => { 

  /*allClients.push(socket);

  socket.on('disconnect', function() {
    var i = allClients.indexOf(socket);
    cyber.partyDisconnect(socket.userData);
    delete socket.userData;
    allClients.splice(i, 1);
  });

  socket.on('disconnectParty', function() {
    cyber.partyDisconnect(socket.userData);
  });

  socket.on('imageUpload', function(data) {
    io.sockets.emit('newCard',{ data: cyber.createCard(data)});
    socket.emit('actualizUser',{data: cyber.getUser(data.username)})
  })

  socket.on('dropCard', (data) => {
    cyber.dropCardParty(data);
  })

  socket.on('matchmaking', (data) => {
    cyber.searchMatchmaking(socket,data);
  })

  socket.on('buyCard', (data) => {
    cyber.buyCard(socket,data);
  })


  socket.on('getListCard', (data) => {
    cyber.getListCard(socket,data);
  })

  socket.on('deleteCard', (data) => {
    cyber.deleteCard(socket,data);
  })
  socket.on('getMyListCard', (data) => {
    cyber.getMyListCard(socket,data);
  })*/

  socket.on('start job', (data) => {
    socket.userData = cyber.classJob.startJob(socket,data);
  });

  socket.on('end job', (data) => {
    socket.userData = cyber.classJob.endJob(socket,data);
  });

  socket.on('create', (data) => {
    socket.userData = cyber.classUser.createUser(socket,data);
  });

  socket.on('connected', (data) => {
    socket.userData = cyber.classUser.connectUser(socket,data);
  });

 });


cyber.loadGame();
setInterval(() => {
  cyber.saveGame();
}, 60000*10);

io.listen(12001);

/*socket = {};

data = {
  user : {
    username : 'fu',
    password : 'fu'
  }
}
cyber.classUser.createUser(socket,data);



data = {
  user : {
    username : 'fu'
  },
  cible : {
    username : 'fu'
  },
  information : {
    report : {},
    title : 'info test'
  }
}
console.log(cyber.classInformation.addInformation(socket,data));

data = {
  type : 4,
  user : {
    username : 'fu'
  },
}

console.log(cyber.classJob.startJob(socket,data));
*/
console.log('cyber Server Running')