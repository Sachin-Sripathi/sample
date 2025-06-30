pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"
    }

    environment {
        PATH = "C:\\Windows\\System32;${env.PATH};C:\\Users\\sachi\\AppData\\Roaming\\npm"
        EXPO_CLI_NO_INTERACTIVE = "true"
        CI = "true"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm install'
            }
        }

        stage('Build Android APK') {
            steps {
                bat 'call npx expo build:android --non-interactive'
            }
        }

        stage('Archive APK') {
            steps {
                archiveArtifacts artifacts: '**/*.apk', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "Finished pipeline on branch ${env.BRANCH_NAME}"
        }
    }
}
