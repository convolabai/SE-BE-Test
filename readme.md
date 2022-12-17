# How to Use

This section provides info on how to run the code for each question.

## Step 1

Prepare the test environment by installing all the dependencies with the following command

```
yarn
```

Prepare the test database. The test database is MongoDB that runs on docker. A Yarn command is provided to conveniently invoke it.

```
yarn startdb
```

This will run the docker container, but it is not headless. When you are done reviewing this assignment, you can run the following command to clean up the container from your machine

```
yarn removedb
```

## Step 2 (optional)

Test data are provided in ./tests/data/input/\*.

- User test data is in user.js
- Group test data is in group.js
- GroupUser test data is in group-user.js
  A Yarn command is provided to help populate the test database with these data. This step is optional because future steps will invoke this command automatically anyway.

## Step 3

To run the code for question one, run the following command

```
yarn start:question1
```

The output csv file is called question1.csv and it should appear in the project root.

## Step 4

To run the code for question two, run the following command

```
yarn start:question2
```

The database can be inspected to see if the usernames are all capitalized. The test database's admin account have the following credentials:

- host: localhost
- port: 27017
- user: root
- pass: pass
- databas: test

## Step 5 (optional)

To run both questions at the same time, run the following command

```
yarn start
```

## Quality of Life Improvements

### Prettier

If you are using VSCode to edit this project, the code should prettify automatically. The rules are contained in .prettierrc. If you want to prettify the code using the command line, run the following command

```
yarn prettify
```

### Testing

Multiple integration tests had been created. To run it and check for coverage, run the following command

```
yarn test
```

### Import Alias

This project supports import aliasing to make it convenient to import files without using relative paths. These import paths can be found in package.json. To help VSCode auto-complete these paths, these path definitions are also included in jsconfig.json. To help Jest use these paths, these path definitions are also included in jestconfig.json.

# Questions

## **_Please make it as much professional in all aspects as you can_**

## Question 1

Please write a node.js code that queries and exports data to a CSV file. A list of usernames and emails of users, who are members of private groups and joined the group in the November of 2021 is expected in the file. _(Please refer to the `Data Schema` section for more detail)_

The example of file content is shown below. _(Please note that the 1st line is the headers.)_

```
Group Name,Username,Email
Group 1,user1,user1@email.com
```

The sorting must match the following orders.

1. Sort by group name ascending
2. Sort by username ascending

## Question 2

Please write a node.js code that updates all the users in the mongodb by capitalizing the first letter of their own usernames.
For example:

```
username:
user1 => User1
john-doe => John-doe
```

# Data Schema

Schema files are located in the `/schemas` folder. The folder contains 3 schema files as listed here.

1. User
2. Group
3. Group User

### User

An idividual user must have username and eamil registered in the system.

### Group

The `meta.isPrivate` field is a flag to specify if a group is private or not.

### Group User

It is composed of group id and user id. The `createdAt` field can be used to determine when a user joined a group.
