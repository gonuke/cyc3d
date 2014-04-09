cyc3d
=====

Cyclus Visualization Experiments

Generate data sets with the following commands:

**Infographic Static Waste:**

.. code-bloc:: bash

    $ ./data_timeslice.py -k waste raw-data-run1.csv 2000 2050 2100 && \
      ./data_timeslice.py -k waste raw-data-run3.csv 2000 2050 2100 && \
      ./data_timeslice.py -k waste raw-data-run5.csv 2000 2050 2100 

**Infographic Static Cost:**

.. code-bloc:: bash

    $ ./data_timeslice.py -k cost raw-data-run1.csv 2000 2050 2100 && \
      ./data_timeslice.py -k cost raw-data-run3.csv 2000 2050 2100 && \
      ./data_timeslice.py -k cost raw-data-run5.csv 2000 2050 2100