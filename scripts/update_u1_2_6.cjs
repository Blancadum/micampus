const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '../public/data/ioc/lecciones/entornos.json');
const data = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

const topic = data.find(t => t.id === 'u1-2-5');
if (!topic) {
  console.error('Topic u1-2-5 not found!');
  process.exit(1);
}

topic.title = 'Ejemplos prácticos';
topic.subsections = [
  {
    id: '2-6-1-bicicletas',
    slug: '2-6-1-bicicletas',
    topicNum: '2.6.1',
    title: 'Bicicletas',
    isEac: false
  },
  {
    id: '2-6-2-flota-vehiculos',
    slug: '2-6-2-flota-vehiculos',
    topicNum: '2.6.2',
    title: 'Flota de Vehículos',
    isEac: false
  },
  {
    id: '2-6-3-eac1-festa-major',
    slug: '2-6-3-eac1-festa-major',
    topicNum: '2.6.3',
    title: 'EAC 1: Fiesta Mayor',
    isEac: true
  }
];

const tab1Content = `### Enunciado: Alquiler de bicicletas
> *Una empresa alquila bicicletas. De cada bicicleta se guarda código, marca y precioHora. Hay bicicletas normales y eléctricas (de estas últimas guardamos su autonomía). Los clientes tienen DNI y nombre. Un cliente puede realizar muchos alquileres; cada alquiler corresponde a un solo cliente y una sola bicicleta, guardando fechaInicio, fechaFin y precioFinal. Cada bicicleta tiene varias revisiones, que solo tienen sentido vinculadas a la bicicleta revisada, anotando fecha y observaciones.*

---

### Paso a paso de resolución:
1. **Identificar clases candidatas (Sustantivos clave):**
   \`Bicicleta\`, \`BicicletaElectrica\`, \`Cliente\`, \`Alquiler\`, \`Revision\`.
2. **Asignar atributos y operaciones:**
   - \`Bicicleta\`: \`- codigo: String\`, \`- marca: String\`, \`- precioHora: double\`.
   - \`BicicletaElectrica\`: \`- autonomia: int\`.
   - \`Cliente\`: \`- dni: String\`, \`- nombre: String\`.
   - \`Alquiler\`: \`- fechaInicio: LocalDate\`, \`- fechaFin: LocalDate\`, \`- precioFinal: double\`.
   - \`Revision\`: \`- fecha: LocalDate\`, \`- observaciones: String\`.
3. **Identificar generalización (Herencia):**
   \`BicicletaElectrica\` es una \`Bicicleta\` (\`is-a\`). Flecha de generalización apuntando a \`Bicicleta\`.
4. **Calcular multiplicidades de asociaciones:**
   - \`Cliente [1] ----- [0..*] Alquiler\` (un cliente puede realizar 0 o muchos alquileres; cada alquiler pertenece a 1 cliente).
   - \`Alquiler [0..*] ----- [1] Bicicleta\` (un alquiler corresponde a 1 bicicleta; una bicicleta puede alquilarse muchas veces).
5. **Detectar relaciones todo-parte (Composición):**
   Las revisiones no tienen sentido sin la bicicleta a la que pertenecen ➔ Rombo relleno ♦ en \`Bicicleta\` hacia \`Revision [0..*]\`.
6. **Revisión final:**
   Comprobar nombres en singular, visibilidad privada (\`-\`) en todos los atributos y multiplicidades coherentes en ambos sentidos.

\`\`\`text
       ┌────────────────────────┐
       │       Bicicleta        │
       ├────────────────────────┤
       │ - codigo: String       │
       │ - marca: String        │
       │ - precioHora: double   │
       └───────────┬────────────┘
                   ▲ (Herencia)
       ┌───────────┴────────────┐
       │   BicicletaElectrica   │
       ├────────────────────────┤
       │ - autonomia: int       │
       └────────────────────────┘

  Cliente [1] ──── 0..* [Alquiler] 0..* ──── [1] Bicicleta [1] ♦──── 0..* [Revision]
\`\`\``;

