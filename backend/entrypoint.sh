#! /bin/sh
set -e

# Remove a potentially pre-existing server.pid for Rails
rm -f /myapp/tmp/pids/server.pid

# Passing command arguments
exec "$@"
