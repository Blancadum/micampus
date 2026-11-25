# Etapa 1: Empaquetar backend Spring Boot (incluye frontend compilado en src/main/resources/static)
FROM maven:3.9-eclipse-temurin-17 AS backend-build
WORKDIR /app
COPY pom.xml ./
COPY src ./src
RUN mvn -q -DskipTests clean package

# Etapa 2: Imagen ligera de ejecución (multi-arquitectura amd64/arm64)
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=backend-build /app/target/MiCampus.jar ./MiCampus.jar
ENV MICAMPUS_AUTO_OPEN_BROWSER=false
ENV SERVER_PORT=8090
EXPOSE 8090
ENTRYPOINT ["java", "-jar", "/app/MiCampus.jar"]
