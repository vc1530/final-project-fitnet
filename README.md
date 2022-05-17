[![CircleCI](https://circleci.com/gh/software-assignments-spring2022/final-project-fitnet/tree/master.svg?style=shield)](https://circleci.com/gh/software-assignments-spring2022/final-project-fitnet/tree/master)

[Fitnet Live](http://137.184.223.5:4000/) 

# FitNet 

## What and Why?
In an era dictated by a global epidemic and the growing popularity of social media, fitness and social connection are becoming increasingly vital aspects of our lifestyles. Unfortunately, the vast majority of individuals who engage in fitness often find themselves unable to effectively track and engage with their health journey, in addition to sharing their progress and achievements with others. **As a social media platform dedicated to tracking fitness, FitNet’s goal is to bridge this existing gap between fitness and social connection, creating a safe space for everyone to document and share their health journey.**

## For whom? 
FitNet is a fitness tracker application that is viable for everybody, ranging from the average runner to fitness enthusiasts who seek an intense workout at the gym. As users continue to use the application and input new workouts, they will receive progress updates in their pursuit towards a healthier lifestyle. FitNet is able to be implemented in any setting or lift stage. The user interface and software is designed intuitively, such that its features are easy to navigate for anyone, regardless of tech literacy or familiarity with exercise programs. Users can be middle-aged parents looking to improve their health for comfort reasons, young people getting into fitness as a hobby, or office workers in their mid-thirties trying to introduce some extra movement into their lives. 

## Core Team Members 
- [Joseph Kim](../../../../jk6236)
- [Colin McRae](../../../../crm584) 
- [Sydney Jo](../../../../selftimersyd)
- [Vanessa Chen](../../../../vc1530)
- [Isaac Singer](../../../../iwillseeyouinabits)
- [Yousuf Kidwai](../../../../yousufkidwai) 

## Short History 
Social media has long been the source of many of our fitness inspirations. According to a recent [study](https://www.forbes.com/sites/petersuciu/2019/11/06/is-social-media-the-best-place-to-get-fitness-and-health-advice/?sh=48407e158614), 44% of Americans turn to Facebook, Twitter, Instagram, and YouTube for health, fitness, and diet advice. However, in conjunction with the misinformation and false advertising often showcased on such platforms, viewing fitness-related content on Facebook or Twitter could result in engaging in a toxic environment that is not productive and possibly damaging to one’s health journey. 

FitNet was inspired by this lack of existing fitness social media platforms. By only showing users fitness-related content, FitNet ensures a welcoming environment that encourages social connection and motivation from watching others’ health journeys take shape. Additionally, users are able to document their own progress to see for oneself or share with others, keeping track of individual workouts or curating workout playlists to better personalize their fitness experience. 

## Building and testing 
To test this project: 
1. Clone the project repository: `git clone <url` 
### Run the front-end 
Navigate into the front-end directory and 
1. `npm install`
2. `npm start` 

Alternatively, the front-end can be started as a Docker container. Make sure Docker has been installed locally, then run 
```
docker run -p 4000:4000 -d vnsachn/fitnet-front-end
```
Navigate to localhost:4000 and you should see the front-end running. 

### Run the back-end 

Navigate into the back-end directory and 
1. `npm install` 
2. `nodemon server` 
Alternatively, start the back-end as a container: 
```
docker run -p 3000:3000 --restart unless-stopped -d vnsachn/fitnet-back-end
```
Navigate to localhost:3000 and you should see the back-end running. 

## For Potential Contributors 
If you would like to correct any bugs in our code or add new functionalities feel free to do so by following [these](./CONTRIBUTING.md) instructions.  
