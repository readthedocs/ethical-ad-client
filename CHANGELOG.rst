CHANGELOG
=========

.. The text for the changelog is generated with ``npm run changelog``
.. Then it is formatted and copied into this file.
.. This is included by docs/changelog.rst


Version v1.17.0
---------------

Minor changes in this release to add some specific keywords

:date: July 31, 2024

 * @davidfischer: Add billing/payments keywords (#205)


Version v1.16.0
---------------

This release contains styling changes to style the destination domain
in the ad which we are adding to have more transparency.

:date: July 17, 2024

 * @davidfischer: Style showing the domain in the ad client (#203)
 * @ericholscher: Rename README (#202)


Version v1.15.0
---------------

This release has a number of minor bugfixes and improves the ability
to control the client's logging.

:date: June 14, 2024

 * @davidfischer: Vertically center the close button (#200)
 * @davidfischer: Fix typo in styles.scss (#199)
 * @davidfischer: Remove unicode char from client (#198)
 * @davidfischer: Increase stickybox z-index (#196)
 * @davidfischer: Update client logging (#195)


Version v1.14.0
---------------

The changes in this release were minor but allow adjusting
the position of the stickybox placement with the `data-ea-placement-bottom`
attribute.

:date: May 16, 2024

 * @davidfischer: Fix the unit tests (#191)
 * @humitos: Use `data-ea-placement-bottom` to set CSS `bottom` property (#190)
 * @ericholscher: Add UA for crawler (#189)
 * @humitos: Ad placement for Read the Docs addons (#188)


Version v1.13.0
---------------

This change lowers the ad rotation threshold
and adds the notes on rotation to the documentation.

:date: February 13, 2024

 * @davidfischer: Lower ad rotation threshold to 30 seconds (#186)


Version v1.12.0
---------------

We made a few tweaks around double-loading the module.
We settled on just raising a warning.

:date: February 6, 2024

 * @davidfischer: Ad client reloading check tweaks (#184)


Version v1.11.0
---------------

The client will not automatically rotate ads very conservatively.
This is primarily for SPAs.
Added a check to prevent double-loading the module.
Also, added a more significant test suite.

:date: December 5, 2023

 * @davidfischer: Prevent double loading the module (#181)
 * @davidfischer: Rotate ads (#180)
 * @agjohnson: Proof of concept for web-test-runner (#179)
 * @davidfischer: WIP: Add a test suite (#178)


Version v1.10.0
---------------

Fixed a bug with ``ethicalads.wait``.
Updated the keywords and added documentation for falling back from
EthicalAds to other networks.

:date: October 24, 2023

 * @davidfischer: Fallback to other ad networks (#176)
 * @davidfischer: Fix promise bug for ethicalads.wait (#175)
 * @davidfischer: Use the same keywords as the server (#174)


Version v1.9.0
--------------

The client will send a placement index for multiple placements
on the same screen.

:date: October 11, 2023

 * @davidfischer: Index -> placement_index (#171)
 * @davidfischer: Include placement number with ad request (#170)
 * @davidfischer: Release update step (#169)


Version v1.8.0
--------------

The main difference in this release is a change to the z-index
in the fixed footer ad. The z-index was a bit low and a higher
one was needed especially on Read the Docs.

:date: August 29, 2023

 * @humitos: FixedFooter: use a bigger `z-index` (#167)
 * @davidfischer: Note that page specific keywords are mostly unnecessary (#163)


Version v1.7.0
--------------

Improved single page app (SPA) support. See the docs for more details.

:date: June 8, 2023

 * @davidfischer: Improved SPA support in the ad client (#161)
 * @davidfischer: Read the Docs docs config (#158)
 * @davidfischer: Use a fancy webm for the stickybox video (#153)
 * @agjohnson: Add basic test suite (#150)
 * @agjohnson: Fork basic circleci configuration here (#149)


Version v1.6.2
--------------

Fix a styling issue that caused the stickybox ad to float on smaller
screen sizes.

:date: September 6, 2022

 * @davidfischer: The stickybox shouldn't float except on ultrawide (#137)


Version v1.6.1
--------------

This release fixed a viewport detection issue that pertained
to styled ads (fixedfooter and stickybox) that cause issues
with views being counted for them.
This release also contained a minor docs fix.

:date: August 29, 2022

 * @davidfischer: Position the outer div for styled ads (#134)
 * @davidfischer: Fix the broken placeholder (#132)
 * @dependabot[bot]: Bump moment from 2.29.1 to 2.29.2 (#108)


Version v1.6.0
--------------

This version added a fixedfooter placement.

:date: July 6, 2022

 * @fshabashev: Fix duplicated keys in the KEYWORDS dictionary (#123)
 * @davidfischer: Add a fixedfooter placement style (#121)


Version v1.5.0
--------------

Publisher house ads (fallback ads) were not enabled by default in the client.
Starting in this release, they are.

:date: June 20, 2022

 * @davidfischer: Make publisher-house ads enabled by default (#119)


Version v1.4.4
--------------

During the rollout of v1.4.3, we noticed that warnings were treated as errors
in some situations due to a poorly documented, browser specific ``window.debug``.
We are just not going to rely on that.

:date: June 9, 2022

 * @davidfischer: Always treat warnings as warnings (#117)


Version v1.4.3
--------------

Fixes a release issue with 1.4.2.

:date: June 9, 2022


Version v1.4.2
---------------

This release just demoted an error raised when there were no ads to show to a warning.

:date: June 9, 2022

 * @davidfischer: Silence the no ads to show warning (#111)
 * @ericholscher: Highlight fallback ads (#109)
 * @dependabot[bot]: Bump url-parse from 1.5.3 to 1.5.7 (#104)
 * @dependabot[bot]: Bump follow-redirects from 1.12.1 to 1.14.7 (#96)
 * @davidfischer: "Placement is configured with invalid parameters" when there's just no ad to show (#26)


Version v1.4.1
---------------

This was a very minor change to a ``z-index`` that could
obscure some content when using the stickybox placement.

:date: January 25, 2022

 * @davidfischer: Decrease the z-index below most modals (#98)
 * @davidfischer: Tweak around releasing versions (#97)


Version v1.4.0
---------------

The big change here is to add custom placements with the ``data-ea-style``
option.

:date: December 3, 2021

 * @davidfischer: Add stickybox floating placement to ad client (#94)
 * @davidfischer: Add MIT License file (#93)
 * @sureshjoshi: Static site support using CSS in lieu of JS (#92)
 * @voxpelli: Add `LICENSE` file to make license more discoverable by eg. GitHub (#89)


Version v1.3.0
---------------

In this change we removed our polyfills to support IE11.
This shrinks the client by about 40%.
We also move to support multiple placements on a page.
This isn't something we're recommending to publishers (and in fact, you won't make more doing this)
but a publisher who is beta testing our sponsorship model is using this feature.

**Note:** Drops support for IE11.

:date: September 2, 2021

 * @davidfischer: Remove polyfills and drop IE11 support (#88)
 * @davidfischer: Support multiple placements on a page (#87)
 * @davidfischer: Use ponyfills instead of polyfills to not change state on others' sites (#62)
 * @karthikdivi: Failing to display Ad in React environments, also crashing the websites (#59)


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
