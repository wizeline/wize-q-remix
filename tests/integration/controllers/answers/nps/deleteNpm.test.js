import {deleteNPS} from '~/controllers/answers/nps/delete';

describe('nps delete controller', () => {
    it('delete the nps from an answer', async()=>{
        const params ={
            id: 3,
            user: { id: 'google-oauth2|111766391199351256706' }
        }
        const response = await deleteNPS(params);
        expect(response).toBeDefined();
        expect(response.successMessage).toBeDefined();
        expect(response.successMessage).toBe('NetScore has been deleted succesfully.');
    })
    it('error when the netscore not exist', async() => {
        const params ={ id: 10, user: {id: 'google-oauth2|111766391199351256706' }};
        const response = await deleteNPS(params);
        expect(response).toBeDefined();
        expect(response.errors).toBeDefined();
        expect(response.errors[0].message).toBe('Something went wrong at delete the netscore');
    })
    
    it('error when the id is not a number', async() => {
        const params ={ id: 'number', user: { id: 'google-oauth2|111766391199351256706' }};
        const response = await deleteNPS(params);
        expect(response).toBeDefined();
        expect(response.errors).toBeDefined();
        expect(response.errors[0].message).toBe('An unknown error has occurred with your request.');
    })
})