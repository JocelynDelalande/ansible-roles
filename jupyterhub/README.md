JupyterHub deployment to learn programming with JS
==================================================

- Deploy JupyterHub
- Deploy IJavasScript kernel to allow JS notebooks
- Tweak IJavaScript config to add `prompt()` and `alert()` synchronous
  functions
- Set up a locale (translation)

*see also: jupyter*

## Security warning

Be conscious that JupyterHub gives a remote (unprivilleged) shell access to
logged-in users, and that this implementation is not using docker isolation.

## Performance warning

JupyterHub can be quite intensive on resources, by experience, a group of 10
people toying with a few notebooks will quickly require 2G RAM dedicated to
Jupyter. If you experience killed notebooks or notebooks refusing to start as
more users connect, you should give a look at RAM usage and consider adding
more.

Variables
---------

### Optional (interface language)

Use both or use none, note that you have to use one of
jupyter
[supported languages](https://github.com/JocelynDelalande/notebook/blob/jd-french-i18n/notebook/i18n/nbjs.json#L3-L6). Left
those settings unchanged to use plain old English.

- *jupyterhub_locale* : a unix locale (ex: `fr_FR`)
- *jupyterhub_system_locale* : a unix locale with charset indication (ex: `fr_FR.utf8`)
