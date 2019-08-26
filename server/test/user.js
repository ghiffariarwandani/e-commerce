const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/user');

chai.use(chaiHttp)

// after(function (done) {
//   User.deleteMany({})
//     .then(() => {
//       console.log('deleted');
//       done()
//     })
// })


// describe('signup', function () {

//   it('should return status 201 when email is unique', function (done) {
//     chai
//       .request(app)
//       .post('/user/signup')
//       .send({
//         username: 'ghiffariarw',
//         email: 'ghiffariarw@gmail.com',
//         password: '123456'
//       })
//       .end((err, res) => {
//         expect(res).to.have.a.status(201)
//         expect(res.body.password).to.not.equal(this.password)
//         done()
//       })
//   })

//   it('should return status 400 when email is not unique', function (done) {
//     chai
//       .request(app)
//       .post('/user/signup')
//       .send({
//         username: 'ghiffariarw',
//         email: 'ghiffariar@gmail.com',
//         password: '123456'
//       })
//       .end(function (err, res) {
//         expect(res).to.have.a.status(400)
//         done()
//       })
//   })

//   it('should return status 400 when username/(email, password) is empty', function (done) {
//     chai
//       .request(app)
//       .post('/user/signup')
//       .send({
//         username: '',
//         email: 'ghiffariarw@gmail.com',
//         password: '123456'
//       })
//       .end(function (err, res) {
//         if (err) console.log(err);
//         else {
//           expect(res).to.have.a.status(400)
//           done()
//         }
//       })
//   })

//   it('should return 400 when password less than 6 character', function (done) {
//     chai
//       .request(app)
//       .post('/user/signup')
//       .send({
//         username: 'ghiffariarw',
//         email: 'ghiffariar@gmail.com',
//         password: '123'
//       })
//       .end(function (err, res) {
//         if (err) console.log(err);
//         else {
//           expect(res).to.have.a.status(400)
//           done()
//         }
//       })
//   })

// })

describe('signin', function () {

  it('should be return token', function (done) {
    chai
      .request(app)
      .post('/user/signin')
      .send({
        email: 'ghiffariarw@gmail.com',
        password: '123456'
      })
      .end(function (err, res) {
        expect(res.body).to.have.property('token')
        done()
      })
  })

  it('should be return status 404 when email not found', function (done) {
    chai
      .request(app)
      .post('/user/signin')
      .send({
        email: 'ghiffarixarw@gmail.com',
        password: '123456'
      })
      .end((err, res) => {
        if (err) console.log(err);
        else {
          expect(res).to.have.a.status(404)
          done()
        }
      })
  })

  it('should be return status 404 when password didnt match', function (done) {
    chai
      .request(app)
      .post('user/signin')
      .send({
        email: 'ghiffariarw@gmail.com',
        password: '123456662'
      })
      .end((err, res) => {
        if(err) console.log(err);
        else {
          expect(res).to.have.a.status(404)
          done()
        }
      })
  })

})