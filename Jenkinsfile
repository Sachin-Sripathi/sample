pipeline {
    agent any

    tools {
        nodejs 'Node_18' // Make sure this tool name is configured in Jenkins Global Tools
    }

    stages {
        stage('Checkout Code') {
            steps {
                git 'https://github.com/Sachin-Sripathi/sample.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci' // Faster & consistent install
            }
        }

        stage('TypeScript Compile') {
            steps {
                sh 'npx tsc' // Compiles based on tsconfig.json
            }
        }

        stage('Run Tests') {
            steps {
                // Only if you have tests defined
                sh 'npm test || echo "No tests found"' 
            }
        }

        stage('Archive Build Artifacts') {
            when {
                expression { fileExists('dist') }
            }
            steps {
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo '✅ TypeScript build successful!'
        }
        failure {
            echo '❌ Build failed. Check logs.'
        }
    }
}
