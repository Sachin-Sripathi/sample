pipeline {
    agent any

    tools {
        nodejs "NodeJS 18"  // Ensure this matches Jenkins Global Tool name
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
                    branches: [[name: '*/main']],
                    userRemoteConfigs: [[
                        url: 'https://github.com/Sachin-Sripathi/sample.git'
                    ]]
                ])
            }
        }

        stage('Verify Expo CLI') {
            steps {
                bat '''
                    set PATH=%PATH%;C:\\Users\\sachi\\AppData\\Roaming\\npm
                    expo --version
                '''
            }
        }

        stage('Install Dependencies') {
            steps {
                bat '''
                    set PATH=%PATH%;C:\\Users\\sachi\\AppData\\Roaming\\npm
                    npm install
                '''
            }
        }

        stage('Build for Web') {
            steps {
                bat '''
                    set PATH=%PATH%;C:\\Users\\sachi\\AppData\\Roaming\\npm
                    expo export --platform web
                '''
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
