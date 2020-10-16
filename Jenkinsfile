pipeline {
  agent any
    
  tools {nodejs "Node-build"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/thezainuddin/aws-analyzer-project'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
         echo "Npm installed successfullyyyzz !!"
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}