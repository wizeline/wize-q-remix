import { DEFAULT_ERROR_MESSAGE } from "~/utils/backend/constants";
import { updateUserSchema } from "~/utils/backend/validators/admin";
import { db } from "~/utils/db.server";

const getPagination = (page, size) => {
    // check if size is defined, if it is, convert the value to number, if not set default value to 20
    const limit = size ? size : 20;
    // check if page is defined, if it is calculates the offset for the pagination, if not set offset to 0
    const offset = page ? (page - 1) * limit : 0;
    return { limit, offset };
};

export const listUsers = async (query) => {
    const { page, search, size } = query;
    const { limit, offset } = getPagination(Number(page), Number(size));

    const where = search === undefined ? undefined : {
        OR: [
            {
                full_name: { contains: search }
            },
            {
                email: { contains: search }
            }
        ],
    };

    const count = await db.users.count({
        where: where,
    });
    const totalPages = Math.floor(count / limit) + 1;
    const users = await db.users.findMany({
        where: where,
        take: limit,
        skip: (offset / limit) > totalPages ? 0 : offset,
    });

    return {
        totalPages,
        users,
    };
};

export const updateUser = async (query) => {
    const { error, value } = updateUserSchema.validate(query);
    const { employee_id, is_admin, job_title } = value;

    if (error) {
        console.error(error);
        return {
            errors: [
                {
                    message: DEFAULT_ERROR_MESSAGE,
                    detail: error.details,
                }
            ]
        }
    }

    await db.users.update({
        where: {
            employee_id
        },
        data: {
            is_admin,
            job_title
        }
    });

    return {
        success: 'User has been updated succesfully.'
    };
}