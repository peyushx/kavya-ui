#!/bin/bash

# Configuration
APP_NAME="kavvs-sky"
PEM_FILE="notchlabs.pem"
REMOTE_USER="ec2-user"
REMOTE_HOST="ec2-13-126-111-220.ap-south-1.compute.amazonaws.com"
REMOTE_PATH="/home/ec2-user/$APP_NAME"

echo "🚀 Starting deployment for $APP_NAME..."

# Step 1: Build the project
echo "🛠️ Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Aborting deployment."
    exit 1
fi

# Step 2: Ensure remote directory exists
echo "📂 Preparing remote directory..."
ssh -i "$PEM_FILE" $REMOTE_USER@$REMOTE_HOST "mkdir -p $REMOTE_PATH"

# Step 3: Transfer the build files
echo "📦 Transferring files to EC2..."
# Using rsync for efficient transfer
rsync -avz --delete -e "ssh -i $PEM_FILE" dist/ $REMOTE_USER@$REMOTE_HOST:$REMOTE_PATH

echo "✨ Deployment successful!"
echo "--------------------------------------------------"
echo "Host: $REMOTE_HOST"
echo "Path: $REMOTE_PATH"
echo "--------------------------------------------------"
