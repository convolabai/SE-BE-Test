## NOTE

IF you are looking for the old README, please see [INSTRUCTION](INSTRUCTION.md)

## Getting Started

### Prerequisite

Install [Yarn v1](https://classic.yarnpkg.com/lang/en/) and [Docker Desktop](https://www.docker.com/products/docker-desktop)

### Installation

```bash
yarn install
```

### First time Configuration

1. Run `docker-compose up -d` to start MonogoDB
2. Run `yarn run seed` to seed the database.

There are 100 users and 20 groups in total.

- 10 groups is private and another 10 is public
- 50 users joined the private groups and 50 users joined the public groups
- Only 25 users joined the private group in November 2021

### Running the command

For the Question 1, run `yarn run question1`
For the Question 2, run `yarn run question2`
