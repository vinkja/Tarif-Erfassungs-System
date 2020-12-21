pipeline {

    agent any
    environment {
        CI = 'true'
    }
    stage('Test') {
        sh 'npm run test'
    }
   stage('Build') {
        sh 'npm install'
   }
   stage('Results') {
      junit 'target/surefire-reports/TEST-*.xml'
      archive 'target/*.jar'
   }
//    stage('SonarQube analysis') {
//      // ** NOTE: This 'SonarQube Scanner 3' tool must be configured in the global configuration.
//       def scannerHome = tool 'SonarQube Scanner 3';
//       withSonarQubeEnv() {
//         sh "${scannerHome}/bin/sonar-scanner"
//       }
//    }
}
