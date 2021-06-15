# @vidhill/package-json-editor

Use case:
When using Github's [template repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-template-repository) feature for JS projects

The `package.json` will need to be updated with new `name`, `description`, `version` etc.

This package is intended to be run as a cli tool via `npx`

## Usage

```bash
$ npx @vidhill/package-json-editor
```

You will be prompted to answer a number of questions, similar to those when running `npm init`, plus a few extra questions.
