# Odyssey Momentum.xyz Bot SDK Example - Finder

This is an example of how to use the [Odyssey Momentum.xyz Bot SDK](https://github.com/momentum-xyz/bot-sdk-nodejs) to create a bot that can connect to Odyssey platform as user/guest.

This particular example is a bot that can find and signal position of objects.

## Prerequisites

For now the packages are only hosted on Github npm package repository.
To use this you need to [authenticate](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry#authenticating-to-github-packages).
Read the Github documentation, create PAT (make sure you include `read:packages` scope!!) and:

```shell
npm login --scope=@momentum-xyz --auth-type=legacy --registry=https://npm.pkg.github.com
```

## Installation

```shell
npm install
```

## How to run

Pass world id and some part of object name as arguments:

```bash
npm start <world_id> <lower_case_object_name>
```

Example:

```bash
npm start "00000000-0000-8000-8000-000000000005" "my object"
```
