CHANGELOG
=========

.. The text for the changelog is generated with ``npm run changelog``
.. Then it is formatted and copied into this file.
.. This is included by docs/changelog.rst


Version v1.2.0
---------------

Move the view time endpoint to a separate endpoint
sent from the server.

:date: August 13, 2021

 * @davidfischer: Use a separate view time endpoint (#85)
 * @dependabot[bot]: Bump url-parse from 1.5.1 to 1.5.3 (#84)
 * @davidfischer: Document the versioning process of the client (#83)
 * @dependabot[bot]: Bump path-parse from 1.0.6 to 1.0.7 (#82)


Version v1.1.1
---------------

There was a minor fix to new code that sends the amount of time an ad was viewed.

:date: August 5, 2021

 * @davidfischer: Remove the view time listener after sending (#80)


Version v1.1.0
---------------

The major changes in this release were to send the client version with the ad request.
In the future, we will begin warning users if their ad client is very out of date.
The other major change was to send the amount of time an ad was viewed
when the browser/page/tab loses focus or is closed.
This is an important advertiser metric and we believe that we may be able to charge
advertisers additional rates for high view time placements.

:date: August 5, 2021

 * @davidfischer: Allowing forcing a specific ad campaign (#77)
 * @davidfischer: Send the ad view time to the server (#76)
 * @h-enk: Links to cross-origin destinations are unsafe (#75)
 * @davidfischer: Add some additional targeting keywords (#74)
 * @davidfischer: Pins needed after installing and verifying dependency updates (#73)
 * @davidfischer: Include client version in ad decision (#71)
