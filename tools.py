import numpy as np

def diff_last(arr):
    """Takes the difference of the last column only, inplace."""
    subtot = np.array(arr[arr.dtype.names[1]])
    for k in arr.dtype.names[2:-1]:
        subtot += arr[k]
    arr[arr.dtype.names[-1]] -= subtot

# USD per tonne
COSTS = {
    "Wet Storage": 457871.820334581,
    "Dry Storage": 245664.9606599954,
    "Interim Storage": 200*1e3,
    "Repository": 650000.0,
    #"Total Used Fuel": 245664.9606599954,
    }

def cost_val(arr):
    dt = np.dtype(arr.dtype.descr[:-1])
    brr = np.empty(len(arr), dtype=dt)
    brr['year'] = arr['year']
    for k in arr.dtype.names[1:-1]:
        brr[k] = arr[k] * COSTS[k] / 1e6
    return brr