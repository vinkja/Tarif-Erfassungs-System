pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }
    }
//    stage('SonarQube analysis') {
//      // ** NOTE: This 'SonarQube Scanner 3' tool must be configured in the global configuration.
//       def scannerHome = tool 'SonarQube Scanner 3';
//       withSonarQubeEnv() {
//         sh "${scannerHome}/bin/sonar-scanner"
//       }
//    }
}
