import  { MongoClient } from 'mongodb'
import { expect } from 'chai';
import { getUserByUserName } from './db';


describe('getUserByUserName', () => {
    it('get the correct user from the database given a username', async () => {
        const client = await MongoClient.connect(
            'mongodb://localhost:27017/TEST_DB',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );

        const db = client.db('TEST_DB');

        const fakeData = 
        [
            {
                id: '123',
                username: 'abc',
                email: 'abc@gmail.com'
            },
            {
                id: '124',
                username: 'wrong',
                email: 'wrong@gmail.com'
            }
        ];

        await db.collection('users').insertMany(fakeData);
        const actual = await getUserByUserName('abc');
        const finalDBState = await db.collection('users').find().toArray();
        await db.dropDatabase();
        
        client.close();

        const expected = {
            id: '123',
            username: 'abc',
            email: 'abc@gmail.com'
        };

        expect(actual).to.deep.equal(expected);
        expect(finalDBState).to.deep.equal(fakeData);
    });
    
})