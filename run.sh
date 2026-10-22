#!/bin/sh
set -eu

cd "$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
export PATH="$PWD/bin:/opt/homebrew/opt/ruby/bin:/opt/homebrew/lib/ruby/gems/4.0.0/bin:$PATH"

# Old user-installed Jupyter scripts can point to a removed Xcode Python.
# Invoke nbconvert through an interpreter that actually has it installed.
if [ -n "${JUPYTER_PYTHON:-}" ]; then
  if ! "$JUPYTER_PYTHON" -c 'import nbconvert' >/dev/null 2>&1; then
    printf '%s\n' "JUPYTER_PYTHON cannot run nbconvert: $JUPYTER_PYTHON" >&2
    exit 1
  fi
else
  for candidate in python3 /usr/bin/python3 /Library/Developer/CommandLineTools/usr/bin/python3; do
    if "$candidate" -c 'import nbconvert' >/dev/null 2>&1; then
      JUPYTER_PYTHON=$("$candidate" -c 'import sys; print(sys.executable)')
      break
    fi
  done
  if [ -z "${JUPYTER_PYTHON:-}" ]; then
    printf '%s\n' "No Python with nbconvert found. Install requirements.txt in a Python environment, then run: JUPYTER_PYTHON=/path/to/python sh run.sh" >&2
    exit 1
  fi
fi
export JUPYTER_PYTHON
printf 'Notebook converter Python: %s\n' "$JUPYTER_PYTHON"

bundle check || bundle install
if [ "$#" -eq 0 ]; then
  set -- serve
fi
exec bundle exec jekyll "$@"
