import { createComment } from "~/controllers/comments/create";
import { deleteComment } from "~/controllers/comments/delete";
import { randomAccessToken } from "./../../../utils";

import { db } from "~/utils/db.server";

describe('delete comment controller', () => {
    const dbDeleteManyCommentSpy = jest.spyOn(db.Comments, "deleteMany");

    afterEach(() => {    
      dbDeleteManyCommentSpy.mockClear();
    });

    it('returns an error when accessToken is not provided', async () => {
        const deleteCommentBody = {
            commentId: 1001,
            accessToken: null,
            userEmail: "miguel.cardona@wizeline.com",
        };

        const deleteCommentResponse = await deleteComment(deleteCommentBody);
        expect(deleteCommentResponse).toBeDefined();
        expect(deleteCommentResponse.errors).toBeDefined();
        expect(deleteCommentResponse.errors[0].message).toBe('The provided parameters for the operation are not valid');
        expect(deleteCommentResponse.errors[0].detail.toString()).toContain('accessToken');
        expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(0);
    });

    it('returns an error when provided user email does not match with the comment author', async () => {
        const deleteCommentBody = {
          commentId: 11,
          accessToken: randomAccessToken(),
          userEmail: "not.matching@wizeline.com",
        };

        const deleteCommentResponse = await deleteComment(deleteCommentBody);
        expect(deleteCommentResponse).toBeDefined();
        expect(deleteCommentResponse.error).toBeDefined();
        expect(deleteCommentResponse.error.message).toBe('Error trying to delete the comment');
        expect(deleteCommentResponse.error.detail).toContain('Comment not found or user does not have deletion rights over the comment');
        expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(1);
    });

    it('returns an error when session hash matches but createdAt is out of range', async () => {
        const deleteCommentBody = {
          commentId: 12,
          accessToken: '8b1a5ca556d49fc46c169b2c94a058065d566f01bb208519cffd2d7419f4ff8cb4d63a060019e86354708c55766a60a2449edff151bb34681d4012699ebc3b22',
        };

        const deleteCommentResponse = await deleteComment(deleteCommentBody);
        expect(deleteCommentResponse).toBeDefined();
        expect(deleteCommentResponse.error).toBeDefined();
        expect(deleteCommentResponse.error.message).toBe('Error trying to delete the comment');
        expect(deleteCommentResponse.error.detail).toContain('Comment not found or user does not have deletion rights over the comment');
        expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(1);
    });

    it('deletes the comment when author email matches', async () => {

        const createCommentBody = {
            comment: 'Test delete comment controller',
            questionId: 10,
            user: {
              accessToken: randomAccessToken(),
              userEmail: "eduardo.garibo@wizeline.com",
              userName: "Eduardo Mendoza Garibo",
            },
        };

        const deleteCommentBody = {
          commentId: null,
          accessToken: randomAccessToken(),
          userEmail: "eduardo.garibo@wizeline.com",
        };

        const createCommentResponse = await createComment(createCommentBody);

        expect(createCommentResponse.success).toBeDefined();
        expect(createCommentResponse.comment.id).toBeDefined();
        expect(typeof createCommentResponse.comment.id).toBe('number');


        deleteCommentBody.commentId = createCommentResponse.comment.id;

        const deleteCommentResponse = await deleteComment(deleteCommentBody);
        expect(deleteCommentResponse).toBeDefined();
        expect(deleteCommentResponse.success).toBe(true);
        expect(deleteCommentResponse.response).toBeDefined();
        expect(deleteCommentResponse.response).toBe('Comment was deleted successfully');
        expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(1);
    });

    it('deletes the comment when author session hash matches', async () => {

        const createCommentBody = {
            comment: 'Test delete comment controller',
            questionId: 10,
            user: {
              accessToken: '8b1a5ca556d49fc46c169b2c94a058065d566f01bb208519cffd2d7419f4ff8cb4d63a060019e86354708c55766a60a2449edff151bb34681d4012699ebc3j65',
            },
            isAnonymous: true,
        };

        const deleteCommentBody = {
          commentId: null,
          accessToken: '8b1a5ca556d49fc46c169b2c94a058065d566f01bb208519cffd2d7419f4ff8cb4d63a060019e86354708c55766a60a2449edff151bb34681d4012699ebc3j65'
        };

        const createCommentResponse = await createComment(createCommentBody);

        expect(createCommentResponse.success).toBeDefined();
        expect(createCommentResponse.comment.id).toBeDefined();
        expect(typeof createCommentResponse.comment.id).toBe('number');


        deleteCommentBody.commentId = createCommentResponse.comment.id;

        const deleteCommentResponse = await deleteComment(deleteCommentBody);
        expect(deleteCommentResponse).toBeDefined();
        expect(deleteCommentResponse.success).toBe(true);
        expect(deleteCommentResponse.response).toBeDefined();
        expect(deleteCommentResponse.response).toBe('Comment was deleted successfully');
        expect(dbDeleteManyCommentSpy).toHaveBeenCalledTimes(1);
    });
});
