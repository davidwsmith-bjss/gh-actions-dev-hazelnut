import * as cdk from 'aws-cdk-lib';
import * as iam from 'aws-cdk-lib/aws-iam';
import { Construct } from 'constructs';

export interface GitHubStackProps extends cdk.StackProps {
    /**
     * Name of the deploy role to assume in GitHub Actions.
     */
    readonly deployRole: string;
    /**
     * The sub prefix string from the JWT token used to be validated by AWS. Appended after `repo:${owner}/${repo}:`
     * in an IAM role trust relationship. The default value '*' indicates all branches and all tags from this repo.
     *
     * Example:
     * repo:octo-org/octo-repo:ref:refs/heads/demo-branch - only allowed from `demo-branch`
     * repo:octo-org/octo-repo:ref:refs/tags/demo-tag - only allowed from `demo-tag`.
     * repo:octo-org/octo-repo:pull_request - only allowed from the `pull_request` event.
     * repo:octo-org/octo-repo:environment:Production - only allowd from `Production` environment name.
     *
     * @default '*'
     * @see https://docs.github.com/en/actions/deployment/security-hardening-your-deployments/about-security-hardening-with-openid-connect#configuring-the-oidc-trust-with-the-cloud
     */
    readonly repositoryConfig: { owner: string; repo: string; filter?: string }[];
}

export class GitHubStack extends cdk.Stack {
    private category: string;
    constructor(scope: Construct, id: string, props: GitHubStackProps) {
        super(scope, id, props);

        const githubDomain = 'token.actions.githubusercontent.com';

        const ghProvider = new iam.OpenIdConnectProvider(this, 'githubProvider', {
            url: `https://${githubDomain}`,
            clientIds: ['sts.amazonaws.com'],
        });

        const iamRepoDeployAccess = props.repositoryConfig.map(r =>
            `repo:${r.owner}/${r.repo}:${r.filter ?? '*'}`);

        // grant only requests coming from a specific GitHub repository.
        const conditions: iam.Conditions = {
            StringLike: {
                [`${githubDomain}:sub`]: iamRepoDeployAccess,
                [`${githubDomain}:aud`]: 'sts.amazonaws.com',
            },
        };

        new iam.Role(this, 'GitHubDeployRole', {
            assumedBy: new iam.WebIdentityPrincipal(ghProvider.openIdConnectProviderArn, conditions),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
            ],
            roleName: props.deployRole,
            description: 'This role is used via GitHub Actions to deploy with AWS CDK or Terraform on the target AWS account',
            maxSessionDuration: cdk.Duration.hours(1),
        });
    }
}


const app = new cdk.App();
new GitHubStack(app, 'dsmithGitHubOpenIDConnect', {
    deployRole: 'OIDCGitHubDeployRole',
    repositoryConfig: [
<<<<<<< HEAD:bootstrap/lib/oidc.ts
<<<<<<< HEAD:bootstrap/lib/oidc.ts
        { owner: 'davidwsmith-bjss', repo: 'gh-actions-dev-pecan', filter: 'ref:refs/heads/main' },
        { owner: 'davidwsmith-bjss', repo: 'gh-actions-dev-hazelnut', filter: 'ref:refs/heads/main' },
=======
        { owner: 'davidwsmith-bjss', repo: 'gh-actions-dev-pecan', filter: 'refs/heads/SWN-300-github-actions' },
=======
        { owner: 'davidwsmith-bjss', repo: 'gh-actions-dev-pecan', filter: 'refs/heads/origin/SWN-300-github-actions' },
>>>>>>> 5990f58 (corrected to oidc):bootstrap/lib/odic.ts
        { owner: 'davidwsmith-bjss', repo: 'gh-actions-dev-hazelnut', filter: 'refs/heads/main' },
>>>>>>> eceeb03 (cdk.our folder under bootstrap folder; changes installs to:):bootstrap/lib/odic.ts
    ],
});

/**
 * "The Cloud Assembly is the output of the synthesis operation. It is produced as part of the cdk synth command,
 * or the app.synth() method invocation."
 * "The Cloud Assembly is the output of the synthesis operation. It is produced as part of the cdk synth command,
 * or the app.synth() method invocation."
 */
app.synth();
