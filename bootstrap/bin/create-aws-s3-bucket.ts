import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';

class MyStack extends cdk.Stack {
    constructor(scope: cdk.App, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        new s3.Bucket(this, 'dsmith-cdk-github-actions-dev', {
            removalPolicy: cdk.RemovalPolicy.DESTROY,
        });
    }
}

const app = new cdk.App();
new MyStack(app, 'dsmith-cdk-github-actions-dev');
app.synth();