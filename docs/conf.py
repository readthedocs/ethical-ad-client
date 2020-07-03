# -*- coding: utf-8 -*-

import sys
import os
import re
import json
from pathlib import Path

from docutils.parsers.rst import Directive
from docutils import nodes

path_pkg_config = Path('../package.json');
pkg_config = json.load(path_pkg_config.open())

project = pkg_config.get('description')
slug = pkg_config.get('name')
version = pkg_config.get('version')
release = version
author = pkg_config.get('author')
copyright = author
language = 'en'

extensions = [
    'sphinx_rtd_theme',
]

templates_path = ['_templates']
source_suffix = '.rst'
exclude_patterns = [
    '.ropeproject/',
    '_build',
    'conf.py~',
]
locale_dirs = ['locale/']
gettext_compact = False

master_doc = 'index'
pygments_style = 'default'

html_theme = 'sphinx_rtd_theme'
html_theme_options = {}
html_static_path = ['_static']
html_context = {}
html_js_files = [
    'ethicalads.js',
]
html_css_files = [
    'docs.css',
]
html_show_sourcelink = True

htmlhelp_basename = slug

latex_documents = [
  ('index', '{0}.tex'.format(slug), project, author, 'manual'),
]

man_pages = [
    ('index', slug, project, [author], 1)
]

texinfo_documents = [
  ('index', slug, project, author, slug, project, 'Miscellaneous'),
]


class ExampleDirective(Directive):

    templates = {
        'image': """
<div class="loaded {classes}" data-ea-type="image">
  <div class="ea-content">
    <a href="#" rel="nofollow" target="_blank">
      <img src="https://via.placeholder.com/240x180.png" />
    </a>
    <div class="ea-text">
      <a href="#" rel="nofollow" target="_blank">
        <strong>EthicalAds</strong> is a developer-focused, privacy-obsessed ad
        network from the fine folks at Read the Docs
      </a>
    </div>
  </div>
  <div class="ea-callout">
    <a href="https://ethicalads.io/">Ad by EthicalAds</a>
  </div>
</div>
        """,
        'text': """
<div class="loaded {classes}" data-ea-type="text">
  <div class="ea-content">
    <div class="ea-text">
      <a href="#" rel="nofollow" target="_blank">
        <strong>EthicalAds</strong> is a developer-focused, privacy-obsessed ad
        network from the fine folks at Read the Docs
      </a>
    </div>
  </div>
  <div class="ea-callout">
    <a href="https://ethicalads.io/">Ad by EthicalAds</a>
  </div>
</div>
        """,
    }

    required_arguments = 0
    optional_arguments = 0
    final_argument_whitespace = True
    option_spec = {
        'classes': str,
        'ad_type': str,
    }
    has_content = True

    def run(self):
        ad_type = self.options.get('ad_type', 'image')
        attributes = {
            "classes": self.options.get('classes', 'raised'),
            "ad_type": ad_type,
        }
        text = self.templates.get(ad_type, "").format(**attributes)
        node = nodes.raw('', text, format='html')
        (node.source, node.line) = self.state_machine.get_source_and_line(self.lineno)
        return [node]


def setup(app):
    app.add_directive('example', ExampleDirective)
