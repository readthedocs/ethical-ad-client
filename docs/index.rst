.. All the top-level TOC items are at the H1 level to make the sidebar show them all..
.. I tried with `collapse_navigation` set to False, but it didn't solve anything

EthicalAds Client
-----------------

This is the client library used to add an ad placement from EthicalAds_ to your
site. To get started, you will need to first :ref:`become a publisher <signup>`,
and then you can :ref:`configure your site <Configuration>`.

.. image:: img/example.png
    :align: center

Usage
-----

There are two pieces required to add an ad placement to your site. You will need
to create an empty ``<div>`` element where you would like to place a new ad
placement, and you will need to include the client library.

To start, add the following in your site's ``<head>``:

.. code:: html

    <script async src="https://media.ethicalads.io/media/client/ethicalads.min.js"></script>

To add the placement on your site, you will need to add an empty ``<div>`` with
some added data attributes to configure the ad placement:

.. code:: html

    <div data-ea-publisher="..." data-ea-type="text"></div>

.. _configuration:

Configuration
-------------

The following data attributes are supported on the ad placement element:

``data-ea-publisher``
    **(Required)** The EthicalAds publisher id for your account.

``data-ea-type``
    The ad placement type. This value can be either ``image`` or ``text`` -- the
    default is ``image``.

``id`` (optional)
    A placement identifier. If you define an ``id`` and :ref:`enable placements reporting <placements>`,
    this will allow you to see reports for each ``id``.

``data-ea-keywords`` (optional)
    A pipe (``|``) separated array of keywords for this ad placement.
    This is page-specific (not publisher-specific) keywords related to where the ad is shown.

``data-ea-campaign-types`` (optional)
    A pipe (``|``) separated array of campaign types ("paid", "publisher-house", "community", "house").
    This can only further reduce campaign types, not allow ones prohibited for the publisher.
    This is useful when you want certain users to not get certain types of ads.

``data-ea-manual`` (optional)
    Set to ``true`` if you want to :ref:`manually load ads <load manually>` at a specific future time for your app.
    This is useful if you want to conditionally load advertising for some users but not others
    or only load advertising when specific actions are performed.

``data-ea-force-ad`` (optional)
    This parameter can be used to test the ad client on a specific ad.
    When used, any impressions will not be counted for billing purposes.

``data-ea-force-campaign`` (optional)
    This parameter can be used to test the ad client on a specific campaign (group of ads).
    When used, any impressions will not be counted for billing purposes.


Themes
------

The following themes are available on all ad placement types:

.. container:: row

    .. container:: left

        **Raised theme**

        This is the default theme used if you do not specify a theme.

        .. code:: html

            <div data-ea-publisher="..."></div>

        Or you can also explicitly use the theme name:

        .. code:: html

            <div class="raised" data-ea-publisher="..."></div>


    .. container:: right

        .. example::
            :ad_type: image
            :classes: raised

.. container:: row

    .. container:: left

        **Flat theme**

        .. code:: html

            <div class="flat" data-ea-publisher="..."></div>

    .. container:: right

        .. example::
            :ad_type: image
            :classes: flat

.. container:: row

    .. container:: left

        **Bordered theme**

        .. code:: html

            <div class="bordered" data-ea-publisher="..."></div>

    .. container:: right

        .. example::
            :ad_type: image
            :classes: bordered

Dark mode
~~~~~~~~~

There are also dark variants for all of the themes. The dark variants can be
used with the ``dark`` class:

.. code:: html

    <div class="dark raised" data-ea-publisher="..."></div>

.. container:: row dark

    .. container:: column

        .. example::
            :ad_type: image
            :classes: dark raised

    .. container:: column

        .. example::
            :ad_type: image
            :classes: dark flat

    .. container:: column

        .. example::
            :ad_type: image
            :classes: dark bordered

If your site varies based on the user's color scheme (using ``prefers-color-scheme``),
set the ``adaptive`` class:

.. code:: html

    <div class="adaptive raised" data-ea-publisher="..."></div>

.. container:: row adaptive

    .. container:: column

        .. example::
            :ad_type: image
            :classes: adaptive raised

    .. container:: column

        .. example::
            :ad_type: image
            :classes: adaptive bordered


Ad Types
--------

Image placement
~~~~~~~~~~~~~~~

The image ad placement type has two variants: horizontal and veritcal. Vertical
image placements are the default ad type. To use the horizontal variant, use

Vertical image
``````````````

.. code:: html

    <div data-ea-publisher="..." data-ea-type="image"></div>


.. container:: row

    .. container:: column

        .. example::
            :ad_type: image
            :classes: raised

    .. container:: dark column

        .. example::
            :ad_type: image
            :classes: dark raised


Horizontal image
````````````````

This variant can be used with the ``horizontal`` theme variant class:

.. code:: html

    <div class="horizontal" data-ea-publisher="..." data-ea-type="image"></div>

.. container:: row

    .. container:: column

        .. example::
            :ad_type: image
            :classes: horizontal raised

    .. container:: dark column

        .. example::
            :ad_type: image
            :classes: dark horizontal raised

