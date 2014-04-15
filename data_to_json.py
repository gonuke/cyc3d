#!/usr/bin/env python 
import os
import json
from argparse import ArgumentParser
from datetime import datetime
import time

import numpy as np

from tools import diff_last, cost_val, load_kind

def year_to_ms(y):
    """converts years to milliseconds."""
    x = datetime(y, 1, 1)
    x = time.mktime(x.timetuple()) * 1000
    return int(x)

def main():
    parser = ArgumentParser()
    parser.add_argument('filename')
    parser.add_argument('-k', dest="kind", help="waste or cost or newcost", default="waste")
    ns = parser.parse_args()
    data = load_kind(ns.filename, ns.kind)
    dates = map(year_to_ms, data['year'])
    j = [{"key": k, "values": zip(dates, np.asarray(data[k], 'i8'))} \
         for k in data.dtype.names[1:]]
    jfname = "{0}-{1}.json".format(os.path.splitext(ns.filename)[0], ns.kind)
    with open(jfname, 'w') as f:
        json.dump(j, f)

if __name__ == "__main__":
    main()
