node {
    def app

    stage('Clone repository') {
      

        checkout scm
    }

    stage('Build image') {
  
       app = docker.build("hamid281/find-synonyms")
    }

    stage('Test image') {
  

        app.inside {
            // Run tests inside the container
            // For example, you can run unit tests or integration tests here
            // Assuming you have a test script in your Docker image
            // Replace 'test.sh' with your actual test script
            // sh 'chmod +x test.sh'
            // sh './test.sh'
            // For demonstration, let's just echo a message
            echo "Running tests inside the container"
            // Simulate a test command
            // Replace this with your actual test command
            // sh 'npm test'
            // For demonstration, let's just echo a message
            echo "Running tests inside the container"
            // Simulate a test command
            // Replace this with your actual test command           
            sh 'echo "Tests passed"'
        }
    }

    stage('Push image') {
        
        docker.withRegistry('https://registry.hub.docker.com', 'dockerhub') {
            app.push("${env.BUILD_NUMBER}")
        }
    }
    
    stage('Trigger ManifestUpdate') {
                echo "triggering updatemanifestjob"
                build job: 'updatemanifest', parameters: [string(name: 'DOCKERTAG', value: env.BUILD_NUMBER)]
        }
}
