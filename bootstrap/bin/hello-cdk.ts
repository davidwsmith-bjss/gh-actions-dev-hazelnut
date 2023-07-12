import {App} from "aws-cdk-lib";

const app = new App();

class MyFirstStack {
    constructor(app: App, helloCdk: string) {
        this._app = app;
        this._helloCdk = helloCdk;

    }

}

new MyFirstStack(app, 'hello-cdk');
app.synth();