import { json } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import AdminUsersTable from '~/components/AdminUsersTable';
import Notifications from '~/components/Notifications';
import UserSearchBar from '~/components/UserSearchBar';
import { listUsers } from '~/controllers/users/list';
import { updateUser } from '~/controllers/users/update';
import NotFound from '~/routes/$';
import { requireAdminAuth } from '~/session.server';
import * as Styled from '~/styles/Admin.Styled';

export const loader = async ({ request }) => {

  await requireAdminAuth(request);
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") ?? 1;
  const size = url.searchParams.get("size") ?? 10;
  const search = url.searchParams.get("search") ?? undefined;

  const data = await listUsers({
    page: currentPage,
    search: search,
    size: size,
  });

  return {
    ...data,
    currentPage: Number(currentPage),
    size: size,
  };
}

export const action = async ({ request }) => {
  const formData = await request.formData();

  const payload = {
    is_admin: !formData.has("is_admin") ? undefined : formData.get("is_admin") === "on" ? true : false,
    job_title: formData.get("job_title"),
    employee_id: formData.get("employee_id"),
  };

  const result = await updateUser(payload);
  return json(result);
}


const Admin = () => {
  const  { users, totalPages, currentPage, size } = useLoaderData();
  const [, setSearchParams] = useSearchParams();

  const onSearch = (search) => {
    setSearchParams({
      search
    });
  };

  return (
    <div>
      <Notifications />
      <Styled.Container>
        <h2>Admin page</h2>
        <UserSearchBar onSearch={onSearch} />
      </Styled.Container>
      <AdminUsersTable users={users} currentPage={currentPage} totalPages={totalPages} size={size} />
    </div>
  );
};


export function CatchBoundary() {
  return (
    <NotFound />
  );
}

export default Admin;