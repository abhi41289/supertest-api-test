# API Test Automation framework
API Test Automation is mocha framework to perform API testing using supertest TypeScript library.

## Requirements:
[![NodeJs](https://img.shields.io/badge/-NodeJS-%23339933?logo=npm)](https://nodejs.org/en/download/)
[![VSCode](https://img.shields.io/badge/-Visual%20Studio%20Code-%233178C6?logo=visual-studio-code)](https://code.visualstudio.com/download)

## Getting Started:
Clone Repository
```bash
1. git clone https://github.com/sadabnepal/APISupertestMochaTypeScript.git
2. Navigate to APISupertestMochaTypeScript
```

Install the dependencies
```bash
npm install
```

API Sources
```
https://gorest.co.in

```
Generate Token for external API
```bash
- Open the URL "https://gorest.co.in/" --> Login / SignUp
- Click on Login user drop down --> Access Token
- Create .env file and add actual token, refer .env.example file
```

Run tests and Generate Report
```bash
npm test  [run all tests]
```

## Key Features:
	- Supertest library
	- Mochawesome Report
	- Custom types implementation
	- Mocha framework to organize tests
	- Maintain confidential info like token using dotenv library
	- Runtime dynamic test data generation using faker js library

## Folder structure:
```
├───.vscode
|    └───settings.json
├───tests
|    ├───config
|    ├───helper
|    ├───resources
|    ├───specs
|    └───types
├───.env
├───.env.example
├───.gitignore
├───package-lock.json
├───package.json
├───README.md
└───tsconfig.json
```

## Sample Report:
![image](https://user-images.githubusercontent.com/65847528/147593338-28527381-d818-4b07-b90b-e0d7a1d5f5dd.png)
