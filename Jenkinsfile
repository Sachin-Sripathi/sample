pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"
    }

    environment {
        PATH = "${env.PATH};C:\\Users\\sachi\\AppData\\Roaming\\npm"
        EXPO_CLI_NO_INTERACTIVE = "true"
        CI = "true"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Verify Expo CLI') {
            steps {
                bat '''
                    echo PATH: %PATH%
                    dir C:\\Users\\sachi\\AppData\\Roaming\\npm
                    call expo --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'call npm install'
            }
        }

        stage('Build for Web') {
            steps {
                bat 'call expo export --platform web'
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: '**/web-build/**', fingerprint: true
            }
        }
    }

    post {
        always {
            echo "Finished pipeline on branch ${env.BRANCH_NAME}"
        }
    }
}