const tab2Content = `### Enunciado: Gestión de Flota de Vehículos (Caso de Refuerzo PAF)
> *"Una empresa de alquiler de vehículos desea modelar su sistema informático. Dispone de Vehículos identificados por matrícula, marca, modelo y precioBaseDiario. Existen dos categorías de vehículos: Turismos (de los que interesa el número de plazas) y Furgonetas (de las que se registra su capacidad de carga en kg). Los Clientes tienen DNI, nombre, teléfono y correo electrónico. Un cliente formaliza uno o varios Alquileres; cada alquiler se realiza para un único vehículo y cliente en unas fechas determinadas (fechaInicio y fechaFin), calculando el importeTotal. Por cada alquiler se emite obligatoriamente una Factura (con númeroFactura, fechaEmision e importeNeto); si un alquiler se cancela o elimina, la factura asociada deja de existir. Por otro lado, los vehículos pasan periódicamente Revisiones Técnicas (con fechaRevision, kilometraje y coste); cada revisión es realizada por un Taller Mecánico homologado (con CIF, nombreTaller y teléfono). Las revisiones forman parte inseparable del historial del vehículo."*

---

#### Paso 1: Extracción de Clases Candidatas (Sustantivos del Negocio)
Identificamos las entidades con identidad propia y atributos:
1. \`Vehiculo\` (Clase base del catálogo)
2. \`Turismo\` (Subclase especializada de Vehiculo)
3. \`Furgoneta\` (Subclase especializada de Vehiculo)
4. \`Cliente\` (Actor / entidad externa contratante)
5. \`Alquiler\` (Transacción con fechas e importes)
6. \`Factura\` (Documento fiscal derivado del alquiler)
7. \`RevisionTecnica\` (Registro de mantenimiento de la máquina)
8. \`Taller\` (Proveedor homologado de servicio técnico)

#### Paso 2: Asignación de Atributos, Tipos y Encapsulación
> ⚠️ **Regla de corrección PAF:** Los atributos deben estar siempre encapsulados (\`-\` privado) y los métodos accesibles (\`+\` público):

| Clase | Visibilidad y Atributos UML | Operaciones / Métodos Clave |
|---|---|---|
| **Vehiculo** | \`- matricula: String\`<br>\`- marca: String\`<br>\`- modelo: String\`<br>\`- precioBaseDiario: double\` | \`+ calcularPrecio(dias: int): double\`<br>\`+ getMatricula(): String\` |
| **Turismo** | \`- numPlazas: int\` | \`+ getNumPlazas(): int\` |
| **Furgoneta** | \`- capacidadCargaKg: double\` | \`+ getCapacidadCargaKg(): double\` |
| **Cliente** | \`- dni: String\`<br>\`- nombre: String\`<br>\`- telefono: String\`<br>\`- email: String\` | \`+ getDni(): String\`<br>\`+ getNombre(): String\` |
| **Alquiler** | \`- idAlquiler: int\`<br>\`- fechaInicio: LocalDate\`<br>\`- fechaFin: LocalDate\`<br>\`- diasAlquiler: int\`<br>\`- importeTotal: double\` | \`+ liquidarAlquiler(): double\`<br>\`+ generarFactura(): Factura\` |
| **Factura** | \`- numFactura: String\`<br>\`- fechaEmision: LocalDate\`<br>\`- importeNeto: double\`<br>\`- iva: double\` | \`+ emitir(): void\`<br>\`+ imprimirPDF(): byte[]\` |
| **RevisionTecnica** | \`- idRevision: int\`<br>\`- fechaRevision: LocalDate\`<br>\`- kilometraje: int\`<br>\`- coste: double\` | \`+ getCoste(): double\` |
| **Taller** | \`- cif: String\`<br>\`- nombreTaller: String\`<br>\`- telefono: String\` | \`+ getCif(): String\` |

#### Paso 3: Identificación de Jerarquías de Herencia (Generalización)
- Tanto \`Turismo\` como \`Furgoneta\` **son** vehículos (\`is-a\`).
- Comparten los atributos comunes (\`matricula\`, \`marca\`, \`modelo\`, \`precioBaseDiario\`).
- En el diagrama se dibuja una flecha de punta triangular cerrada (◁) desde las subclases hacia la superclase \`Vehiculo\`.

#### Paso 4: Detección de Composición vs Agregación (Criterio Fundamental de Examen)
- **Alquiler ♦--- Factura (Composición):** La factura no tiene razón de existir sin un alquiler que la origine. Su ciclo de vida depende 100% de la existencia del alquiler. Rombo negro relleno (♦) en el lado de \`Alquiler\`.
- **Vehiculo ♦--- RevisionTecnica (Composición):** Una revisión técnica no puede flotar suelta en el sistema; forma parte exclusiva del historial físico de ese vehículo concreto. Rombo negro relleno (♦) en \`Vehiculo\`.
- **RevisionTecnica --- Taller (Asociación Simple):** El taller es independiente. Si el taller cierra o cambia de CIF, la revisión técnica sigue existiendo en el historial del vehículo.

#### Paso 5: Cálculo Riguroso de Multiplicidades
1. \`Cliente [1] ------------ [0..*] Alquiler\`: Un cliente puede registrarse y no haber alquilado todavía (\`0..*\`), pero un alquiler pertenece estrictamente a 1 cliente (\`1\`).
2. \`Alquiler [0..*] -------- [1] Vehiculo\`: Un alquiler se realiza para 1 vehículo concreto (\`1\`). Un vehículo puede tener 0 o muchos alquileres sucesivos (\`0..*\`).
3. \`Alquiler [1] ♦---------- [1] Factura\`: Cada alquiler produce exactamente 1 factura oficial (\`1\`).
4. \`Vehiculo [1] ♦---------- [0..*] RevisionTecnica\`: Un vehículo nuevo puede no haber pasado revisiones (\`0..*\`), pero cada revisión pertenece a 1 solo vehículo (\`1\`).
5. \`RevisionTecnica [0..*] - [1] Taller\`: Una revisión es firmada por 1 taller (\`1\`); un taller puede haber realizado muchas revisiones para nuestra flota (\`0..*\`).

#### Paso 6: Diagrama Estructural Completo

\`\`\`text
                           ┌──────────────────────────┐
                           │         Vehiculo         │
                           ├──────────────────────────┤
                           │ - matricula: String      │
                           │ - marca: String          │
                           │ - modelo: String         │
                           │ - precioBaseDiario: dbl  │
                           ├──────────────────────────┤
                           │ + calcularPrecio(dias)   │
                           └────────────┬─────────────┘
                                        ▲ (Herencia)
                           ┌────────────┴────────────┐
                           │                         │
                ┌──────────┴──────────┐   ┌──────────┴──────────┐
                │       Turismo       │   │      Furgoneta      │
                ├─────────────────────┤   ├─────────────────────┤
                │ - numPlazas: int    │   │ - cargaKg: double   │
                └─────────────────────┘   └─────────────────────┘

  ┌───────────────┐           1..1         0..* ┌─────────────────────────┐
  │    Cliente    │ ─────────────────────────── │        Alquiler         │
  ├───────────────┤                             ├─────────────────────────┤
  │ - dni: String │                             │ - idAlquiler: int       │
  │ - nombre: Str │                             │ - fechaInicio: LocalDate│
  └───────────────┘                             │ - fechaFin: LocalDate   │
                                                ├─────────────────────────┤
                                                │ + liquidar(): double    │
                                                └────────────┬────────────┘
                                                             │ 1..1 (♦ Comp.)
                                                             ▼
                                                ┌─────────────────────────┐
                                                │         Factura         │
                                                ├─────────────────────────┤
                                                │ - numFactura: String    │
                                                │ - importeNeto: double   │
                                                └─────────────────────────┘

           Vehiculo [1] ♦────── 0..* [RevisionTecnica] 0..* ────── 1 [Taller]
\`\`\``;

