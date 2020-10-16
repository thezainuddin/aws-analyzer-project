pipeline {
  agent any
    
  tools {nodejs "node"}
    
  stages {
        
    stage('Git') {
      steps {
        git 'https://github.com/thezainuddin/aws-analyzer-project'
      }
    }
     
    stage('Build') {
      steps {
        sh 'npm install'
         echo "Npm installed successfully !!"
      }
    }  
    
            
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}