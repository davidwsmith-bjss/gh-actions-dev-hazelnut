#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { MyPipelineStack } from '../lib/aws-pipeline-stack';

const app = new cdk.App();
new MyPipelineStack(app, 'CedarPipelineStack', {
    env: {
        account: '679289103098',
        region: 'eu-west-2',
    }
});

app.synth();