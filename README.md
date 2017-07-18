# Salesforce PermissionSet behavior

> Demonstration of the PermissionSet behavior with API v40.0

[![Build Status](https://travis-ci.org/amtrack/salesforce-permissionset-behavior-v40.svg?branch=master)](https://travis-ci.org/amtrack/salesforce-permissionset-behavior-v40)

## Background

With the [Summer '17 Release](https://releasenotes.docs.salesforce.com/en-us/summer17/release-notes/rn_api_meta.htm#updated_types_fields) the behavior for retrieving/deploying PermissionSets has changed:

> In API version 40.0 and later, when you retrieve permission set metadata, all content exposed in Metadata API for the permission sets are retrieved. Retrieval includes Apex associated with the permission set, CRUD, and > so on. In API version 39.0 and earlier, retrieving permission set metadata returns only the app and system permissions assigned to the permission set. Junction metadata (such as Apex, CRUD) are included only if the metadata for the related component is also included in the package definition.

This sounds great as the PermissionSet file now is supposed to only contain entries associated with the PermissionSet (`true` values) and this drastically reduces the file size.

## Observed behavior

When retrieving a `PermissionSet` standalone the behavior is as described above.

However once you add a `CustomObject` to the `package.xml` to be retrieved, you'll end up getting all the `false` entries again as with API <= `v39.0`.

## Demonstration

This test creates a CustomField `Account.Test__c` and a PermissionSet named `Test`.

The PermissionSet is set to grant edit access to the CustomField `Account.Test__c` and the standard CustomField `Account.Industry`.

Three test cases will be run:

1. Retrieval of a PermissionSet
2. Retrieval of a PermissionSet with some CustomFields
3. Retrieval of a PermissionSet with a CustomObject

The last test case is failing, verifying the observed behavior.

## Installation

```console
$ npm install
```

## Running the test

Inject your credentials for a developer edition and run the test

```console
$ export SFDC_USERNAME=mydevedition@example.com
$ export SFDC_PASSWORD=passwordSecurityToken
$ export SFDC_SERVER_URL=https://login.salesforce.com
$ npm test
```
