FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 10000

ENTRYPOINT ["java", \
  "-Dspring.datasource.url=jdbc:postgresql://dpg-d8dbboojs32c73fda7q0-a.singapore-postgres.render.com/moneymanager_89ga", \
  "-Dspring.datasource.username=moneymanager_89ga_user", \
  "-Dspring.datasource.password=aSnjnUGJjAfvqrNZTh9TpaqBMtZI0A19", \
  "-Dserver.port=10000", \
  "-Dspring.mail.password=xsmtpsib-2e5954a9cf3588793392b400927ae6416a6547321def0766fea1c3e90e5e8e15-FPuT7DdDFuW2J85l", \
  "-jar", "target/moneymanager-0.0.1-SNAPSHOT.jar"]