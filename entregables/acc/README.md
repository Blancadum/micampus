# 🚀 Entregables Bootcamp Spring Boot · Accenture (L2E)

Repositorio local de proyectos prácticos para las 12 entregas oficiales de Accenture (L2E).

---

## 🧭 Estado de Progreso en Tiempo Real
Puedes consultar el archivo [`PROGRESS.json`](file:///Users/blanca/Micampus/entregables/acc/PROGRESS.json) o preguntarme directamente en el chat:
> **"¿Por dónde voy?"** o **"¿Qué me falta en este entregable?"**
El agente revisará el estado de tus carpetas y clases Java para indicarte tu avance exacto.

| # | Entregable | Proyecto | Tema Clave | Estado | ID L2E |
|---|---|---|---|:---:|:---:|
| 1 | **Entregable 1 de ACC** | `JavaSpringIoC` | IoC Container + Beans XML | 🟢 Inicializado / Probado | [8537](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8537) |
| 2 | **Entregable 2 de ACC** | `JavaSpringIoD` | Inyección de Dependencias | ⚪ Pendiente | [8539](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8539) |
| 3 | **Entregable 3 de ACC** | `JavaSpringAnnotations` | Configuración con Anotaciones | ⚪ Pendiente | [8540](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8540) |
| 4 | **Entregable 4 de ACC** | `JavaSpringConfig` | Configuración Java @Bean | ⚪ Pendiente | [8541](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8541) |
| 5 | **Entregable 5 de ACC** | `SpringBootEntorno` | Preparación Entorno y Starters | ⚪ Pendiente | [8542](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8542) |
| 6 | **Entregable 6 de ACC** | `SpringBootREST` | Controladores REST | ⚪ Pendiente | [8543](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8543) |
| 7 | **Entregable 7 de ACC** | `SpringBootService` | Capa de Servicio (@Service) | ⚪ Pendiente | [8544](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8544) |
| 8 | **Entregable 8 de ACC** | `SpringBootJPA` | Entidades Relacionales JPA | ⚪ Pendiente | [8545](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8545) |
| 9 | **Entregable 9 de ACC** | `SpringBootRepositories` | Repositorios Spring Data JPA | ⚪ Pendiente | [8546](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8546) |
| 10 | **Entregable 10 de ACC** | `SpringBootDTO` | Patrón DTO | ⚪ Pendiente | [8547](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8547) |
| 11 | **Entregable 11 de ACC** | `SpringBootValidations` | Bean Validation (@Valid) | ⚪ Pendiente | [8548](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8548) |
| 12 | **Entregable 12 de ACC** | `SpringBootExceptions` | Manejo Global de Errores | ⚪ Pendiente | [8549](https://l2eportal-lms.cclearning.accenture.com/mod/assign/view.php?id=8549) |

---

## 🛠️ Comandos Útiles

### 1. Probar el proyecto (Tests unitarios)
```bash
cd "entregable-01-ioc/Spring Boot - Uso de IoC - Blanca Perez"
mvn test
```

### 2. Ejecutar la clase Main
```bash
cd "entregable-01-ioc/Spring Boot - Uso de IoC - Blanca Perez"
mvn compile exec:java -Dexec.mainClass="com.accenture.main.Main"
```

### 3. Subir a Git (Rama Oficial `SPRING-BOOT`)
```bash
git checkout SPRING-BOOT
git add "Spring Boot - Uso de IoC - Blanca Perez"
git commit -m "feat(act1): entrega uso IoC Spring con XML"
git push origin SPRING-BOOT
```

### 4. Empaquetar en ZIP para subir a L2E
El archivo ya está generado en `entregable-01-ioc/Spring Boot - Uso de IoC - Blanca Perez.zip`. Si necesitas regenerarlo:
```bash
cd entregable-01-ioc
mvn clean --file "Spring Boot - Uso de IoC - Blanca Perez/pom.xml"
zip -r "Spring Boot - Uso de IoC - Blanca Perez.zip" "Spring Boot - Uso de IoC - Blanca Perez" -x "*/target/*" -x "*/.DS_Store"
```
