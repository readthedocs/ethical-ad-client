EthicalAd Client
================

A JavaScript client for EthicalAd publishers.

.. image:: https://ethical-ad-client.readthedocs.io/en/latest/_images/example.png

Configuration and Usage
-----------------------

You can find information on using this library on your site, and how to
configure the ad placements, in `our documentation`_

.. _`our documentation`: https://ethical-ad-client.readthedocs.io/en/latest/#usage

Development
-----------

To make changes to the library or it's attached stylesheets, run the local
development server to continually rebuild the assets and serve the test page:

.. code:: prompt

    % npm run dev

You can view the test styleguide page at: http://localhost:8080/

When you are satisfied with changes, make sure to run linting and apply
automatic formatting to the files.

To check which files don't meet linting guidelines run:

.. code:: prompt

    % npm run lint

To automatically apply formatting to the files:

.. code:: prompt

    % npm run format

Finally, create release distribution files -- this will generate the client
libraries in ``dist/``:

.. code:: prompt

    % npm run build

You are now ready to create a pull request with the change. You will need to run
the format and build steps over again on any changes to the library or
stylesheet.
