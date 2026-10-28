# Avrea upload artifact

Enable artifact storage for your organization before using this action.

Upload workflow artifacts to Avrea storage from an Avrea runner:

```yaml
- uses: avrea-com/upload-artifact@v1
  with:
    name: build-output
    path: build/
```

Inputs follow [actions/upload-artifact v7.0.2](https://github.com/actions/upload-artifact/tree/v7.0.2).
`upload-concurrency` and `download-concurrency` default to 8 and 32.
Uploads use at most 32 workers and 512 MiB of transfer buffers; requested
concurrency is an upper bound.

Artifacts appear in Avrea's console and API. They do not appear in GitHub's
artifact list. `artifact-id` is an Avrea `art-` ID; `artifact-url` opens the
Avrea console and requires authentication. `artifact-digest` is the SHA-256
digest of the uploaded bytes.

Retention defaults to 90 days. Values above 90 are clamped with a warning;
0 selects the organization default. An artifact
budget warning does not stop an upload. Other upload errors fail the step.

For large, already compressed files, set `compression-level: 0` or `1` to
reduce compression time. `archive: false` uploads one file as-is and uses
its basename as the artifact name. Hidden files are excluded unless
`include-hidden-files: true` is set. Source symlinks are dereferenced; ZIP
entries contain regular file contents and preserve source permissions.
Selection is limited to 100,000 files and 16 MiB of path names per upload.

Native Avrea CI mounts the actions binary read-only into Linux job containers
and Docker actions. For GitHub Actions container jobs on Avrea runners, add a
read-only mount of `/opt/avrea/bin` at the same path, or mount the binary and
set `AVREA_ACTIONS_BIN` to its container path.

This action requires the preinstalled Avrea runner binary and an updated
Avrea host. It does not work on GitHub-hosted runners and does not download
a binary. The native binary and its source are maintained in Avrea's
private repository. Only the manifests, invocation shims, documentation and
their MIT license are public.
