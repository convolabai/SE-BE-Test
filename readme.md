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

An individual user must have username and email registered in the system.

### Group

The `meta.isPrivate` field is a flag to specify if a group is private or not.

### Group User

It is composed of group id and user id. The `createdAt` field can be used to determine when a user joined a group.
