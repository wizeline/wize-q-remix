import { findUser } from "~/controllers/users/find";
import { updateUser } from "~/controllers/users/update";

describe("user controllers", () => {
  describe("findUser", () => {
    it("returns user with existing email", async () => {
        const expected = {
          "employee_id": 1,
          "full_name": "Patrick Shu",
          "email": "patrick.shu@wizeline.com",
          "is_admin": false,
          "profile_picture": null,
          "job_title": null
        };

        const user = await findUser(expected.email);
        expect(user).toBeDefined();
        expect(user).toEqual(expected);
    });
    it("should throw error on user not found", async () => {
      await expect(findUser("notexistinguser@mail.com")).rejects.toThrowError()
  });
  });
  describe("updateUser", () => {
    it("should validate fields", async () => {
        const response = await updateUser({});
        expect(response).toBeDefined();
        expect(response.errors.length).toBeGreaterThan(0);
    });
    it("updates user fields", async () => {
      const payload = {
        employee_id: 1,
        job_title: "New job title",
        is_admin: true,
      }
      const response = await updateUser(payload);
      expect(response).toBeDefined();
      expect(response.successMessage).toBeDefined();

      expect(response.updatedUser.job_title).toEqual(payload.job_title);
      expect(response.updatedUser.is_admin).toEqual(payload.is_admin);

  });
  it("throws error if employee_id not found", async () => {
    const payload = {
      employee_id: 99999,
      job_title: "New job title",
      is_admin: true,
    }
    await expect(updateUser(payload)).rejects.toThrowError()
  });
  });
});