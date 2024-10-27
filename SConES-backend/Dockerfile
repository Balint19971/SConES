FROM  gradle:8.5.0-jdk17-jammy
WORKDIR /workdir
COPY . ./
RUN gradle build -x check
CMD gradle bootRun
