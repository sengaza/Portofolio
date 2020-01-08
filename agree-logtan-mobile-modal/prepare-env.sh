#!/usr/bin/env bash

sourceConfigFile=$1
targetConfigFile=$2

if [ ! -f $1 ];
then
    echo "WARNING: Source configuration file cannot be found!"
    exit 1
fi

echo "# Auto generated file, don't modify. Please refer to .env.dev, .env.uat or .env.prod" > $targetConfigFile
echo "" >> $targetConfigFile

cat $sourceConfigFile >> $targetConfigFile
