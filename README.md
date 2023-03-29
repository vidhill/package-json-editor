# @vidhill/package-json-editor

[![CircleCI](https://circleci.com/gh/vidhill/package-json-editor/tree/main.svg?style=svg)](https://circleci.com/gh/vidhill/package-json-editor/tree/main)

[![NPM Version](https://img.shields.io/npm/v/@vidhill/package-json-editor?style=flat-square)](https://www.npmjs.com/package/@vidhill/package-json-editor)

Use case:
When using Github's [template repository](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-on-github/creating-a-template-repository) feature for JS projects

The `package.json` will need to be updated with new `name`, `description`, `version` etc.

This package is intended to be run as a cli tool via `npx`

## Usage

From within the folder containing your `package.json` run  

```bash
$ npx @vidhill/package-json-editor
```

You will be prompted to answer a number of questions, similar to those when running `npm init`  
\- plus a few extra questions.

## Global install method

### Install

```bash
$ npm install -g @vidhill/package-json-editor
```

From within the folder containing your `package.json` run

```bash
$ package-json-editor
```
