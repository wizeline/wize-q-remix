#!/bin/sh

echo "\nSyncing email templates..."
cp -r app/utils/backend/emails/templates build
echo "Finished sync\n"