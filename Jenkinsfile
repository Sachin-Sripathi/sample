pipeline {
    agent any

    tools {
        // Must match the name in Global Tool Config
        nodejs "NodeJS 18"
    }

    environment {
        EXPO_CLI_NO_INTERACTIVE = "true"
        CI = "true"
        PATH = "${env.PATH};C:\\Users\\sachi\\AppData\\Roaming\\npm"  // Add expo to PATH
    }

    stages {
        stage('Checkout') {
            steps {
                // Clone the main branch
                checkout([
                    $class: 'GitSCM',
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Sachin-Sripathi/sample.git'
                    ]]
                ])
            }
        }

        stage('Verify Expo CLI') {
            steps {
                bat 'where expo'
                bat 'expo --version || npx expo --version'
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
                archiveArtifacts artifacts: '**/web-build/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "Build finished. Status: ${currentBuild.currentResult}"
        }
    }
}
