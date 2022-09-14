import { db } from "~/utils/db.server";

const getPagination = (page, size) => {
    // check if size is defined, if it is, convert the value to number, if not set default value to 20
    const limit = size ? size : 20;
    // check if page is defined, if it is calculates the offset for the pagination, if not set offset to 0
    const offset = page ? page * limit : 0;
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
    const users = await db.users.findMany({
        where: where,
        take: limit,
        skip: offset,
    });

    const totalPages = Math.floor(count / limit);

    return {
        totalPages,
        users,
    };
};
