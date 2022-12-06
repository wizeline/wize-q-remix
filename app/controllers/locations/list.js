import { db } from '../../utils/db.server';

const listLocations = async () => {
  const locations = await db.Locations.findMany({
    orderBy: {
      name: 'asc',
    },
  });

  return locations;
};

export default listLocations;
