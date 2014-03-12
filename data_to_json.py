#!/usr/bin/env python 
import os
import json
from argparse import ArgumentParser
from datetime import datetime
import time

import numpy as np

def year_to_ms(y):
    """converts years to milliseconds."""
    x = datetime(y, 1, 1)
    x = time.mktime(x.timetuple()) * 1000
    return int(x)


def main():
    parser = ArgumentParser()
    parser.add_argument('filename')
    ns = parser.parse_args()
    csv = np.recfromcsv(ns.filename, delimiter=',', filling_values=np.nan, 
                        case_sensitive=True, deletechars='', replace_space=' ')
    dates = map(year_to_ms, csv['year'])
    subtot = np.array(csv[csv.dtype.names[1]])
    for k in csv.dtype.names[2:-1]:
        subtot += csv[k]
    csv[csv.dtype.names[-1]] -= subtot
    j = [{"key": k, "values": zip(dates, np.asarray(csv[k], 'f8'))} \
         for k in csv.dtype.names[1:]]
    with open(os.path.splitext(ns.filename)[0] + '.json', 'w') as f:
        json.dump(j, f)

if __name__ == "__main__":
    main()