const tab3Content = `### 🎯 Enunciado Oficial EAC 1: Comisión de la Fiesta Mayor (Festa Major)

> *«Sois contratados como analistas y desarrolladores del sistema para la Comisión de la Fiesta Mayor (Festa Major) de una ciudad con una gran tradición y un rico patrimonio festivo. El objetivo es organizar la información de las diferentes comparsas (colles) del Bestiario (la Mulassa, el Àliga, el Bou, ...), de los Bailes (de Pastorets, de Cossis, de Cercolets, de Gitanes, ...), Gigantes (nous, vells, ...) y sus ensayos y actuaciones. A partir de la descripción siguiente, cread un diagrama de clases UML utilizando el software Papyrus. Aseguraos de que la cardinalidad y la visibilidad de los atributos y operaciones (si las hay) son correctas. Recordad que no debéis representar ni los getters ni los setters y que los nombres de las clases deben estar en singular.*
>
> **Descripción del sistema:**
> 1. **Elemento Festivo:** Cada baile o elemento (Gegants, Bastoners, Cercolets, Diables, Castellers) tiene un nombre del elemento, un año de recuperación o fundación, una categoría (fuego, baile hablado, bestiario, colla castellera, baile tradicional, ...) que es una cadena de caracteres y el número mínimo de participantes requerido.
> 2. **Miembros:** Cada integrante tiene un DNI, un nombre, una edad, un teléfono y un rol principal (ballador/a, músic/a, portador/a, ...) que es una cadena de caracteres. Los miembros pueden participar en múltiples ensayos.
> 3. **Jefe de Comparsa (Cap de Colla):** Es el responsable del elemento festivo y toma las decisiones. Es un tipo de miembro con experiencia destacada del que se quiere saber la fecha en que fue elegido para el cargo.
> 4. **Coordinación de Cultura:** Es una entidad municipal que tiene un nombre y una dirección de sede. Organiza las fiestas y supervisa los diferentes elementos festivos.
> 5. **Ensayo:** Cada ensayo relaciona un Elemento Festivo con los Miembros que participan en él. Tiene atributos propios como la fecha, la hora de inicio y la duración en minutos.
> 6. **Actuación:** Es la salida pública de uno o más elementos festivos (Cercavila, Diada Castellera, Seguici, Correfoc, ...). Cada actuación tiene un nombre, una fecha y la ubicación o recorrido. Las actuaciones son organizadas por la Coordinación de Cultura.»*

---

#### 📋 Paso 1: Identificación y Extracción de Entidades Clave (en singular)
1. \`ElementFestiu\`: Representa el baile, bestiario, gigantes o colla castellera.
2. \`Membre\`: Persona integrante de una comparsa festiva.
3. \`CapDeColla\`: Especialización de \`Membre\` (subclase con fecha de elección y responsabilidad del elemento).
4. \`CoordinacioCultura\`: Órgano gestor municipal supervisor.
5. \`Assaig\`: Ensayo programado donde interactúan el elemento festivo y los miembros participantes.
6. \`Actuacio\`: Salida o evento festivo en el que participan uno o varios elementos festivos y que organiza la Coordinación de Cultura.

---

#### 📊 Paso 2: Especificación de Atributos UML (Visibilidad Privada \`-\`)
> ⚠️ **Norma estricta de la EAC 1 de la IOC:**  
> - Nombres en singular (\`ElementFestiu\`, no \`ElementsFestius\`).  
> - **NO representar ni getters ni setters** en el diagrama de clases (penalización explícita en la rúbrica).  
> - Cada atributo debe llevar visibilidad (\`-\`) y tipo de dato.

| Clase | Visibilidad y Atributos UML | Rol en el Dominio |
|---|---|---|
| **ElementFestiu** | \`- nomElement: String\`<br>\`- anyRecuperacio: int\`<br>\`- categoria: String\`<br>\`- minParticipants: int\` | Entidad central del patrimonio festivo. |
| **Membre** | \`- dni: String\`<br>\`- nom: String\`<br>\`- edat: int\`<br>\`- telefon: String\`<br>\`- rolPrincipal: String\` | Integrante base de comparsa. |
| **CapDeColla** | \`- dataEleccio: Date\` (o \`LocalDate\`) | Subclase especializada de \`Membre\`. |
| **CoordinacioCultura** | \`- nom: String\`<br>\`- adrecaSeu: String\` | Entidad municipal organizadora. |
| **Assaig** | \`- data: Date\`<br>\`- horaInici: String\` (o \`LocalTime\`)<br>\`- duracioMinuts: int\` | Sesión de preparación y ensayo. |
| **Actuacio** | \`- nom: String\`<br>\`- data: Date\`<br>\`- ubicacioRecorregut: String\` | Salida pública en plaza o calle. |

---

#### 🧬 Paso 3: Jerarquía de Herencia (Generalización ◁)
* **\`CapDeColla\` hereda de \`Membre\` (\`CapDeColla is-a Membre\`):**  
  El Jefe de Comparsa es un miembro cualificado de la colla. Recibe por herencia su DNI, nombre, edad, teléfono y rol, añadiendo su atributo exclusivo \`dataEleccio\`.  
  En Papyrus: Se dibuja una flecha de punta triangular cerrada (◁) desde \`CapDeColla\` apuntando a \`Membre\`.

---

#### 🔗 Paso 4: Relaciones Estructurales y Multiplicidades
1. **\`ElementFestiu [1] <─── liderat per ─── [1] CapDeColla\`:**  
   Cada elemento festivo tiene asignado exactamente 1 Jefe de Comparsa responsable (\`1..1\`).
2. **\`ElementFestiu [1] ──── [0..*] Assaig\`:**  
   Un elemento festivo convoca y celebra múltiples ensayos (\`0..*\`), pero cada ensayo corresponde a 1 elemento festivo (\`1\`).
3. **\`Assaig [0..*] ──── [1..*] Membre\`:**  
   En un ensayo participan varios miembros (\`1..*\`), y un miembro puede asistir a múltiples ensayos a lo largo del año (\`0..*\`).
4. **\`CoordinacioCultura [1] ──── supervisa ──── [1..*] ElementFestiu\`:**  
   La entidad municipal supervisa a los elementos festivos de la fiesta mayor (\`1..*\`).
5. **\`CoordinacioCultura [1] ──── organitza ──── [1..*] Actuacio\`:**  
   La Coordinación de Cultura organiza todas las actuaciones oficiales (\`1..*\`).
6. **\`Actuacio [0..*] ──── participen ──── [1..*] ElementFestiu\`:**  
   En una actuación pública (como el Seguici o la Diada) pueden salir uno o más elementos festivos (\`1..*\`), y un elemento participa en diversas actuaciones a lo largo de las fiestas (\`0..*\`).

---

#### 📐 Paso 5: Diagrama de Clases UML para Eclipse Papyrus

\`\`\`text
 ┌──────────────────────────┐               1..*          1 ┌──────────────────────────┐
 │    CoordinacioCultura    │ ────────────────────────────> │      ElementFestiu       │
 ├──────────────────────────┤  supervisa                    ├──────────────────────────┤
 │ - nom: String            │                               │ - nomElement: String     │
 │ - adrecaSeu: String      │                               │ - anyRecuperacio: int    │
 └────────────┬─────────────┘                               │ - categoria: String      │
              │ 1 (organitza)                               │ - minParticipants: int  │
              │                                             └───────┬────────────┬─────┘
              ▼ 1..*                                        1 (té)  │            │ 1 (convoca)
 ┌──────────────────────────┐                                       │            ▼ 0..*
 │         Actuacio         │ 0..*                      1..*        │ ┌──────────────────────────┐
 ├──────────────────────────┤ <─────────────────────────────────────┘ │          Assaig          │
 │ - nom: String            │           participen en                 ├──────────────────────────┤
 │ - data: Date             │                                         │ - data: Date             │
 │ - ubicacioRecorregut: Str│                                         │ - horaInici: String      │
 └──────────────────────────┘                                         │ - duracioMinuts: int     │
                                                                      └───────────┬──────────────┘
                                                                            0..*  │ (assisteixen)
                                                                                  │
                                                                                  ▼ 1..*
 ┌──────────────────────────┐          responsable de (1)             ┌──────────────────────────┐
 │        CapDeColla        │ ──────────────────────────────────────> │          Membre          │
 ├──────────────────────────┤                                         ├──────────────────────────┤
 │ - dataEleccio: Date      │                                         │ - dni: String            │
 └────────────┬─────────────┘                                         │ - nom: String            │
              │                                                       │ - edat: int              │
              └─────────────────────────────▲─────────────────────────│ - telefon: String        │
                                   hereda de (◁)                      │ - rolPrincipal: String   │
                                                                      └──────────────────────────┘
\`\`\`

---

#### 📦 Paso 6: Entregables solicitados para el Ejercicio 1
1. **\`Exercici1.png\`:** Captura nítida exportada directamente desde Papyrus (\`File\` ➔ \`Save As Image File...\`).
2. **\`Exercici1.zip\`:** Carpeta con los esqueletos de código Java generados con Papyrus Software Designer (\`Designer\` ➔ \`Generate code\` ➔ \`Java\`).

> 💡 **Nota de Continuidad con el Ejercicio 2 de la EAC 1:**  
> En el Ejercicio 2 de la EAC 1 se modela el **Bestiario de Fuego y Pirotecnia** (\`EquipamentFestiu\`, \`BestiaDeFoc\`, \`Ceptrot\`, \`Diable\`, etc.), aplicando la misma técnica con herencia de equipamiento y composición de surtidores.`;

