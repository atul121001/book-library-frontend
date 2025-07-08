# Frontend CI/CD Setup

This document explains how to set up Continuous Integration and Continuous Deployment (CI/CD) for the frontend application.

## Prerequisites

1. An AWS EC2 instance running Ubuntu
2. GitHub repository for your frontend code
3. SSH access to your EC2 instance
4. Nginx installed on your EC2 instance

## Setting Up GitHub Secrets

Add the following secrets to your GitHub repository:

1. `SSH_PRIVATE_KEY`: Your private SSH key for connecting to the EC2 instance
2. `HOST`: Your EC2 instance's public IP address or domain name
3. `USERNAME`: The username for SSH login (usually 'ubuntu' for AWS EC2)

## EC2 Server Setup

1. SSH into your EC2 instance
2. Run the included setup script:
   ```bash
   chmod +x ec2-setup.sh
   ./ec2-setup.sh
   ```

This script will:
- Update system packages
- Install and configure Nginx
- Set up Nginx to serve the React SPA and proxy API requests
- Install rsync for file transfers

## How the CI/CD Pipeline Works

When you push code to the `main` branch:

1. GitHub Actions will trigger the workflow defined in `.github/workflows/deploy.yml`
2. The workflow will:
   - Check out your code
   - Set up Node.js
   - Install dependencies and build the application
   - Configure SSH access
   - Deploy the built files to the EC2 instance using rsync
   - Copy the files to the Nginx web root directory

## Manual Deployment

You can also manually trigger the deployment from the GitHub Actions tab in your repository.

## Troubleshooting

If you encounter issues:

1. Check the GitHub Actions logs for errors
2. SSH into your EC2 instance and check the Nginx logs:
   ```bash
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   ```
3. Ensure your EC2 security group allows inbound traffic on port 80
4. Check that the backend API is running and accessible 