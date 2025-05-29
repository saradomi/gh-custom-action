const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

function run() {
    // 1 get some input values
    const bucket = core.getInput('bucket', { required: true });
    const bucketRegion = core.getInput('bucket-region', { required: true });
    const distFolder = core.getInput('dist-folder', { required: true });

    // 2 upload files
    const s3Uri = `s3://${bucket}`
    exec.exec(`aws s3 sync ${distFolder} ${s3Uri} --region ${bucketRegion}`)

    const websiteUrl = `http://${bucket}.s3-website.${bucketRegion}.amazonaws.com`; http://gha-custom-action-hosting-sara-domi.s3-website.eu-north-1.amazonaws.com/
    core.setOutput('website-url', websiteUrl);
}

run();