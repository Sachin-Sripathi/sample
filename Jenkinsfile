pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"  // Make sure this exact label is defined in Jenkins -> Global Tool Configuration
    }

    environment {
        EXPO_CLI_NO_INTERACTIVE = "true"
        CI = "true"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],  // make sure 'main' branch exists; else use 'master'
                    userRemoteConfigs: [[
                        url: 'https://github.com/Sachin-Sripathi/sample.git'
                    ]]
                ])
            }
        }

        stage('Check Files') {
            steps {
                bat 'dir /s'
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

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'web-build/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "✅ Finished pipeline on branch ${env.BRANCH_NAME}"
        }
    }
}
