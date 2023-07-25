tables=("admins" "answers" "comments" "commentvote" "departments" "draftanswers" "employees" "employeesdepartments" "locations" "nps" "questions" "questiontags" "sentiments" "sequelizemeta" "tags" "users" "votes" _prisma_migrations ) 
for table in ${!tables[@]}
do
docker-compose exec postgres pg_dump  -t ${tables[$table]} -h localhost -p 5432 -U postgres -d wizeqprod >> "migrations/tables/wizeQ_${tables[$table]}.sql"
echo ${tables[$table]};
done
