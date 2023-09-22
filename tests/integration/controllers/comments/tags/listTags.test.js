import ListTags from 'app/controllers/comments/tags/list';

describe('list tags', () => {
  it('return all the tags', async () => {
    const response = await ListTags({});
    expect(response).toBeDefined();
    expect(response.tags).toBeDefined();
    expect(response.tags.length).toBe(3);
  });

  it('return by search term - Violate', async () => {
    const response = await ListTags({ searchTerm: 'Violate' });
    expect(response).toBeDefined();
    expect(response.tags).toBeDefined();
    expect(response.tags[0].tag_id).toBe(1);
  });

  it('retunr an empty list', async () => {
    const response = await ListTags({ searchTerm: 'abc' });
    expect(response).toBeDefined();
    expect(response.tags).toBeDefined();
    expect(response.tags.length).toBe(0);
  });
});
