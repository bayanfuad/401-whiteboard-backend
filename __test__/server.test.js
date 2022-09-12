'use strict';
const{app} = require('../server');
const supertest =require('supertest');
const request = supertest(app);
describe('testing the server',()=>{
    it('test the home route',async()=>{
const response = await request.get('/');
expect(response.text).toEqual('Hello from the home page');
    })
})