import React from 'react';
import { json } from '@remix-run/node';
import { useLoaderData, useSearchParams } from '@remix-run/react';
import { requireAdminAuth } from 'app/session.server';
import * as Styled from 'app/styles/Admin.Styled';
import AdminUsersTable from 'app/components/AdminUsersTable';
import Notifications from 'app/components/Notifications';
import UserSearchBar from 'app/components/UserSearchBar';
import listUsers from 'app/controllers/users/list';
import updateUser from 'app/controllers/users/update';
import NotFound from 'app/routes/$';

export const loader = async ({ request }) => {
  await requireAdminAuth(request);
  const url = new URL(request.url);
  const currentPage = url.searchParams.get('page') ?? 1;
  const size = url.searchParams.get('size') ?? 10;
  const search = url.searchParams.get('search') ?? undefined;

  const data = await listUsers({
    page: currentPage,
    search,
    size,
  });

  return {
    ...data,
    currentPage: Number(currentPage),
    size,
  };
};

export const action = async ({ request }) => {
  const formData = await request.formData();

  const payload = {
    is_admin: !formData.has('is_admin') ? undefined : formData.get('is_admin') === 'on',
    job_title: formData.get('job_title'),
    employee_id: formData.get('employee_id'),
  };

  const result = await updateUser(payload);
  return json(result);
};

function Admin() {
  const {
    users, totalPages, currentPage, size,
  } = useLoaderData();
  const [, setSearchParams] = useSearchParams();

  const onSearch = (search) => {
    setSearchParams({
      search,
    });
  };

  return (
    <div>
      <Notifications />
      <Styled.Container>
        <h2>Admin page</h2>
        <UserSearchBar onSearch={onSearch} />
      </Styled.Container>
      <AdminUsersTable
        users={users}
        currentPage={currentPage}
        totalPages={totalPages}
        size={size}
      />
    </div>
  );
}

export function CatchBoundary() {
  return (
    <NotFound />
  );
}

export default Admin;
