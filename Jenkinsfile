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

    post {
        always {
            echo "Finished pipeline on branch ${env.BRANCH_NAME}"
        }
    }
}
