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
               echo 'Check workspace looks good.'
            }
        }

        stage('Simulate Build') {
            steps {
                echo 'Simulating build...'
            }
        }

        stage('Simulate Test') {
            steps {
                echo 'Simulating tests...'
            }
        }

        stage('Simulate Deploy') {
            steps {
                echo 'Simulating deployment...'
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
