'use strict';
const {app} = require('../server');
const supertest = require('supertest');
const req = supertest(app);

describe('testing the CRUD methods', () => {

     it('test get all posts method',async () => {
        let res = await req.get('/post');
        expect(typeof res.body).toEqual('object');
     });


     it('test getting one post',async () => {
        let res = await req.get('/post/1');
        expect(typeof res.body).toEqual('object');
     });


     it('test adding one post',async () => {
        const data = {
            postTitle:"Welcome",
            postContent:"first post" ,
            showContent: true
        }
        let res = await req.post('/post').send(data);
        expect(typeof res.body).toEqual('object');
        expect(res.statusCode).toBe(200);

     });


     it('test update one post',async () => {
        const data = {
            postTitle:"Hello",
            postContent:"Let's start the journey",
            showContent: false
        }
        let res = await req.put('/post/4').send(data);
        expect(typeof res.body).toEqual('object');
        expect(res.statusCode).toBe(201);
     });


     it('test delete one post',async () => {
        let res = await req.delete('/post/5');
        expect(res.statusCode).toBe(204);
     });


});










































