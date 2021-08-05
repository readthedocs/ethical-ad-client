:orphan:

Releasing
=========

This is the release process for the client itself.

* First update the version in ``package.json`` **and** ``index.js``.
  The versions use `semantic versioning <https://semver.org/>`_.
* Run ``npm install && npm run build``.
  This ensures you have the latest dependencies and you've built
  the latest version of the documentation.
* Run ``npm run changelog`` and update ``CHANGELOG.rst``
  (included by :doc:`/changelog`)
  with the release date and details.
* Commit these changes, create a pull request, and merge it.
* Tag the release:
  
    .. code-block:: bash

        export VERSION=vX.Y.Z
        git checkout main
        git pull origin main
        git tag $VERSION
        git push --tags origin main

* Release the `beta client`_ and purge the client from the CDN.
  A few publishers (notably Read the Docs) use the beta client
  and we can roll it out to verify no breaking changes before pushing this to third-party publishers.
* Release the `release client`_ and purge the CDN.
  After the release, the beta client and release client should be exactly the same.
  
.. note:: In the future we plan to release the client to NPM directly for users, but there is still a lot of churn and we don't want users pinning to old versions quite yet.

.. _beta client: https://media.ethicalads.io/media/client/beta/ethicalads.min.js
.. _release client: https://media.ethicalads.io/media/client/ethicalads.min.js
