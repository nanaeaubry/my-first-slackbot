module.exports = function(robot) {

  robot.hear(/alright/, function(res) {
    return res.send('mmmmhmmmm');
  });

  var lulz = ['lol', 'rofl', 'lmao'];
  robot.respond(/lol/i, function(res) {
    return res.send(res.random(lulz));
  });

  robot.hear(/Hello/i, function(res) {
    return res.send('Hey girl Hey!');
  });

  robot.hear(/sad/i, function(res) {
    return res.send("If it don't pay your bills, then pay it no mind");
  });

  robot.hear(/go/i, function(res) {
    return res.send('Start your engines');
  });

  robot.topic(function(res) {
    return res.send(res.message.text + "? Where are we going with this?");
  });
  enterReplies = ['Hi', 'Target Acquired', 'Hello friend.', 'I see you'];
  leaveReplies = ['Are you still there?', 'Bye Felicia', 'Wait what'];

  robot.enter(function(res) {
    return res.send(res.random(enterReplies));
  });

  robot.leave(function(res) {
    return res.send(res.random(leaveReplies));
  });

  robot.respond(/you are a little slow/, function(res) {
    return setTimeout(function() {
      return res.send("Who you calling 'slow'?");
    }, 6 * 1000);
  });

  canIId = null;
  robot.respond(/I can't/, function(res) {
    if (canIId) {
      res.send("You aren't listening to me!!!");
      return;
    }
    return canIId = setInterval(function() {
      return res.send("YES YOU CAN!!");
    }, 500);
  });

  robot.respond(/I can/, function(res) {
    if (canIId) {
      res.send("Yay! You can do it girl!");
      clearInterval(canIId);
      return canIId = null;
    } else {
      return res.send("Yeah no duh!");
    }
  });
  robot.router.post('/hubot/chatsecrets/:room', function(req, res) {
    var data, room, secret;
    room = req.params.room;
    data = JSON.parse(req.body.payload);
    secret = data.secret;
    robot.messageRoom(room, "I have a secret: " + secret);
    return res.send('OK');
  });

  robot.error(function(err, res) {
    robot.logger.error("DOES NOT COMPUTE");
    if (res != null) {
      return res.reply("DOES NOT COMPUTE");
    }
  });

  robot.respond(/have a soda/i, function(res) {
    var sodasHad;
    sodasHad = robot.brain.get('totalSodas') * 1 || 0;
    if (sodasHad > 4) {
      return res.reply("I'm too fizzy..");
    } else {
      res.reply('Sure!');
      return robot.brain.set('totalSodas', sodasHad + 1);
    }
  });

  var target = robot.getUser("jason", stringWithUsername);
  var response = target.mention + ", that's sassy.";
  robot.sendMessage(message.channel, response);

};
