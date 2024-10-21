Setup

# Setup of code quality tools for angular

Open a terminal in your projects root directory.

1. Add ESLint to Your Angular Application
   ESLint is a static code analysis tool that helps identify potential errors and maintain code consistency.

```bash
ng add @angular-eslint/schematics
```

2. Install and Configure Prettier
   Prettier is a code formatter that automatically formats your code according to defined style rules.
   Install Prettier as a development dependency:

```bash
npm install prettier --save-dev
```

Add the following script to your package.json to format the code within the src/app folder:

```json
"scripts": {
 "format": "npx prettier --write ./src/app/*"
}
Make sure to not overwrite the existing scripts.
```

3. Generate Environments for Angular
   Environments in Angular are used to define different configuration options for various environments (e.g., development, production).
   Generate the environment configuration files:

```bash
ng generate environment
```

For more information, refer to the official documentation: [Angular Build Guide](https://v17.angular.io/guide/build) 4. Set Up Commitlint
Commitlint ensures that your commit messages follow a conventional format.
Install Commitlint and the conventional configuration globally:

```bash
npm install @commitlint/cli @commitlint/config-conventional
```

Add the following configuration to your package.json:

```json
"commitlint": {
 "extends": [
   "@commitlint/config-conventional"
 ]
}
```

5. Set Up lint-staged
   lint-staged allows you to apply linters and formatting tools only to changed files, speeding up the commit process.
   Install lint-staged as a development dependency:

```bash
npm install --save-dev lint-staged
```

Add the following configuration to your package.json:

```json
"lint-staged": {
 "*.{ts,js,html}": "eslint --cache --fix",
 "*.{ts,js,html,css,scss,less,md}": "prettier --write"
}
```

For more information, see [lint-staged](https://www.npmjs.com/package/lint-staged) 6. Set Up Husky
Husky makes it easy to manage and execute Git hooks, such as automatically running Prettier and ESLint before each commit.
Install Husky:

```bash
npm install --save-dev husky
```

Initialize Husky:

```bash
npx husky init
```

Add the following script to your package.json to prepare Husky:

```json
"scripts": {
 "prepare": "husky"
}
```

Make sure to not overwrite the existing scripts.
Run the prepare script:

```bash
npm run prepare
```

Create the commit hook for Commitlint:

```bash
echo 'npx --no-install commitlint --edit "$1"' > .husky/commit-msg
```

Create the pre-commit hook for lint-staged:

```bash
echo 'npx --no-install lint-staged' > .husky/pre-commit
```

For more information on Husky, visit Husky on [GitHub](https://github.com/typicode/husky).

If you are having trouble creating commits after installing lint and husky, especially when using GUIs, try the following.

1. Set the encoding type of .husky/pre-commit to `UTF-8` and the end of line sequence from CRLF to `LF`.
2. Add a shebang as the first line to .husky/pre-commit

```
#!/bin/bash
```

3. IF you run into a wsl (windows) error during commits, try setting a default distro.

```bash
wsl --setdefault <DistributionName>
```

I recommend using Ubuntu.
