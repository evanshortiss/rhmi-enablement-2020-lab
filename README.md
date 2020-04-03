# Red Hat Summit 2020 Lab on RHMI (Integreatly)

This repository contains a Solution Pattern that's compatible with the
[Solution Explorer](https://github.com/integr8ly/tutorial-web-app) to
facilitate the lab.

It also contains a Ansible Playbooks to deploy the lab infrastructure on a
pre-existing RHMI (Integreatly) v2 Cluster.

## Lab Deployment and Administration
Refer to [ansible/README](ansible/README.md) for instructions.

## Requirements for Development

* Node.js 10+
* npm 6+
* yarn

The easiest way to install these requirements is to use
[nvm](https://github.com/nvm-sh/nvm#installation-and-update) and then run:

```bash
nvm use 10

# yarn v1.x should be explicitly used. v2 is not tested with this lab
npm install -g yarn@1
```

## Development Setup for Lab/Walkthrough Content

Setup requires installation of Node.js 10.15 or later. This enables a Git hook
that verifies the asciidoc content and walkthrough config.

```bash
git clone git@github.com:evanshortiss/rhmi-enablement-2020-lab.git

cd rhmi-enablement-2020-lab

npm install
```

## View Walkthrough Content Locally

When running the Solution Explorer (webapp) locally you lose certain features,
such as the injection of variables into asciidoc. Use local development to
quickly preview changes, but for testing deploy on an actual RHMI cluster.

```bash
# Clone the Solution Explorer
git clone https://github.com/integr8ly/tutorial-web-app

# Clone this lab in the same directory as the Solution Explorer
git clone git@github.com:evanshortiss/rhmi-enablement-2020-lab.git

# Set WALKTHROUGH_LOCATIONS variable the Solution Explorer needs
export WALKTHROUGH_LOCATIONS=$(pwd)/rhmi-enablement-2020-lab/walkthroughs

# Start the Solution Explorer at http://localhost:3006
cd tutorial-web-app
yarn install
yarn start:dev
```

## View Walkthrough Content on an RHMI Cluster

### Via OpenShift UI
1. Sign in as `admin` to the cluster.
1. Open the `Solution Explorer` project.
1. Navigate to `Resources > Other Resources` using the side menu.
1. Choose `Web App` in the dropdown.
1. Choose `Actions > Edit YAML` for `tutorial-web-app-operator` in the list.
1. Under `spec.template.parameters` (this block will also contain
`OPENSHIFT_HOST` and some other variables) add the following:

```yaml
WALKTHROUGH_LOCATIONS: 'https://github.com/integr8ly/tutorial-web-app-walkthroughs#v1.6.4,https://github.com/evanshortiss/rhmi-enablement-2020-lab'
```

### Via OpenShift CLI
1. Login as `admin` using `oc login -u admin`
1. Run `oc patch webapp tutorial-web-app-operator -n webapp --type=merge -p '{"spec":{"template":{"parameters":{"WALKTHROUGH_LOCATIONS":"https://github.com/evanshortiss/rhmi-enablement-2020-lab"}}}}'`
