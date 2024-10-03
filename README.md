# News Aggregator App

This project is a news aggregator and its built with React

## Dockerized the app

### `Steps to dockerize the react app`

1.  Create a .dockerignore file and add path to the files/directories which are not needed to be copied from this project
2.  Create a Dockerfile on root level and add required instructions 
3.  Run `docker image build -t news-aggregator-image:latest .` to build the image
4.  To make this image accessible to other team members, We need to push it on DockerHub. 
5.  Login to Docker hub: `docker login`
6.  Add tag with the image: `docker image tag news-aggregator umerhere/news-aggregator-image`
7.  Push the image: `docker push umerhere/news-aggregator-image`
8.  In the future, you have made changes to your application. You can create an upgraded version of the same image, tag it with the new version name and then, push it.
    `docker image build -t react-example-image:upgrade .`
    `docker image tag react-example-image:upgrade <username>/react-example-image:upgrade`
    `docker push kunalmac25/react-example-image:upgrade`
9.  create a container to run the application. `docker run -dp 3000:3000 --name news-aggregator-container news-aggregator:latest`
10. As you can map a directory on your local machine containing the source code to a directory inside the Docker container. Any changes made to the files in the local directory will be immediately reflected in the container without requiring a rebuild. This is particularly useful during development when you want to see changes in real-time. Run this command to bind mounts `docker run -dp 3000:3000 --name news-aggregator-container -v $(pwd):/news-aggregator 8659d93a72b6` where 8659d93a72b6 is the image ID
11. To stop container: `docker container stop news-aggregator-container`
12. To remove container: `docker container rm news-aggregator-container`