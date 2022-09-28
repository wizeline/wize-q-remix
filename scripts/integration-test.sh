#!/bin/sh

npx prisma migrate dev
npx jest --watchAll --testPathPattern=tests/integration
