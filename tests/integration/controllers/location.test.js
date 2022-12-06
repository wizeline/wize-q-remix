import listLocations from '../../../app/controllers/locations/list';

describe('location controllers', () => {
  describe('listLocations', () => {
    it('returns list of locations ordered by name', async () => {
      const expected = [
        { name: 'All', code: 'ALL' },
        { name: 'Bangkok', code: 'BNK' },
        { name: 'Guadalajara', code: 'GDL' },
        { name: 'Ho Chi Minh', code: 'HCMC' },
        { name: 'Mexico City', code: 'CDMX' },
        { name: 'New York', code: 'NYC' },
        { name: 'Queretaro', code: 'QRO' },
        { name: 'San Francisco', code: 'SF' },
      ];

      const locations = await listLocations();
      expect(locations).toBeDefined();
      expect(locations).toEqual(expected);
    });
  });
});
