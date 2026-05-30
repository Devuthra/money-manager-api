FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY . .

RUN chmod +x mvnw
RUN ./mvnw clean package -DskipTests

EXPOSE 10000

ENV SPRING_DATASOURCE_URL=jdbc:postgresql://dpg-d8dbboojs32c73fda7q0-a.singapore-postgres.render.com/moneymanager_89ga
ENV SPRING_DATASOURCE_USERNAME=moneymanager_89ga_user
ENV SPRING_DATASOURCE_PASSWORD=aSnjnUGJjAfvqrNZTh9TpaqBMtZI0A19
ENV SERVER_PORT=10000

ENTRYPOINT ["java","-jar","target/moneymanager-0.0.1-SNAPSHOT.jar"]