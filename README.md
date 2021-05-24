# Notify Discord Webhook Lambda Template

Template Lambda for posting messages to Discord Via a configured webhook url

### Prerequisites

* IAM User with the following policies 
```
IAMFullAccess
AmazonEC2ContainerRegistryFullAccess
AmazonS3FullAccess
AmazonAPIGatewayAdministrator
AWSCloudFormationFullAccess
AWSLambda_FullAccess
```
* ECR repository to house the lambda docker images.
  See [How to create a ECR repository](https://docs.aws.amazon.com/AmazonECR/latest/userguide/repository-create.html)

### Configuration

Here are the following Github Secrets you should define for this repository:

`AWS_ACCESS_KEY_ID` IAM access key ID.

`AWS_SECRET_ACCESS_KEY` IAM access key

`AWS_REGION` Deployment region

`WEB_HOOK_URL` The Discord webhook to `POST` to


### Development

Install dependencies
```
npm i
```

running tests
```
npm test
```
