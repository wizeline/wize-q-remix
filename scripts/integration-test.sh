#!/bin/sh

npx prisma migrate dev
npx jest --runInBand --testPathPattern=tests/integration/*
