import { findOrCreateUser, findUser } from 'app/controllers/users/find';
import { db } from 'app/utils/db.server';
import updateUser from 'app/controllers/users/update';

describe('user controllers', () => {
  describe('findUser', () => {
    it('returns user with existing email', async () => {
      const expected = {
        employee_id: 1,
        full_name: 'Patrick Shu',
        email: 'patrick.shu@wizeline.com',
        is_admin: false,
        profile_picture: null,
        job_title: null,
      };

      const user = await findUser(expected.email);
      expect(user).toBeDefined();
      expect(user).toEqual(expected);
    });
    it('should throw error on user not found', async () => {
      await expect(findUser('notexistinguser@mail.com')).rejects.toThrowError();
    });
  });

  describe('findOrCreateUser', () => {
    const dbCreateSpy = jest.spyOn(db.users, 'create');
    const dbFindUniqueSpy = jest.spyOn(db.users, 'findUnique');

    afterEach(() => {
      dbFindUniqueSpy.mockClear();
      dbCreateSpy.mockClear();
    });

    it('returns user with existing email', async () => {
      const payload = {
        full_name: 'Patrick Shu',
        email: 'patrick.shu@wizeline.com',
        profile_picture: undefined,
      };

      const user = await findOrCreateUser(payload);

      expect(dbFindUniqueSpy).toHaveBeenCalled();
      expect(dbCreateSpy).toHaveBeenCalledTimes(0);

      expect(user).toBeDefined();
      expect(user.full_name).toEqual(payload.full_name);
    });

    it('should create user when not found', async () => {
      const payload = {
        full_name: 'John Smith Baleman',
        email: 'john.smith@wizeline.com',
        profile_picture: 'url_string',
      };

      const user = await findOrCreateUser(payload);

      expect(dbFindUniqueSpy).toHaveBeenCalled();
      expect(dbCreateSpy).toHaveBeenCalled();

      expect(user).toBeDefined();
      expect(user.full_name).toEqual(payload.full_name);
      expect(user.email).toEqual(payload.email);
      expect(user.profile_picture).toEqual(payload.profile_picture);
    });
  });
  describe('updateUser', () => {
    it('should validate fields', async () => {
      const response = await updateUser({});
      expect(response).toBeDefined();
      expect(response.errors.length).toBeGreaterThan(0);
    });
    it('updates user fields', async () => {
      const payload = {
        employee_id: 1,
        job_title: 'New job title',
        is_admin: true,
      };
      const response = await updateUser(payload);
      expect(response).toBeDefined();
      expect(response.successMessage).toBeDefined();

      expect(response.updatedUser.job_title).toEqual(payload.job_title);
      expect(response.updatedUser.is_admin).toEqual(payload.is_admin);
    });
    it('throws error if employee_id not found', async () => {
      const payload = {
        employee_id: 99999,
        job_title: 'New job title',
        is_admin: true,
      };
      await expect(updateUser(payload)).rejects.toThrowError();
    });
  });
});
