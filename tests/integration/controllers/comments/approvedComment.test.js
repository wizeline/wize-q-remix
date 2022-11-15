import {approvedByComment} from '~/controllers/comments/approvedBy';

describe('approve comment controller', () => {

    it('approve a comment as an answer', async() => {
        const params ={
            questionId:10,
            commentId:10,
            employeeId: 1, 
            checked: true
        };
       const response = await approvedByComment(params);
       expect(response).toBeDefined();
       expect(response.successMessage).toBe('Comment marked as an answer successfully');
       expect(response.response).toBe('Comment marked as an answer successfully');
    });

    it('unmark a comment approved', async() => {
        let params ={
            questionId:10,
            commentId:10,
            employeeId: 1, 
            checked: true
        };
       const response = await approvedByComment(params);
       expect(response).toBeDefined();
       expect(response.response).toBe('Comment marked as an answer successfully');
       expect(response.successMessage).toBe('Comment marked as an answer successfully');
       params.checked = false;

       const responseUnmark = await approvedByComment(params);
       expect(responseUnmark).toBeDefined();
       expect(responseUnmark.successMessage).toBe('Comment unmarked as an answer successfully');
       expect(responseUnmark.response).toBe('Comment unmarked as an answer successfully');
    });

    it('error when question has a comment approved as an answer', async()=>{
        let params ={
            questionId:9,
            commentId:6,
            employeeId: 1, 
            checked: true
        };
       const response = await approvedByComment(params);
       expect(response).toBeDefined();
       expect(response.errors).toBeDefined();
       expect(response.errors[0].message).toBe('This question already has a comment as answer');
      
    })
})