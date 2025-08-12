pipeline {
    agent any

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Sachin-Sripathi/sample.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Built...'
            }
        }

        stage('Test') {
            steps {
                echo 'Tested...'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploy...'
            }
        }
    }
}
