pipeline {
    agent any

    stages {
        stage('Initialize') {
            steps {
                echo 'Pipeline initialized. Environment looks good.'
            }
        }

        stage('Check Workspace') {
            steps {
                sh 'pwd'
                sh 'ls -la'
            }
        }

        stage('Simulate Build') {
            steps {
                echo 'Simulating build...'
                sh 'echo "Build success!"'
            }
        }

        stage('Simulate Test') {
            steps {
                echo 'Simulating tests...'
                sh 'echo "All tests passed!"'
            }
        }

        stage('Simulate Deploy') {
            steps {
                echo 'Simulating deployment...'
                sh 'echo "Deploying..."'
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed.'
        }
        success {
            echo 'Pipeline ran successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}
