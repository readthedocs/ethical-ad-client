CHANGELOG
=========

.. The text for the changelog is generated with ``npm run changelog``
.. Then it is formatted and copied into this file.
.. This is included by docs/changelog.rst


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
