pipeline {
    agent any

    tools {
        nodejs "Node_18"   // Make sure you configured NodeJS in Jenkins global tools
    }

    environment {
        EXPO_CLI_NO_INTERACTIVE = "true"
        CI = "true"
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/Sachin-Sripathi/sample.git'   // Replace with your GitHub repo if using Git; or use local path if not using Git
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build for Web') {
            steps {
                bat 'npx expo export --platform web'
            }
        }

        stage('Serve') {
            steps {
                bat 'npx serve web-build -l 5000'
            }
        }
    }
}
