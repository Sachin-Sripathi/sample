pipeline {
    agent any

    tools {
        // Matches the NodeJS installation named “NodeJS 18” in Global Tool Config
        nodejs "NodeJS 18"
    }

    environment {
        EXPO_CLI_NO_INTERACTIVE = "true"
        CI = "true"
    }

    stages {
        stage('Checkout') {
            steps {
                // Explicitly checkout main branch
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Sachin-Sripathi/sample.git'
                    ]]
                ])
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build for Web') {
            steps {
                // Force output to web-build/
                bat 'npx expo export --platform web --output-dir web-build'
            }
        }

        stage('List Files') {
            steps {
                bat 'dir /s'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'web-build/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "Finished pipeline on branch ${env.BRANCH_NAME}"
        }
    }
}
