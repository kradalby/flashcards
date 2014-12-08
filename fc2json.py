#!/usr/bin/env python

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



