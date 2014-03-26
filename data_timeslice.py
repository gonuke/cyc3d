#!/usr/bin/env python 
import os
import json
from argparse import ArgumentParser
from datetime import datetime
import time

import numpy as np

from tools import diff_last

def json_at_year(filename, year):
    csv = np.recfromcsv(filename, delimiter=',', filling_values=np.nan, 
                        case_sensitive=True, deletechars='', replace_space=' ')
    data = np.array(csv[csv['year'] == year])
    diff_last(data)
    return [{'name': k, 'size': data[k][0]} for k in data.dtype.names[1:] \
            if data[k][0] > 0]

def main():
    parser = ArgumentParser()
    parser.add_argument('year', type=int)
    parser.add_argument('filenames', nargs="+")
    ns = parser.parse_args()
    j = {'name': "Year {0}".format(ns.year), 'children': []}
    for i, filename in enumerate(ns.filenames, 1):
        j['children'].append({'name': 'Fuel Cycle {0}'.format(i),
                              'children': json_at_year(filename, ns.year),
                              })
    with open('year{0}.json'.format(ns.year), 'w') as f:
        json.dump(j, f)

if __name__ == "__main__":
    main()