#!/bin/sh

echo "\nSyncing email templates..."
cp -r app/utils/emails/templates build
echo "Finished sync\n"