topic.folderArchive = {
  folderTitle: 'Dossier de Ejemplos Prácticos de Clases (UML)',
  folderIcon: '📂',
  tabs: [
    {
      id: '2-6-1-bicicletas',
      slug: '2-6-1-bicicletas',
      label: '1. Bicicletas',
      icon: '🚲',
      title: 'Ejemplo 1: Alquiler de Bicicletas',
      subtitle: 'Modelado paso a paso con clases, herencia y composición básica',
      isEac: false,
      contentMd: tab1Content
    },
    {
      id: '2-6-2-flota-vehiculos',
      slug: '2-6-2-flota-vehiculos',
      label: '2. Flota de Vehículos',
      icon: '🚗',
      title: 'Ejemplo 2: Flota de Vehículos (Refuerzo PAF)',
      subtitle: 'Modelado avanzado con herencia múltiple, facturación dependiente y talleres',
      isEac: false,
      contentMd: tab2Content
    },
    {
      id: '2-6-3-eac1-festa-major',
      slug: '2-6-3-eac1-festa-major',
      label: '3. EAC 1: Fiesta Mayor',
      icon: '🎯',
      title: 'Ejemplo 3 (EAC 1 Oficial): Comisión de la Fiesta Mayor',
      subtitle: 'Enunciado Oficial de Entrega de la Unidad 1 (Ejercicio 1 de la Memoria EAC 1)',
      isEac: true,
      contentMd: tab3Content
    }
  ]
};

// Fallback contentMd for standard markdown viewers
topic.contentMd = `Para resolver enunciados de examen o prácticas evaluables sin atascarse, organiza el trabajo siguiendo los 6 pasos metódicos (extracción de sustantivos, atributos encapsulados, herencia \`is-a\`, relaciones de composición vs asociación y cálculo de multiplicidades bidireccionales).

A continuación dispones de la **Carpeta de Ejemplos Prácticos** organizada en pestañas archivadoras con los 3 casos representativos:

1. **Bicicletas:** Caso pedagógico introductorio del temario.
2. **Flota de Vehículos:** Caso de refuerzo avanzado para las pruebas presenciales PAF.
3. **EAC 1: Comisión de la Fiesta Mayor:** El enunciado oficial evaluable de la entrega oficial de la Unidad 1.`;

fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf8');
console.log('Successfully updated entornos.json with 3 practical examples in folderArchive!');
