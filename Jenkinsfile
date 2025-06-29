pipeline {
    agent any

    tools {
        // Matches the NodeJS installation named “Node_18” in Global Tool Config
        nodejs "NodeJS 18"
    }

    environment {
        EXPO_CLI_NO_INTERACTIVE = "true"
        CI                       = "true"
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
                bat 'npx expo export --platform web'
            }
        }

        stage('Archive Build Artifacts') {
            steps {
                // Save the web-build folder as build artifacts
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
