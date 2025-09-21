#!/bin/bash

# TaskMaster Production Deployment Script
# This script builds and deploys TaskMaster using Docker

echo "🚀 Deploying TaskMaster to Production..."
echo "========================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Docker is installed and running
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker from https://docker.com/"
    exit 1
fi

if ! docker info &> /dev/null; then
    print_error "Docker is not running. Please start Docker daemon"
    exit 1
fi

print_success "Docker is installed and running"

# Check if docker-compose is available
if ! command -v docker-compose &> /dev/null && ! docker compose version &> /dev/null; then
    print_error "Docker Compose is not available. Please install Docker Compose"
    exit 1
fi

print_success "Docker Compose is available"

# Stop and remove existing containers
print_status "Stopping existing containers..."
docker-compose down 2>/dev/null || docker compose down 2>/dev/null || true

# Remove old images (optional)
read -p "🗑️  Remove old Docker images? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    print_status "Removing old images..."
    docker image prune -f
    docker rmi $(docker images "taskmaster*" -q) 2>/dev/null || true
fi

# Build and start containers
print_status "Building and starting containers..."
if docker-compose up --build -d 2>/dev/null || docker compose up --build -d 2>/dev/null; then
    print_success "Containers started successfully"
else
    print_error "Failed to start containers"
    exit 1
fi

# Wait for services to be healthy
print_status "Waiting for services to be ready..."
sleep 10

# Check service health
print_status "Checking service health..."

# Check backend health
for i in {1..30}; do
    if curl -f http://localhost:5000 &>/dev/null; then
        print_success "Backend is healthy"
        break
    elif [ $i -eq 30 ]; then
        print_error "Backend health check failed"
        exit 1
    else
        sleep 2
    fi
done

# Check frontend health
for i in {1..30}; do
    if curl -f http://localhost:3000 &>/dev/null; then
        print_success "Frontend is healthy"
        break
    elif [ $i -eq 30 ]; then
        print_error "Frontend health check failed"
        exit 1
    else
        sleep 2
    fi
done

print_success "🎉 Deployment completed successfully!"
echo ""
echo "🌐 Application URLs:"
echo "Frontend: http://localhost:3000"
echo "Backend:  http://localhost:5000"
echo ""
echo "📊 Container Status:"
docker-compose ps 2>/dev/null || docker compose ps 2>/dev/null
echo ""
print_success "TaskMaster is now running! 🚀"