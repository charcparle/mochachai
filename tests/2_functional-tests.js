const chai = require("chai");
const assert = chai.assert;

const server = require("../server");

const chaiHttp = require("chai-http");
chai.use(chaiHttp);

suite("Functional Tests", function () {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test GET /hello with no name", function (done) {
      chai
        .request(server)
        .get("/hello")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello Guest");
          done();
        });
    });
    // #2
    test("Test GET /hello with your name", function (done) {
      chai
        .request(server)
        .get("/hello?name=xy_z")
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, "hello xy_z");
          done();
        });
    });
    // #3
    test('send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({surname: "Colombo"})
        .end(function (err, res) {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.type, "application/json", "Response type should be json");
          assert.equal(res.body.name, "Cristoforo", "Name should be Cristoforo");
          assert.equal(res.body.surname, 'Colombo', "Surname should be Colombo");

          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .put("/travellers")
        .send({surname: "da Verrazzano"})
        .end(function (err,res) {
          assert.equal(res.status, 200, "Response status should be 200");
          assert.equal(res.type, "application/json", "Response type should be json");
          assert.equal(res.body.name, "Giovanni", "Name should be Giovanni");
          assert.equal(res.body.surname, 'da Verrazzano', "Surname should be da Verrazzano");

          done();
        });
    });
  });
});

const Browser = require("zombie");
Browser.site = 'https://mochachai.charlescheng1.repl.co';
// for local host, use the following line instead - 
// Browser.localhost('example.com', process.env.PORT || 3000);
const browser = new Browser();
suite("e2e Testing with Zombie.js", function () {
  
  suite('"Famous Italian Explorers" form', function () {
    // #5
    
    suiteSetup(function(done) {
      return browser.visit('/', done);
      browser.assert.success();
    });

    test('submit "surname" : "Colombo" - write your e2e test...', function (done) {
      
      browser
        .fill("surname", "Colombo")
        .then(()=>browser.pressButton("submit", function () {
          //assert.fail();
          browser.assert.success();
          browser.assert.text('span#name','Cristoforo');
          browser.assert.text('span#surname','Colombo');
          browser.assert.elements('span#dates',1);
        }));
      done();
    });
    // #6
    test('submit "surname" : "Vespucci" - write your e2e test...', function (done) {
      browser
        .fill("surname", "Vespucci")
        .then(()=>browser.pressButton("submit", function () {
          //assert.fail();
          browser.assert.success();
          browser.assert.text('span#name','Amerigo');
          browser.assert.text('span#surname','Vespucci');
          browser.assert.elements('span#dates',1);
        }));

      done();
    });
  });
});
