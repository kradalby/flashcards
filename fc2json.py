#!/usr/bin/env python
'''
File: fc2json.py
Author: Kristoffer Dalby
Description: Tiny script for converting flashcard format to json.
'''

import sys, json

file = sys.argv[1]
subject = file.split('.')[0]

data = {
    "subject": subject, 
    "cards": {}
}

fc = [line.split(':') for line in open(file, 'r').read().splitlines()]
js = open(subject + ".json", 'w')

for line in fc:
    data["cards"][line[0]] = line[1]

js.write(json.dumps(data))

js.close()



