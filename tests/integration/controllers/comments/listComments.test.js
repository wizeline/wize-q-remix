import {listComments} from '~/controllers/comments/list';
import {INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE} from '~/utils/constants';
import { randomAccessToken } from "./../../../utils";

describe("listComments", ()=> {

    it('return the comments list according with the question Id',async() => {
        const response = await listComments({questionId: 2, sessionToken: randomAccessToken()});
        expect(response).toBeDefined();
        expect(response.comments).toBeDefined(); 
        expect(response.comments.length).toBe(3);  
    });

    it('return the comments list sort by votes', async() => {
        const response = await listComments({questionId: 10, sortBy:'votes'});
        expect(response).toBeDefined();
        expect(response.comments).toBeDefined();
        expect(response.comments[0].id).toBe(10)
    });

    it('return the comments list sort by recent_activity', async() => {
        const response = await listComments({questionId: 10, sortBy:'recent_activity'});
        expect(response).toBeDefined();
        expect(response.comments).toBeDefined();
        expect(response.comments[0].id).toBe(9)
    });

    it('return the comments list sort by approverBy', async() => {
        const response = await listComments({questionId: 9});
        expect(response).toBeDefined();
        expect(response.comments).toBeDefined();
        expect(response.comments[0].id).toBe(7)
    })

    it('return an error when invalid question id', async () => {
        const response = await listComments({questionId: 0});
        expect(response).toBeDefined();
        expect(response.error).toBeDefined();
        expect(response.error.message).toBe(INVALID_PARAMS_FOR_OPERATION_ERROR_MESSAGE);
        expect(response.error.details).toBe('The question id must be an integer not minor to 1');
    });

    it('return an empty array when the question does not have comments', async() => {
        const response = await listComments({questionId: 3});
        expect(response).toBeDefined();
        expect(response.comments.length).toBe(0);  
    })

});