#!/usr/bin/env python 
import os
#import json
import simplejson as json
from argparse import ArgumentParser
from datetime import datetime
import time
from pprint import pprint

import numpy as np

from tools import diff_last, cost_val

def json_at_year(filename, year, kind):
    csv = np.recfromcsv(filename, delimiter=',', filling_values=np.nan, 
                        case_sensitive=True, deletechars='', replace_space=' ')
    data = np.array(csv[csv['year'] == year])
    if kind == "waste":
        diff_last(data)
    elif kind == "cost":
        data = cost_val(data)
    else:
        raise ValueError("kind must be cost or waste")
    return [{'name': k, 'size': data[k][0]} for k in data.dtype.names[1:] \
            if data[k][0] > 0]

def main():
    parser = ArgumentParser()
    parser.add_argument('year', type=int)
    parser.add_argument('filenames', nargs="+")
    parser.add_argument('-k', dest="kind", help="waste or cost", default="waste")
    ns = parser.parse_args()
    j = {'name': "Year {0}".format(ns.year), 'children': []}
    for i, filename in enumerate(ns.filenames, 1):
        j['children'].append({'name': 'Fuel Cycle {0}'.format(i),
                              'children': json_at_year(filename, ns.year, ns.kind),
                              })
    jfname = "year{0}-{1}.json".format(ns.year, ns.kind)
    s = json.dumps(j)
    with open(jfname, 'w') as f:
        f.write(s)

if __name__ == "__main__":
    main()