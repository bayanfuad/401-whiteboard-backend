'use strict'

const supertest = require( 'supertest' );
const server = require( '../server' );
const request = supertest( server.app );


describe('Test Comment get route', () => {
    it('get all comments', async() => {
        const res = await request.get('/comment');
        expect(res.status).toEqual(200);
    });
})

describe('Test comment post route', () => {
    it('Create a comment', async () => {
        const res =  await request.post('/comment/10').send({
            content: 'test one'
        })
        expect(res.status).toEqual(200);
    });
    });
    
    describe('Test comment put route', () => {
        it('Update a comment', async () => {
            const res =  await request.put('/comment/1').send({
                ownerID: 1,
                content: 'I like it'
            });
            expect(res.status).toEqual(201);
            });
    });
    
    
    describe('Test comment delete route', () => {
        it('Delete a comment', async () => {
            const res = await request.delete('/comment/1');
            expect(res.status).toEqual(204);
            expect(res.text).toEqual('');
        });
    });