docker run -it \
-e 'SONAR_API_HOST=https://nemo.sonarqube.org' \
-e 'SONAR_API_RESOURCE_KEY=org.codehaus.sonar-plugins:ebcdic-ascii-converter' \
-e 'SLACK_API_TOKEN=placeholder' \
-p 80:80 fvierbergen/jarvis-slackbone \
node --use_strict app.js --slackbot