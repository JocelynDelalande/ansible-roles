Jupyter − Installs standalone jupyter server
============================================

Installs a [Jupyter](http://jupyter.org/) notebook server. Note that this **is
not**  a *jupyterhub* server (which handles fine auth/authz and security) ; so in terms of multi-user,
this is a bit raw.

Variables
---------

### Optional

- `jupyter_access_token`: the hardcoded password to protect jupyter instance
  (if unspecified, random and appearing in the logs).
