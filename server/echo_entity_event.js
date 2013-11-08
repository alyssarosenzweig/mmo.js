/* echo_entity_event.js
A sample echo for testing listen.js, entity.js, protocol.js, event.js. Telnet to localhost:1234 for testing
mmo.js
Copyright (C) bobbybee 2013
ALL RIGHTS RESERVED
*/

var Connection = require("./Connection");
var listen = require("./listen/listen.js");
var Entity = require('./entity');
var Event = require('./event');
var Protocol = require('./protocol');

function PlayerAI(player){
    this.player = player;
    this.lastMessage = "";
}
PlayerAI.prototype.receive = function(event){
   // this.player.conn.send("Before you sent: "+this.lastMessage+"\n");
    //this.player.conn.send("You just sent: "+event+"\n");
  //  this.player.conn.send(Protocol.serialize(new Event("previous", [this.lastMessage])));
//    this.player.conn.send(Protocol.serialize(new Event("current", [event.arguments["data"])));
    this.player.trigger(new Event("previous", {"message":this.lastMessage}));
    this.player.trigger(new Event("previous", {"message":events.arguments["message"]}));
    this.lastMessage = event.arguments["data"];
};


new listen(Connection.RAW_TCP, 1234, function(connection){
    var player = new Entity("Player", connection, PlayerAI);
	connection.send("Hello!\n");

	connection.onData = function(d){
	//	connection.send("You said: "+d);
      //  player.ai.receive(d);
      try {
          player.ai.receive(Protocol.deserialize(d));
      } catch(e){
          console.log(e);
      }
    };
});
