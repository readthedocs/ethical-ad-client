EthicalAds Client
=================

This is the client library used to add an ad placement from EthicalAds_ to your
site. To get started, you will need to first :ref:`become a publisher <signup>`,
and then you can :ref:`configure your site <Configuration>`.

.. image:: img/example.png
    :align: center

Usage
=====

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
=============

The following data attributes are supported on the ad placement element:

``data-ea-publisher``
    **(Required)** The EthicalAds publisher id for your account.

``data-ea-type``
    The ad placement type. This value can be either ``image`` or ``text`` -- the
    default is ``image``.

Themes
======

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

            <div class="borderd" data-ea-publisher="..."></div>

    .. container:: right

        .. example::
            :ad_type: image
            :classes: bordered

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

Ad Types
========

Image placement
---------------

The image ad placement type has two variants: horizontal and veritcal. Vertical
image placements are the default ad type. To use the horizontal variant, use

**Vertical image**

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


**Horizontal image**

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
--------------

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

.. _signup:

Customization
=============

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

Handling errors
---------------

If there are any errors while loading EthicalAds ad placements, the promise
``ethicalads.wait`` will eventually resolve to an empty array.

.. code:: javascript

    ethicalads.wait.catch((placements) => {
      if (!placements.length) {
        console.log('Ads were not able to load');
      }
    });

Becoming a Publisher
====================

Visit `EthicalAds`_ to apply to be a publisher.

.. _`EthicalAds`: https://ethicalads.io
