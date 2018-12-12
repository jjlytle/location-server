#!/bin/bash

while IFS='' read -r line || [[ -n "$line" ]]; do
	echo "$line" > test.csv
	sleep 1;
done < "$1"