Text placement
~~~~~~~~~~~~~~

Text placements can be defined using ``data-ea-type="text"``:

.. code:: html

    <div data-ea-publisher="..." data-ea-type="text"></div>

.. example::
    :ad_type: text
    :classes: raised

.. container:: row dark

    .. example::
        :ad_type: text
        :classes: dark raised


.. _placement-styles:

Placement style
---------------

Placement styles are helpers to help integrate our ads into your site.
They are completely optional but they can help you get started with a common pattern
without writing custom JavaScript or CSS.


StickyBox
~~~~~~~~~

.. versionadded:: 1.4

The "StickyBox" style is a floating placement in the lower right corner on very wide screens
(>1300px wide) and a static placement on smaller screens.
By floating, it ensures that the ad is always seen
(and therefore results in billed views that make the publisher money).
On mobile or smaller screens, the ad will just be a static placement wherever the
ad ``<div>`` is in the DOM.

Using our StickyBox style:

.. code:: html

   <div data-ea-publisher="..." data-ea-type="image" data-ea-style="stickybox"></div>



.. raw:: html

   <img src="_static/stickybox.gif" width="100%">


.. _placements:

Ad placement reporting
----------------------

EthicalAds allows you to track all the different ad placements that you have on your site.
This means that if you have an ad on your homepage template,
blog listing template,
and blog post template you can track them all seperately.

This is enabled by adding an ``id`` to the EthicalAds ``div`` on your site:

.. code:: html

    <div data-ea-publisher="..." id="blog-sidebar"></div>

This feature is disabled by default,
you can go to :guilabel:`Settings > Record placements` to enable this feature.

.. tip:: We recommend that you provide an ``id`` for each of your different ad placements.
         This will enable you to track the performance of each placement,
         and make adjustments that increase your :abbr:`CTR (click-through rate)`.

Page-specific keywords
----------------------

EthicalAds allows our advertisers to target ads based on the content of pages.
This provides value for everyone, giving users more relevent ads while still respecting their privacy.

Publishers can set page-specific keywords dynamically on each page of their site based on the content of the pages.
For example, if you have a blog post about Kubernetes, you could set tags of `devops` and `kubernetes`.

This is enabled by adding an ``data-ea-keywords`` to the EthicalAds ``div`` on your site.
They are ``|``-seperated, so you can include multiple for a single page.

.. code:: html

    <div data-ea-publisher="..." data-ea-keywords="devops|kubernetes"></div>

Customization
-------------

It's possible to extend the ad client, even if you are loading the client in
your browser through a request. After loading the script, there will be an
``ethicalads`` global/window instance that can be used to extend the ad client
interface.

The easiest place to extend is the ``ethicalads.wait`` promise instance. This
resolves to an array of placements that were successfully configured -- if no
placements were loaded successfully, this will be an empty array.

The ``ethicalads`` object needs to be instantiated first. If you aren't loading
the ad client library asynchronously, you can delay execution by loading your
additional script after loading the ad client.

If you are loading the ad client library asynchronously, you should wait for a
document ready event. For example, using jQuery:

.. code:: javascript

    $(document).ready(() => {
      ethicalads.wait.then((placements) => {
        console.log('Ads are loaded');
      });
    });

Showing content when there isn't an ad
--------------------------------------

The biggest use-case is to show backup content when we don't have an ad to show.
Many of our publishers prefer to serve EthicalAds,
but while we're still building the network we might not have a 100% fill rate.

You can show backup content with a code snippet like this:

.. code:: html

  <script src="https://media.ethicalads.io/media/client/ethicalads.min.js"></script>
  <script>
  ethicalads.wait.then((placements) => {
    if (!placements.length) {
      console.debug('Loading backup content');
      div = document.querySelector('[data-ea-publisher]')
      div.innerHTML = '<p>Check out our first-party ad content.</p>'
    } else {
      console.debug('EthicalAds are loaded');
    }
  });
  </script>

.. warning:: You need to have ``Allow house campaigns`` disabled in the ads dashboard, otherwise we will always return a house ad. Go to :guilabel:`Settings > Control advertiser campaign types` to disable it.


.. _load manually:

Manually loading ads
--------------------

You can precisely determine when an ad will be loaded by setting the ``data-ea-manual`` attribute to ``true``.
This is useful if you want to conditionally show advertising or only show advertising when specific actions occur.

.. code:: html

    <div data-ea-publisher="..." data-ea-manual="true"></div>
    <script>
    $(document).ready(() => {
      ethicalads.load();
    });
    </script>


.. _signup:

Becoming a Publisher
--------------------

Visit `EthicalAds`_ to apply to be a publisher.

.. _`EthicalAds`: https://ethicalads.io


Developing
----------

This section is for developers of the client itself.
Development occurs on `GitHub <https://github.com/readthedocs/ethical-ad-client>`_.

* `Issues <https://github.com/readthedocs/ethical-ad-client/issues>`_
* `Pull requests <https://github.com/readthedocs/ethical-ad-client/pulls>`_
* :doc:`Releasing </releasing>`
* :doc:`Changelog </changelog>`
