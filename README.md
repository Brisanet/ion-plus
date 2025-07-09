<img src="projects/ion/src/stories/assets/capa.svg">

### Ion Plus

<a href="https://codeclimate.com/github/Brisanet/ion-plus/maintainability"><img src="https://api.codeclimate.com/v1/badges/193c2285550e3150ca4c/maintainability" /></a>
<a href="https://codeclimate.com/github/Brisanet/ion-plus/test_coverage"><img src="https://api.codeclimate.com/v1/badges/193c2285550e3150ca4c/test_coverage" /></a>

This project is a version of the [Ion](https://github.com/Brisanet/ion) with an updated Angular (v18.0.2).

To run this project, you will need to use [Node v20.11.1](https://nodejs.org/en/)

## Install in your project

```
npm i @brisanet/ion-plus
```

## Install and run project

To run this project, You will need to use [Node v20.11.1](https://nodejs.org/en/)

- Run `git clone https://github.com/Brisanet/ion-plus.git` to get a copy of the repository;
- Run `yarn install` to install all dependencies for the project;
- Run `yarn run storybook` to open the storybook in your localhost.

## Install, Configure and Use Prettier

Configure Prettier Extension by Vscode

- Install Prettier - Code formatter extension;
- Go to `Settings(JSON)` ;
- Set `"editor.formatOnSave"` true;
- Set `"prettier.eslintIntegration"` true.

## Commit pattern

Commits should follow the [convention](https://conventionalcommits.org/).
We have the following types:

- feat: A new feature;
- fix: A bug fix;
- docs: Documentation only changes;
- style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc);
- refactor: A code change that neither fixes a bug nor adds a feature;
- test: Adding missing tests or correcting existing ones;
- chore: Changes to the build process or auxiliary tools and libraries such as documentation generation;
- perf: A code that improves performance;
- ci: Changes to the CI/CD process;
- build: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm);
- temp: Temporary commits that won't be included in your CHANGELOG.

Example: `feat: add feature #issue_id`

## Deploy 🚀

<a href="https://main--65b90016a3e44767de916261.chromatic.com/"> Storybook </a>
