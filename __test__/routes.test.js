'use strict'
const {app} = require('../server');
const supertest = require('supertest');
const req = supertest(app);

 describe('testing the CRUD methods',(req,res)=>{
    it('test get all posts method',async()=>{
        let res = await req.get('./post');
        expect(typeof res.body).toEqual('object');
    })
 });

 it('test getting one post',async () => {
    let res = await req.get('/post/1');
    expect(typeof res.body).toEqual('object');
 });


 it('test adding one post',async () => {
    const data = {
        postTitle:"Welcome to posts",
        postContent: "This is the first post",
        hideContent: true
    }
    let res = await req.post('/post').send(data);
    expect(typeof res.body).toEqual('object');
    expect(res.statusCode).toBe(200);

 });


 it('test updating one post',async () => {
    const data = {
        postTitle:"Hello",
        postContent: "Let's start the journey",
        hideContent: false
    }
    let res = await req.put('/post/2').send(data);
    expect(typeof res.body).toEqual('object');
    expect(res.statusCode).toBe(200);
 });


 it('test delete one post',async () => {
    let res = await req.delete('/post/8');
    expect(res.statusCode).toBe(204);
 });


