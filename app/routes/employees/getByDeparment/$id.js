import listEmployees from 'app/controllers/employees/list';
export const loader = async (data) => {
    const { params } = data
    if (params.id == -1){
        return []
    }
    const employess = await listEmployees(params.id);
    return employess;
}

