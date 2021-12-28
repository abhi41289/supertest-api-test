# API Test Automation framework
API Test Automation is mocha framework to perform API testing using supertest TypeScript library.

## Requirements:
[![NodeJs](https://img.shields.io/badge/-NodeJS%20v12%20OR%20later-%23339933?logo=npm)](https://nodejs.org/en/download/)
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
- Localhost: http://localhost:3000/
- ReqRes API: https://reqres.in/

Generate Token for API
```bash
- Open the URL "https://gorest.co.in/" --> sign up
- Click on Login user drop down --> Access Token
- Replace the actual token in .env file with <REPLACE_WITH_REAL_TOKEN>
```

Run tests and Generate Report
```bash
npm start [start local api server]
npm test  [run all tests]
```

## Key Features:
	- Supertest Library
	- Mochawesome Report
	- Mocha framework to organize tests
	- Config data reader from .env file using dotenv library
	- Runtime dynamic test data generation using faker library

## Folder structure:
```
├───src
|    ├───config
|    ├───helper
|    ├───resources
|    └───test
├───.env
├───.gitignore
├───package-lock.json
├───package.json
├───README.md
└───tsconfig.json
```

## Sample Report:
![image](https://user-images.githubusercontent.com/65847528/147535771-ca694f06-1270-4f6c-b26b-18dc9d9c4c74.png)
