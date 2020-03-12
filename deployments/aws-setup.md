# Setting up Kubernetes cluster on AWS

These are instructions on how to create a Kubernetes cluster on AWS by using [kops][kops-site] and [aws][aws-cli-site].

## Requirementes

Both `kops` and `aws` installed (and configured for AWS).

## Steps

Please note that going through these steps requires that you have an AWS account with credit card set. You're going to be billed according to the cluster size and location in case you don't have free credentials.

1. Create a state store bucket for `kops` into AWS S3: `aws s3api create-bucket --bucket ig-clone.k8s.bucket --region eu-central-1 --create-bucket-configuration LocationConstraint=eu-central-1`
2. Export `kops` state store name: `export KOPS_STATE_STORE=s3://ig-clone.k8s.bucket`
3. Create the cluster: `kops create cluster ig-clone.k8s.local --zones eu-central-1a --yes`
   * This will create a cluster with 1 master and 2 nodes. You can fine tune the number of masters and nodes, as well as the zones in any way you want.
4. Run `kops validate cluster` to see if the cluster is ready. It might take a while.
5. Once the validation says `Your cluster ig-clone.k8s.local is ready`, you're ready to go! Try `kubectl get deployments --namespace=kube-system` to verify that `kubectl` is configured properly.

## Teardown

Once you want to get rid of the cluster, use `kops delete cluster` command.

```bash
kops delete cluster ig-clone.k8s.local --yes
```

Please note that it might take a while to delete all resources of the cluster. In order to be absolutely sure that all AWS resources has been deleted, check your AWS console manually.

**NOTE**: If you created a filesystem in AWS EFS, it might prevent `kops` from deleting all resources (vpc, security-groups, dhcp-options, route-tables). You'll have to resolve that by deleting the created filesystem manually (or probably detaching it from the vpc works as well).

[kops-site]:https://github.com/kubernetes/kops
[aws-cli-site]:https://aws.amazon.com/cli/
