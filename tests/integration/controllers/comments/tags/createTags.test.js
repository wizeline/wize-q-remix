import createTag from 'app/controllers/comments/tags/create';
import { DEFAULT_ERROR_MESSAGE } from 'app/utils/constants';

describe('create tag', () => {
  it('create a new tag ', async () => {
    const data = { tagText: 'rude comment violates the community guideline' };
    const response = await createTag(data);
    expect(response).toBeDefined();
    expect(response.successMessage).toEqual('The tag was created succesfully.');
    expect(response.tag).toBeDefined();
    expect(response.tag.tag_id).toBe(4);
    expect(response.tag.tag_text).toBe(data.tagText);
  });

  it('error sending an empty object', async () => {
    const response = await createTag({});
    expect(response).toBeDefined();
    expect(response.error).toBeDefined();
    expect(response.error.message).toEqual(DEFAULT_ERROR_MESSAGE);
  });
});
