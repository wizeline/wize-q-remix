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
import DefaultTabs from 'app/components/Tab/DefaultTabs';
import AdminDepartments from 'app/components/AdminDepartments';
import listDepartments from 'app/controllers/departments/list';
import ACTIONS from 'app/utils/actions';
import updateDepartement from 'app/controllers/departments/update';
import addEmployeeToDepartment from 'app/controllers/employees/add';
import removeEmployeeToDepartment from 'app/controllers/employees/delete';
import AdminTags from 'app/components/AdminTags';
import listTags from 'app/controllers/comments/tags/list';
import createTag from 'app/controllers/comments/tags/create';
import { taggingComments } from 'app/config/flags.json';

export const loader = async ({ request }) => {
  await requireAdminAuth(request);
  const url = new URL(request.url);
  const currentPage = url.searchParams.get('page') ?? 1;
  const size = url.searchParams.get('size') ?? 10;
  const search = url.searchParams.get('search') ?? undefined;
  const tabActive = url.searchParams.get('tab') ?? undefined;

  const data = await listUsers({
    page: currentPage,
    search,
    size,
  });

  const { departments, totalPages: totalPagesDepartment } = await listDepartments({
    page: currentPage,
    search,
    size,
    active: undefined,
    allPages: false,
  });

  const { tags, totalPages: totalPagesTags } = await listTags({
    searchTerm: search,
    page: currentPage,
    limit: size,
  });

  return {
    ...data,
    currentPage: Number(currentPage),
    size,
    departments,
    totalPagesDepartment,
    tabActive,
    tags,
    totalPagesTags,
  };
};

export const action = async ({ request }) => {
  const formData = await request.formData();
  const actions = formData.get('action');
  let result;
  let values;
  switch (actions) {
    case ACTIONS.UPDATE_USER:
      const payload = {
        is_admin: !formData.has('is_admin') ? undefined : formData.get('is_admin') === 'on',
        job_title: formData.get('job_title'),
        employee_id: formData.get('employee_id'),
      };
      result = await updateUser(payload);
      break;
    case ACTIONS.UPDATE_DEPARTMENT:
      result = await updateDepartement(
        {
          department_id: parseInt(formData.get('department_id'), 10),
          name: formData.get('name'),
          is_active: formData.get('is_active') === 'true',
          ManagerDepartmet: JSON.parse(formData.get('ManagerDepartmet')),
          SubstituteManager: JSON.parse(formData.get('AlternateManager')),
        },
      );
      break;
    case ACTIONS.ADD_EMPLOYEE_TO_DEPARTMENT:
      values = JSON.parse(formData.get('values'));
      result = await addEmployeeToDepartment(values);
      break;
    case ACTIONS.REMOVE_EMPLOYEE_TO_DEPARTMENT:
      values = JSON.parse(formData.get('values'));
      result = await removeEmployeeToDepartment(values);
      break;
    case ACTIONS.CREATE_TAG:
      values = formData.get('tagText');
      result = await createTag({ tagText: values });
      break;
    default:
      break;
  }
  return json(result);
};

function Admin() {
  const {
    users,
    totalPages,
    currentPage,
    size,
    departments,
    totalPagesDepartment,
    tabActive,
    tags,
    totalPagesTags,
  } = useLoaderData();
  const [, setSearchParams] = useSearchParams();

  const renderTableAdmins = () => (
    <AdminUsersTable
      users={users}
      currentPage={currentPage}
      totalPages={totalPages}
      size={size}
    />
  );

  const renderDepartments = () => (
    <AdminDepartments
      departments={departments}
      currentPage={currentPage}
      totalPages={totalPagesDepartment}
      size={size}
    />
  );

  const renderTags = () => (
    <AdminTags
      tags={tags}
      currentPage={currentPage}
      totalPages={totalPagesTags}
      size={size}
    />
  );

  const Tabs = [
    {
      id: 'Roles',
      element: renderTableAdmins(),
    },
    {
      id: 'Departments',
      element: renderDepartments(),
    },
    taggingComments && {
      id: 'Tags',
      element: renderTags(),
    },
  ];
  const onSelectHandler = (key) => {
    setSearchParams({ tab: key });
  };

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
      <DefaultTabs
        activeTab={tabActive === undefined ? Tabs[0].id : tabActive}
        TabsElements={Tabs}
        onSelect={onSelectHandler}
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
