// import { useNavigate } from 'react-router-dom';

//  import { isAdmin } from '../../../auth';
//  import { onAdminEnter } from '../../../routes/routes_callbacks';
import { useLoaderData } from '@remix-run/react';
import AdminUsersTable from '~/components/AdminUsersTable';
import { listUsers } from '~/controllers/admin';
import * as Styled from '~/styles/Admin.Styled';

export const loader = async ({ request }) => {
  const url = new URL(request.url);
  const currentPage = url.searchParams.get("page") ?? 1;
  const size = url.searchParams.get("size") ?? 10;

  const data = await listUsers({
    page: currentPage,
    search: undefined,
    size: size,
  });
  return {
    ...data,
    currentPage: Number(currentPage),
    size: size,
  };
}

const Admin = () => {
//   useEffect(() => {
//     onAdminEnter();
//   }, []);

//   if (!isAdmin()) {
//     const navigate = useNavigate();
//     navigate('*');
//   }
  const  { users, totalPages, currentPage, size } = useLoaderData();

  return (
    <div>
      <Styled.Container>
        <h2>Admin page</h2>
      </Styled.Container>
      <AdminUsersTable users={users} currentPage={currentPage} totalPages={totalPages} size={size}  />
    </div>
  );
};

export default Admin;