#!/usr/bin/env python 
import os
import json
from argparse import ArgumentParser
from datetime import datetime
import time

import numpy as np

from tools import diff_last, cost_val

def year_to_ms(y):
    """converts years to milliseconds."""
    x = datetime(y, 1, 1)
    x = time.mktime(x.timetuple()) * 1000
    return int(x)

def main():
    parser = ArgumentParser()
    parser.add_argument('filename')
    parser.add_argument('-k', dest="kind", help="waste or cost", default="waste")
    ns = parser.parse_args()
    csv = np.recfromcsv(ns.filename, delimiter=',', filling_values=np.nan, 
                        case_sensitive=True, deletechars='', replace_space=' ')
    dates = map(year_to_ms, csv['year'])
    if ns.kind == "waste":
        diff_last(csv)
    elif ns.kind == "cost":
        csv = cost_val(csv)
    else:
        raise ValueError("kind must be cost or waste")
    j = [{"key": k, "values": zip(dates, np.asarray(csv[k], 'f8'))} \
         for k in csv.dtype.names[1:]]
    jfname = "{0}-{1}.json".format(os.path.splitext(ns.filename)[0], ns.kind)
    with open(jfname, 'w') as f:
        json.dump(j, f)

if __name__ == "__main__":
    main()