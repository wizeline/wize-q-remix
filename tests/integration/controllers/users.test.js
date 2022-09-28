import { listLocations } from "../../../app/controllers/locations";

describe("location controllers", () => {
  describe("listLocations", () => {
    it("returns list of locations ordered by name", async () => {
        const locations = await listLocations();
        console.log(locations);
        expect(locations).toBeDefined();
    })
  });
});