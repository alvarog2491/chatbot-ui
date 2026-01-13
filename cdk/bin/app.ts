#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { ChatbotUIStack } from '../lib/chatbot-ui-stack';

const app = new cdk.App();

new ChatbotUIStack(app, 'ChatbotUIStack', {
    env: {
        account: process.env.CDK_DEFAULT_ACCOUNT,
        region: process.env.CDK_DEFAULT_REGION || 'us-east-1',
    },
    description: 'S3 + CloudFront hosting for Next.js chatbot application',
    enableCaching: true,
});

app.synth();
