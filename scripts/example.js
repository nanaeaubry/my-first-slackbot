module.exports = function(robot) {

  robot.hear(/alright/, function(res) {
    return res.send("Dope, yo");
  });
};
