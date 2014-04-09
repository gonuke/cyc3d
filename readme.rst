cyc3d
=====

Cyclus Visualization Experiments

Generate data sets with the following commands:

**Chart Waste:**

.. code-block:: bash

    $ ./data_to_json.py -k waste raw-data-run1.csv && \
      ./data_to_json.py -k waste raw-data-run3.csv && 
      ./data_to_json.py -k waste raw-data-run5.csv

**Chart Cost:**

.. code-block:: bash

    $ ./data_to_json.py -k cost raw-data-run1.csv && \
      ./data_to_json.py -k cost raw-data-run3.csv && 
      ./data_to_json.py -k cost raw-data-run5.csv

**Infographic Static Waste:**

.. code-block:: bash

    $ ./data_timeslice.py -k waste raw-data-run1.csv 2000 2050 2100 && \
      ./data_timeslice.py -k waste raw-data-run3.csv 2000 2050 2100 && \
      ./data_timeslice.py -k waste raw-data-run5.csv 2000 2050 2100 

**Infographic Static Cost:**

.. code-block:: bash

    $ ./data_timeslice.py -k cost raw-data-run1.csv 2000 2050 2100 && \
      ./data_timeslice.py -k cost raw-data-run3.csv 2000 2050 2100 && \
      ./data_timeslice.py -k cost raw-data-run5.csv 2000 2050 2100

**Infographic Dynamic Waste:**

.. code-block:: bash

    $ ./data_alltimes.py -k waste raw-data-run1.csv && \
      ./data_alltimes.py -k waste raw-data-run3.csv && \
      ./data_alltimes.py -k waste raw-data-run5.csv

**Infographic Dynamic Cost:**

.. code-block:: bash

    $ ./data_alltimes.py -k cost raw-data-run1.csv && \
      ./data_alltimes.py -k cost raw-data-run3.csv && \
      ./data_alltimes.py -k cost raw-data-run5.csv