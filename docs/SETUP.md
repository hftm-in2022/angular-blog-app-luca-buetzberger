# 1. Setup the Angular project.

### 1.1 Create a new angular project.

Create a new project setup.

```bash
ng new <project-name>
```

Choose SCSS and no server side rendering SSR.

### 1.2 Create a git repository.

1. Initialize the Git repository:

```bash
git init
```

2. Add Files to the repository

```bash
git add .
```

3. Commit the Files:

```bash
git commit -m "chore: initial commit"
```

4. Create a New repository on GitHub
5. Link Your local repository to GitHub:

```bash
git remote add origin https://github.com/your-username/your-repo.git
```

6. Push Your Local Repository to GitHub:

```bash
git push -u origin master
```

# 2. Setup of code quality tools for angular

Open a terminal in your projects root directory.

### 1. Add ESLint to Your Angular Application

ESLint is a static code analysis tool that helps identify potential errors and maintain code consistency.

```bash
ng add @angular-eslint/schematics
```

### 2. Install and Configure Prettier

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

### 3. Generate Environments for Angular

Environments in Angular are used to define different configuration options for various environments (e.g., development, production).
Generate the environment configuration files:

```bash
ng generate environment
```

For more information, refer to the official documentation: [Angular Build Guide](https://v17.angular.io/guide/build)

### 4. Set Up Commitlint

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

### 5. Set Up lint-staged

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

### Problem solving

If you are having trouble creating commits after installing lint and husky, especially when using GUIs, try the following.

1. Set the encoding type of .husky/pre-commit to `UTF-8` and the end of line sequence from CRLF to `LF`.
2. Add a shebang as the first line to .husky/pre-commit

```
#!/bin/bash
```

3. If you run into a wsl (windows) error during commits, try setting a default distro.

```bash
wsl --setdefault <DistributionName>
```

I recommend using Ubuntu.

# 3. Automatic deployment to Azure

This guide shows the steps for visual studio code.

### 1. Install Azure Tools plugin for your ide.

The Azure plugin for Visual Studio Code makes managing the Azure Cloud easier.

[Azure Tools for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-node-azure-pack)

### 3.2 Create a static web app.

1. On the left sidepannel, open up the azure plugin, select a
   `ressource group`, then right click on `Static Web Appps` -> `Create static web app...`

2. Enter a name for the static web app. Choose the same name as the project.

3. Select Angular as framework.

4. Set the root directory to your projects root. Usually, it's `/`.

5. Set the build output directory as `dist/<your-app-name>/browser`.

# 4. CI/CD Pipeline and Update Management

The following tutorial does an excelent job at demonstrating how it is done.

[Github Actions for Angular Projects: Pipeline for Testing, Building and ng update](https://youtu.be/1vqJ1_AAcUg)
