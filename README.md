[![Build Status](https://travis-ci.org/doublenot/refs.svg?branch=master)](https://travis-ci.org/doublenot/refs)
[![Coverage Status](https://coveralls.io/repos/github/doublenot/refs/badge.svg?branch=master)](https://coveralls.io/github/doublenot/refs?branch=master)

# refs-compiler

Compiler for YAML, JSON and INI files using path references

### Install:

```bash
# npm
# global
$ npm install -g refs-compiler

# dev dependency
$ npm install refs-compiler --save-dev

# Yarn
# global
$ yarn global add refs-compiler

# dev dependency
$ yarn add refs-compiler -D
```

### Example: YAML

#### Template(s):
```yaml
AWSTemplateFormatVersion: '2010-09-09'

Resources:
  - $ref: ./relative/path/to/file.yaml
```

```yaml
RolePolicies:
  $ref: ./resources/role-policies.yaml
```

```yaml
Type: 'AWS::IAM::Policy'
Properties:
  PolicyName: custom-role
  Roles:
    - custom-role
  PolicyDocument:
    Version: '2012-10-17'
    Statement:
      -
        Sid: PassRole
        Effect: Allow
        Resource:
          -
            'Fn::Join':
              - ""
              -
                - 'arn:aws:iam::'
                -
                  Ref: 'AWS::AccountId'
                - ':role/*'
        Action:
          - 'iam:PassRole'
```

#### Code:
```javascript
const path = require('path');
const compiler = require('refs-compiler');

const inputTemplate = path.resolve('/path/to/template.yaml');
const outputFile = path.resolve(`/path/to/output.yaml`);

try {
  compiler(inputTemplate, outputFile)
      .then(results => {
          console.log(`file created in ${results.outputFile}`);
      })
      .catch(error => {
          console.log(`An error occurred while writing the file: ${error.message}`);
          console.log(error.stack);
      });
} catch (e) {
  console.error(e.message);
  console.error(e.stack);
}
```

#### Or cli:
```bash
$ refs-compiler -o ./build/output.yaml ./templates/template.yaml
```

#### Output:
```yaml
AWSTemplateFormatVersion: '2010-09-09'
Resources:
  - RolePolicies:
      Type: 'AWS::IAM::Policy'
      Properties:
        PolicyName: custom-role
        Roles:
          - custom-role
        PolicyDocument:
          Version: '2012-10-17'
          Statement:
            - Sid: PassRole
              Effect: Allow
              Resource:
                - 'Fn::Join':
                    - ''
                    - - 'arn:aws:iam::'
                      - Ref: 'AWS::AccountId'
                      - ':role/*'
              Action:
                - 'iam:PassRole'
```

## Acknowledgement

The base code was borrowed from [doublenot/refs](https://github.com/doublenot/refs) and then refactored / rewritten to support NodeJS 8+ using native Promises + async/await

## Pending Tasks
- [ ] Tests
