# Simple placeholder Dockerfile for Spring Boot
FROM eclipse-temurin:17-jdk-alpine
WORKDIR /app
COPY target/studyace-backend.jar app.jar
ENTRYPOINT ["java","-jar","/app/app.jar"]
