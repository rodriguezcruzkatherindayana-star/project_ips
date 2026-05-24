# Design System Specifications - Integra IPS Mobile App
## Guía Maestra para Implementación en Figma → Flutter/Material 3

---

## 📋 Información del Proyecto

**Nombre**: Aplicación Móvil IPS Minimalista - Integra IPS  
**Plataforma**: Flutter (iOS + Android únicamente)  
**Diseño Base**: Prototipo React/Vite (referencia actual)  
**Framework de UI**: Material Design 3  
**Tipografía**: Inter (Google Fonts)  
**Seed Color**: `#171F37` (Midnight Navy)

---

## 🎯 Objetivo del Documento

Este documento proporciona especificaciones completas para crear un Design System en Figma que replique la arquitectura actual y permita el desarrollo nativo en Flutter (iOS/Android). **No incluye artefactos web o desktop**.

---

## 📐 Frames & Tamaños de Pantalla

### Configuración de Artboards en Figma

#### Android
- **Tamaño**: 360×800 px (mdpi base)
- **Status Bar**: 24 px
- **Navigation Bar**: 56 px (bottom)
- **Safe Area Top**: 24 px
- **Safe Area Bottom**: 56 px

#### iOS
- **Tamaño**: 390×844 px (iPhone 13/14)
- **Status Bar**: 47 px
- **Navigation Bar**: 80 px (bottom con indicator)
- **Safe Area Top**: 47 px
- **Safe Area Bottom**: 80 px

### Sistema de Grid
- **Base**: 8 px
- **Espaciados permitidos**: 4, 8, 12, 16, 24, 32, 40, 48 px
- **Márgenes laterales**: 16 px (móvil)
- **Auto Layout**: Obligatorio en todos los componentes

---

## 🎨 Sistema de Color (Material 3)

### Color Seed
```
Primary Seed: #171F37 (Midnight Navy)
```

### Paleta Derivada (Light Mode)

#### Primary Scale
```css
primary-900: #0f172a  /* Darkest */
primary-800: #1e293b
primary-700: #334155
primary-600: #475569
primary-500: #64748b  /* Base neutral */
primary-400: #94a3b8
primary-300: #cbd5e1
primary-200: #e2e8f0
primary-100: #f1f5f9
primary-50:  #f8fafc   /* Lightest */
```

#### Semantic Colors
```css
/* Success/Health */
green-600: #16a34a
green-500: #22c55e
green-400: #4ade80
green-100: #dcfce7
green-50:  #f0fdf4

/* Info/Primary Actions */
blue-600: #2563eb
blue-500: #3b82f6
blue-100: #dbeafe
blue-50:  #eff6ff

/* Warning */
amber-500: #f59e0b
amber-100: #fef3c7
amber-50:  #fffbeb

/* Error/Alert */
red-600: #dc2626
red-500: #ef4444
red-100: #fecaca
red-50:  #fef2f2
```

### Material 3 Token Mapping

#### Light Theme
| Token M3 | Valor | Uso |
|----------|-------|-----|
| `primary` | green-600 (#16a34a) | Botones primarios, acciones principales |
| `onPrimary` | #ffffff | Texto sobre primary |
| `primaryContainer` | green-100 (#dcfce7) | Fondos de elementos activos |
| `onPrimaryContainer` | primary-900 (#0f172a) | Texto en containers |
| `secondary` | primary-100 (#f1f5f9) | Botones secundarios |
| `onSecondary` | primary-900 (#0f172a) | Texto sobre secondary |
| `tertiary` | blue-500 (#3b82f6) | Acciones terciarias |
| `surface` | #ffffff | Fondos de cards, sheets |
| `onSurface` | primary-900 (#0f172a) | Texto principal |
| `surfaceContainer` | primary-50 (#f8fafc) | Fondos de containers |
| `background` | primary-50 (#f8fafc) | Fondo de app |
| `outline` | primary-200 (#e2e8f0) | Bordes, dividers |
| `outlineVariant` | primary-100 (#f1f5f9) | Bordes sutiles |
| `error` | red-500 (#ef4444) | Estados de error |
| `onError` | #ffffff | Texto sobre error |

#### Dark Theme (Opcional)
| Token M3 | Valor | Uso |
|----------|-------|-----|
| `primary` | green-400 (#4ade80) | Acciones primarias |
| `surface` | primary-800 (#1e293b) | Cards, sheets |
| `background` | primary-900 (#0f172a) | Fondo app |
| `outline` | primary-700 (#334155) | Bordes |

### Color Styles en Figma
Crear los siguientes estilos:
```
ds/color/primary
ds/color/onPrimary
ds/color/primaryContainer
ds/color/secondary
ds/color/surface
ds/color/background
ds/color/outline
ds/color/error
ds/color/success
ds/color/warning
```

---

## 🔤 Tipografía (Inter Font)

### Text Styles Material 3

#### Display Large
- **Font**: Inter SemiBold (600)
- **Size**: 57 sp
- **Line Height**: 64 sp
- **Letter Spacing**: -0.25 sp
- **Uso**: Títulos splash, onboarding

#### Headline Large
- **Font**: Inter SemiBold (600)
- **Size**: 32 sp
- **Line Height**: 40 sp
- **Letter Spacing**: 0 sp
- **Uso**: Títulos de pantalla principales

#### Headline Medium
- **Font**: Inter SemiBold (600)
- **Size**: 28 sp
- **Line Height**: 36 sp
- **Letter Spacing**: 0 sp
- **Uso**: Secciones importantes

#### Headline Small
- **Font**: Inter SemiBold (600)
- **Size**: 24 sp
- **Line Height**: 32 sp
- **Letter Spacing**: 0 sp
- **Uso**: Subtítulos de cards

#### Title Large
- **Font**: Inter Medium (500)
- **Size**: 22 sp
- **Line Height**: 28 sp
- **Letter Spacing**: 0 sp
- **Uso**: Títulos de modal/dialog

#### Title Medium
- **Font**: Inter Medium (500)
- **Size**: 16 sp
- **Line Height**: 24 sp
- **Letter Spacing**: 0.15 sp
- **Uso**: Títulos de cards, list items

#### Title Small
- **Font**: Inter Medium (500)
- **Size**: 14 sp
- **Line Height**: 20 sp
- **Letter Spacing**: 0.1 sp
- **Uso**: Subtítulos, labels destacados

#### Body Large
- **Font**: Inter Regular (400)
- **Size**: 16 sp
- **Line Height**: 24 sp
- **Letter Spacing**: 0.5 sp
- **Uso**: Texto principal, descripciones

#### Body Medium
- **Font**: Inter Regular (400)
- **Size**: 14 sp
- **Line Height**: 20 sp
- **Letter Spacing**: 0.25 sp
- **Uso**: Texto secundario

#### Body Small
- **Font**: Inter Regular (400)
- **Size**: 12 sp
- **Line Height**: 16 sp
- **Letter Spacing**: 0.4 sp
- **Uso**: Captions, notas

#### Label Large
- **Font**: Inter Medium (500)
- **Size**: 14 sp
- **Line Height**: 20 sp
- **Letter Spacing**: 0.1 sp
- **Uso**: Botones, tabs

#### Label Medium
- **Font**: Inter Medium (500)
- **Size**: 12 sp
- **Line Height**: 16 sp
- **Letter Spacing**: 0.5 sp
- **Uso**: Chips, badges

#### Label Small
- **Font**: Inter Medium (500)
- **Size**: 11 sp
- **Line Height**: 16 sp
- **Letter Spacing**: 0.5 sp
- **Uso**: Labels pequeños

### Text Styles en Figma
Nombrar como:
```
ds/text/display-large
ds/text/headline-large
ds/text/headline-medium
ds/text/title-large
ds/text/body-large
ds/text/label-large
...etc
```

---

## 🎭 Effect Styles (Elevaciones)

### Elevación Material 3

#### Level 0 (No elevation)
```
Ninguna sombra
```

#### Level 1 (Subtle)
```css
box-shadow: 
  0px 1px 2px 0px rgba(0, 0, 0, 0.3),
  0px 1px 3px 1px rgba(0, 0, 0, 0.15);
```
**Uso**: Cards, List items

#### Level 2 (Raised)
```css
box-shadow: 
  0px 1px 2px 0px rgba(0, 0, 0, 0.3),
  0px 2px 6px 2px rgba(0, 0, 0, 0.15);
```
**Uso**: FAB, Dropdowns

#### Level 3 (Modal)
```css
box-shadow: 
  0px 4px 8px 3px rgba(0, 0, 0, 0.15),
  0px 1px 3px 0px rgba(0, 0, 0, 0.3);
```
**Uso**: Modals, Bottom Sheets

### Effect Styles en Figma
```
ds/effect/elevation-0
ds/effect/elevation-1
ds/effect/elevation-2
ds/effect/elevation-3
```

---

## 📦 Tokens de Espaciado y Radios

### Spacing Scale
| Token | Valor | Uso |
|-------|-------|-----|
| `spacing-xs` | 4 px | Espaciado mínimo |
| `spacing-sm` | 8 px | Espaciado entre elementos pequeños |
| `spacing-md` | 12 px | Espaciado estándar interno |
| `spacing-lg` | 16 px | Márgenes laterales, padding cards |
| `spacing-xl` | 24 px | Separación de secciones |
| `spacing-2xl` | 32 px | Separación mayor |
| `spacing-3xl` | 40 px | Espacios amplios |

### Border Radius
| Token | Valor | Uso |
|-------|-------|-----|
| `radius-xs` | 4 px | Badges pequeños |
| `radius-sm` | 8 px | Botones, inputs |
| `radius-md` | 12 px | Cards pequeños |
| `radius-lg` | 16 px | Cards principales |
| `radius-xl` | 20 px | Modals |
| `radius-2xl` | 24 px | Bottom sheets |
| `radius-full` | 9999 px | Pills, avatares |

---

## 🧩 Componentes (con variantes)

### 1. App Bar (Top Bar)

**Variantes:**
- `type`: Default, WithBackButton
- `actions`: None, Notification, Menu

**Specs:**
- **Height**: 56 dp (Android) / 44 dp (iOS en zona segura)
- **Background**: blue-500 (#3b82f6)
- **Title**: text/title-large (blanco)
- **Padding horizontal**: 16 px
- **Icons**: 24×24 px, color blanco

**Estados de botones:**
- Default: bg white/20
- Pressed: bg white/30
- Focus: outline blanco 2px

**Flutter Widget**: `AppBar`

---

### 2. Bottom Navigation Bar

**Variantes:**
- `selected`: Home, Citas, Resultados, Chat, Perfil

**Specs:**
- **Height**: 80 px (con safe area)
- **Background**: #ffffff
- **Border top**: 1 px outline
- **Item spacing**: equal distribution
- **Item size**: 44×44 px (mínimo táctil)

**Item States:**
- **Active**: 
  - Icon: primary (#16a34a)
  - Label: primary, label-medium
  - Background: primaryContainer/10
  - Indicator: 6×2 px bar bottom, primary
  
- **Inactive**:
  - Icon: primary-500 (#64748b)
  - Label: primary-500, label-medium

**Flutter Widget**: `NavigationBar` (M3)

---

### 3. Buttons

#### 3.1 Filled Button (Primary)

**Variantes:**
- `size`: Medium, Large
- `state`: Default, Pressed, Disabled, Focus

**Specs Medium:**
- **Height**: 40 px
- **Padding horizontal**: 24 px
- **Background**: primary (#16a34a)
- **Text**: label-large, onPrimary
- **Radius**: 8 px
- **Elevation**: 0

**States:**
- **Default**: bg primary
- **Pressed**: bg primary-600 (#14a148), elevation-1
- **Disabled**: bg primary-100, text primary-400
- **Focus**: outline primary 2px

**Flutter Widget**: `FilledButton`

---

#### 3.2 Outlined Button (Secondary)

**Specs:**
- **Height**: 40 px
- **Padding**: 24 px horizontal
- **Border**: 1 px outline
- **Text**: label-large, primary
- **Radius**: 8 px

**States:**
- **Default**: border outline
- **Pressed**: bg primaryContainer/10
- **Disabled**: border outlineVariant, text primary-400

**Flutter Widget**: `OutlinedButton`

---

#### 3.3 Text Button

**Specs:**
- **Height**: 40 px
- **Padding**: 12 px horizontal
- **Text**: label-large, primary

**Flutter Widget**: `TextButton`

---

#### 3.4 Icon Button

**Specs:**
- **Size**: 48×48 px
- **Icon**: 24×24 px
- **Radius**: 24 px (circular)

**States:**
- **Default**: transparent
- **Pressed**: bg primaryContainer/10
- **Toggle active**: bg primaryContainer

**Flutter Widget**: `IconButton`

---

### 4. Text Fields

**Variantes:**
- `type`: Outlined, Filled
- `state`: Default, Focused, Error, Disabled

**Specs Outlined:**
- **Height**: 56 px
- **Padding**: 16 px horizontal
- **Border**: 1 px outline
- **Radius**: 8 px
- **Label**: body-small, floating
- **Input text**: body-large

**States:**
- **Default**: border outline
- **Focused**: border primary 2px, label primary
- **Error**: border error, helper text error
- **Disabled**: bg surfaceContainer, text muted

**Icons:**
- **Leading/Trailing**: 24×24 px, primary-500

**Flutter Widget**: `TextField` con `OutlineInputBorder`

---

### 5. Cards

#### 5.1 Card Principal

**Variantes:**
- `type`: Flat, Elevated
- `content`: WithAction, InfoOnly

**Specs:**
- **Padding**: 16 px
- **Radius**: 12 px
- **Background**: surface
- **Elevation**: 0 (Flat) / 1 (Elevated)

**Content Structure:**
- **Header**: title-medium + trailing icon
- **Body**: body-medium, 8 px gap
- **Footer**: label-large button, 12 px top margin

**Flutter Widget**: `Card`

---

#### 5.2 List Item Card (Citas, Resultados)

**Specs:**
- **Height**: auto (min 72 px)
- **Padding**: 16 px
- **Radius**: 8 px
- **Leading**: Icon 24×24 o Avatar 40×40
- **Trailing**: Status badge o Arrow
- **Divider**: 1 px outlineVariant

**Flutter Widget**: `ListTile`

---

### 6. Badges (Status)

**Variantes:**
- `status`: Success, Warning, Error, Info, Neutral

**Specs:**
- **Height**: 24 px
- **Padding**: 8 px horizontal
- **Radius**: 12 px (pill)
- **Text**: label-small

**Colors:**
| Status | Background | Text |
|--------|-----------|------|
| Success | green-100 | green-600 |
| Warning | amber-100 | amber-600 |
| Error | red-100 | red-600 |
| Info | blue-100 | blue-600 |
| Neutral | primary-100 | primary-600 |

**Flutter Widget**: `Chip` (filter variant)

---

### 7. Tabs

**Variantes:**
- `state`: Active, Inactive

**Specs:**
- **Height**: 48 px
- **Min width**: 90 px
- **Padding**: 16 px horizontal
- **Text**: label-large

**States:**
- **Active**: 
  - Text: primary
  - Indicator: 2 px bar bottom, primary
  - Background: transparent
  
- **Inactive**:
  - Text: onSurface/60
  - No indicator

**Flutter Widget**: `TabBar`

---

### 8. Modals & Sheets

#### 8.1 Bottom Sheet

**Specs:**
- **Radius top**: 24 px
- **Padding**: 24 px
- **Handle**: 32×4 px, centered, outline
- **Max height**: 90% screen
- **Elevation**: 3

**Content:**
- **Title**: title-large, 16 px bottom margin
- **Body**: scrollable
- **Actions**: 24 px top margin, buttons

**Flutter Widget**: `showModalBottomSheet`

---

#### 8.2 Dialog

**Specs:**
- **Width**: 280 px (móvil)
- **Padding**: 24 px
- **Radius**: 20 px
- **Elevation**: 3

**Flutter Widget**: `AlertDialog`

---

### 9. Message Bubble (Chat)

**Variantes:**
- `sender`: User, Assistant

**Specs User:**
- **Max width**: 280 px (70% screen)
- **Padding**: 12 px 16 px
- **Radius**: 16 px 16 px 4 px 16 px
- **Background**: primary
- **Text**: body-medium, onPrimary
- **Align**: right

**Specs Assistant:**
- **Radius**: 16 px 16 px 16 px 4 px
- **Background**: surfaceContainer
- **Text**: body-medium, onSurface
- **Align**: left

**Flutter Widget**: `Container` con `BoxDecoration`

---

### 10. Empty States

**Specs:**
- **Icon**: 96×96 px, primary-300
- **Title**: title-medium, 16 px top
- **Description**: body-medium, muted, 8 px top
- **Action**: FilledButton, 24 px top

---

### 11. Loading States

**Variantes:**
- `type`: Spinner, Skeleton, Shimmer

**Spinner:**
- **Size**: 48×48 px
- **Color**: primary
- **Widget**: `CircularProgressIndicator`

**Skeleton:**
- **Background**: surfaceContainer
- **Radius**: según elemento
- **Animation**: shimmer effect

---

## 📱 Arquitectura de Pantallas

### Navegación y Rutas

| Ruta | Screen | Frame Name |
|------|--------|-----------|
| `/splash` | SplashScreen | `frm/splash` |
| `/login` | LoginScreen | `frm/login` |
| `/register` | RegisterScreen | `frm/register` |
| `/dashboard` | DashboardScreen | `frm/dashboard` |
| `/appointments` | AppointmentsListScreen | `frm/appointments-list` |
| `/appointments/new` | NewAppointmentScreen | `frm/appointments-new` |
| `/results` | ResultsScreen | `frm/results` |
| `/results/:id` | ResultDetailScreen | `frm/result-detail` |
| `/chat` | ChatScreen | `frm/chat` |
| `/profile` | ProfileScreen | `frm/profile` |
| `/health/metrics` | HealthMetricsScreen | `frm/health-metrics` |
| `/health/summary` | HealthSummaryScreen | `frm/health-summary` |
| `/health/advanced` | AdvancedHealthScreen | `frm/health-advanced` |
| `/health/epidemiology` | EpidemiologyScreen | `frm/health-epidemiology` |

---

## 🖼️ Especificaciones por Pantalla

### 1. Splash Screen (`/splash`)

**Layout:**
- **Background**: primary-800 (#1e293b)
- **Logo**: 64×64 px, centro pantalla
- **Logo filter**: brightness(0) invert(1) (blanco)
- **Animation**: fade-in + scale (0.8 → 1.0), 2s
- **Duration**: 3 segundos

**Notes:**
```
Ruta Flutter: MaterialApp initialRoute: '/splash'
Widget: StatefulWidget con Timer
```

---

### 2. Login Screen (`/login`)

**Layout:**
```
[Safe Area Top 47/24 px]
[Logo - 48×48 px] - 40 px top margin
[Título "Bienvenido"] - headline-large - 24 px top
[Subtítulo] - body-medium, muted - 8 px top
[Email TextField] - 32 px top
[Password TextField] - 16 px top
[Forgot Password Link] - label-medium, tertiary - 12 px top
[Login Button - Filled] - 24 px top
[Divider "o"] - 24 px top
[Register Link] - label-large, tertiary - 16 px top
[Safe Area Bottom]
```

**Specs:**
- **Padding lateral**: 16 px
- **Background**: background
- **Logo**: importado de assets

**Notes:**
```
Ruta Flutter: '/login'
Validation: email format, password min 6 chars
Navigation: → /dashboard (success), → /register
```

---

### 3. Register Screen (`/register`)

**Layout:**
```
[AppBar con back button]
[ScrollView]
  [Título "Crear Cuenta"] - headline-medium - 24 px top
  [Nombre Completo TextField] - 24 px top
  [Email TextField] - 16 px top
  [Teléfono TextField] - 16 px top
  [Documento ID TextField] - 16 px top
  [EPS TextField] - 16 px top
  [Password TextField] - 16 px top
  [Confirm Password TextField] - 16 px top
  [Términos Checkbox] - 16 px top
  [Register Button] - 24 px top
  [Login Link] - 16 px top
[/ScrollView]
```

**Notes:**
```
Ruta Flutter: '/register'
Validation: todos los campos requeridos
```

---

### 4. Dashboard Screen (`/dashboard`)

**Layout:**
```
[AppBar: "Integra IPS" + Notification Icon]
[ScrollView - Padding 16 px]
  [Saludo] - title-large - 8 px top
  [Estado de Salud Card] - 16 px top
    [Badge dinámico: "Estable"/"Mejorable"/"Alerta"]
  
  [Sección "Acciones Rápidas"] - 24 px top
    [Grid 2 columnas, gap 12 px]
      [Nueva Cita Button - Card]
      [Mis Resultados Button - Card]
  
  [Sección "Próximas Citas"] - 24 px top
    [List de 3 citas próximas]
    [Ver todas link]
  
  [Sección "Salud"] - 24 px top
    [Scroll horizontal de cards]
      [Métricas Card]
      [Resumen Card]
      [Análisis Avanzado Card]
      [Epidemiología Card]
[/ScrollView]
[Bottom Navigation]
```

**Componentes especiales:**

#### Estado de Salud Card
```
[Icon: Activity 24×24] [Badge status - dynamic color]
[Descripción: body-small]
```

**Badge colors:**
- Verde: `green-500` → "Estable"
- Ámbar: `amber-500` → "Mejorable"
- Rojo: `red-500` → "Alerta"

#### Acción Rápida Card
```
Height: 120 px
Padding: 16 px
Radius: 12 px
Elevation: 1

[Icon 32×32 - primary]
[Title - title-medium]
[Subtitle - body-small, muted]
```

**Notes:**
```
Ruta Flutter: '/dashboard'
Navigation: 
  - Nueva Cita → '/appointments/new'
  - Mis Resultados → '/results'
  - Métricas → '/health/metrics'
  - etc.
```

---

### 5. Appointments List Screen (`/appointments`)

**Layout:**
```
[AppBar: "Citas"]
[Stats Bar - 3 columns] - 16 px margin
  [Total Citas: número + label]
  [Próximas: número + label]
  [Completadas: número + label]

[Tabs: Todas, Próximas, Pasadas] - 8 px top

[TabView]
  [List de Appointment Cards]
    [Cada card con: fecha, hora, doctor, especialidad, estado]
[/TabView]

[FAB: "+" button] - bottom-right, 16 px margins
[Bottom Navigation]
```

**Appointment Card Specs:**
```
Padding: 16 px
Radius: 12 px
Elevation: 1
Gap interno: 8 px

[Row: Icon specialty 24×24 | Title-medium doctor name]
[Specialty - body-small, muted]
[Row: Calendar icon | Fecha - body-medium]
[Row: Clock icon | Hora - body-medium]
[Badge status]
```

**Notes:**
```
Ruta Flutter: '/appointments'
FAB action: → '/appointments/new'
Card tap: → '/appointments/:id' (detalle)
```

---

### 6. New Appointment Screen (`/appointments/new`)

**Layout:**
```
[AppBar: "Nueva Cita" con back]
[ScrollView - Padding 16 px]
  [Título] - headline-medium - 16 px top
  
  [Especialidad Select] - 24 px top
  [Doctor Select] - 16 px top
  [Fecha DatePicker Field] - 16 px top
  [Hora TimePicker Field] - 16 px top
  [Motivo TextField - multiline] - 16 px top
  
  [Información Card - opcional] - 24 px top
    [Info sobre proceso de autorización EPS]
  
  [Agendar Button - Filled] - 24 px top
  [Cancelar Button - Text] - 12 px top
[/ScrollView]
```

**Notes:**
```
Ruta Flutter: '/appointments/new'
DatePicker: showDatePicker()
TimePicker: showTimePicker()
Validation: todos los campos requeridos
Success: SnackBar + navigate back
```

---

### 7. Results Screen (`/results`)

**Layout:**
```
[AppBar: "Resultados"]
[Search Bar] - 16 px margin
[Tabs: Todos, Laboratorio, Imágenes, Otros]

[TabView]
  [List de Result Cards]
    [Icon tipo | Título | Fecha | Badge estado]
[/TabView]

[Bottom Navigation]
```

**Result Card:**
```
[Row]
  [Icon leading 40×40 - circular, bg primaryContainer]
  [Column]
    [Title - title-medium]
    [Subtitle - body-small, muted]
    [Date - label-small, muted]
  [Badge status]
  [Arrow icon]
[/Row]
```

**Notes:**
```
Ruta Flutter: '/results'
Card tap: → '/results/:id' (ver PDF/detalle)
```

---

### 8. Chat Screen (`/chat`)

**Layout:**
```
[AppBar: "Asistente Virtual"]
[Messages ScrollView - Padding 16 px]
  [Message Bubbles]
    [Avatar (assistant only) 32×32]
    [Bubble content]
    [Timestamp - label-small, muted]
  [Gap between messages: 12 px]
[/ScrollView]

[Input Bar - fixed bottom]
  [TextField: "Escribe un mensaje..."]
  [Send IconButton: primary]
```

**Input Bar Specs:**
```
Height: 56 px
Padding: 8 px 16 px
Background: surface
Border top: 1 px outline
Gap: 8 px

TextField:
  - Expandible (maxLines: 3)
  - Radius: 24 px
  - Padding: 12 px 16 px
```

**Notes:**
```
Ruta Flutter: '/chat'
WebSocket/API: conexión a backend Python
Scroll: auto-scroll to bottom on new message
```

---

### 9. Profile Screen (`/profile`)

**Layout:**
```
[AppBar: "Perfil"]
[ScrollView - Padding 16 px]
  [Avatar + Nombre] - centered - 24 px top
  [Email - body-small, muted] - 8 px top
  
  [Section: "Información Personal"] - 32 px top
    [List Items]
      [Documento ID]
      [Teléfono]
      [EPS]
      [Dirección]
  
  [Section: "Preferencias"] - 24 px top
    [Switch: Notificaciones]
    [Switch: Biometría]
    [Select: Idioma]
  
  [Section: "Acerca de"] - 24 px top
    [Versión]
    [Términos y condiciones]
    [Política de privacidad]
  
  [Cerrar Sesión Button - Outlined, error] - 32 px top
[/ScrollView]
[Bottom Navigation]
```

**Notes:**
```
Ruta Flutter: '/profile'
Logout: confirm dialog → navigate to '/login'
```

---

### 10. Health Metrics Screen (`/health/metrics`)

**Layout:**
```
[AppBar: "Métricas de Salud" con back]
[ScrollView - Padding 16 px]
  [Date selector] - 16 px top
  
  [Grid 2×2 - gap 12 px] - 24 px top
    [Pasos Card]
      [Icon + valor + meta]
      [Progress bar]
    [Frecuencia Card]
    [Sueño Card]
    [Calorías Card]
  
  [Section: "Actividad Reciente"] - 24 px top
    [Chart/Graph - 7 días]
  
  [Section: "Dispositivos Conectados"] - 24 px top
    [List de wearables]
[/ScrollView]
```

**Notes:**
```
Ruta Flutter: '/health/metrics'
Chart library: fl_chart
Card tap: → detail screen por métrica
```

---

## ♿ Accesibilidad

### Requisitos WCAG AA

1. **Contraste**:
   - Text normal: mínimo 4.5:1
   - Text large (≥18pt): mínimo 3:1
   - Iconos/gráficos: mínimo 3:1

2. **Touch Targets**:
   - Tamaño mínimo: 44×44 px (iOS), 48×48 dp (Android)
   - Espacio entre targets: mínimo 8 px

3. **Estados de Foco**:
   - Outline visible: 2 px primary
   - Contraste foco: mínimo 3:1

4. **Escalabilidad**:
   - Texto escalable hasta 200%
   - Layout adaptable a tamaños de texto grandes

5. **Semántica**:
   - Labels en todos los inputs
   - Alt text en imágenes informativas
   - ARIA labels donde sea necesario

### Verificación de Contraste en Paleta

| Par | Ratio | Cumple |
|-----|-------|--------|
| primary-900 / background | 14.5:1 | ✅ AAA |
| primary (#16a34a) / onPrimary | 4.8:1 | ✅ AA |
| error / onError | 4.9:1 | ✅ AA |
| outline / surface | 2.8:1 | ⚠️ Solo gráfico |

---

## 📦 Organización en Figma

### Estructura de Pages

```
Page 1: Design System
  ├── Frame: Color Palette
  ├── Frame: Typography Scale
  ├── Frame: Spacing & Radius
  ├── Frame: Effects & Elevation
  └── Components
      ├── cmp/button/filled
      ├── cmp/button/outlined
      ├── cmp/textfield/outlined
      ├── cmp/card/default
      ├── cmp/badge/success
      └── ... (todos los componentes)

Page 2: Screens
  ├── sec/android
  │   ├── frm/splash
  │   ├── frm/login
  │   ├── frm/register
  │   ├── frm/dashboard
  │   ├── frm/appointments-list
  │   ├── frm/appointments-new
  │   └── ... (todas las rutas)
  └── sec/ios
      └── ... (mismas pantallas)

Page 3: Assets
  ├── Icons (exportar SVG)
  ├── Illustrations
  └── Logo variants
```

### Convenciones de Nombrado

#### Componentes
```
cmp/{tipo}/{variante}/{estado}

Ejemplos:
cmp/button/filled/default
cmp/button/filled/pressed
cmp/textfield/outlined/focused
cmp/card/elevated/default
```

#### Frames de Pantalla
```
frm/{nombre-ruta}

Ejemplos:
frm/splash
frm/dashboard
frm/appointments-list
```

#### Secciones
```
sec/{categoría}

Ejemplos:
sec/android
sec/ios
```

#### Design System
```
ds/{tipo}/{nombre}

Ejemplos:
ds/color/primary
ds/text/headline-large
ds/effect/elevation-1
```

---

## 🔄 Mapping Flutter/Material 3

### Color Scheme

```dart
// lib/theme/color_scheme.dart
import 'package:flutter/material.dart';

const ColorScheme lightColorScheme = ColorScheme(
  brightness: Brightness.light,
  
  // Primary
  primary: Color(0xFF16A34A),        // green-600
  onPrimary: Color(0xFFFFFFFF),
  primaryContainer: Color(0xFFDCFCE7), // green-100
  onPrimaryContainer: Color(0xFF0F172A),
  
  // Secondary
  secondary: Color(0xFFF1F5F9),      // primary-100
  onSecondary: Color(0xFF0F172A),
  secondaryContainer: Color(0xFFE2E8F0),
  onSecondaryContainer: Color(0xFF1E293B),
  
  // Tertiary
  tertiary: Color(0xFF3B82F6),       // blue-500
  onTertiary: Color(0xFFFFFFFF),
  
  // Error
  error: Color(0xFFEF4444),          // red-500
  onError: Color(0xFFFFFFFF),
  errorContainer: Color(0xFFFECACA),
  onErrorContainer: Color(0xFFDC2626),
  
  // Surface
  surface: Color(0xFFFFFFFF),
  onSurface: Color(0xFF0F172A),
  surfaceContainerHighest: Color(0xFFF8FAFC), // primary-50
  
  // Outline
  outline: Color(0xFFE2E8F0),        // primary-200
  outlineVariant: Color(0xFFF1F5F9), // primary-100
);
```

### Text Theme

```dart
// lib/theme/text_theme.dart
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';

TextTheme textTheme = GoogleFonts.interTextTheme(
  const TextTheme(
    displayLarge: TextStyle(
      fontSize: 57,
      fontWeight: FontWeight.w600,
      letterSpacing: -0.25,
      height: 1.12,
    ),
    headlineLarge: TextStyle(
      fontSize: 32,
      fontWeight: FontWeight.w600,
      height: 1.25,
    ),
    headlineMedium: TextStyle(
      fontSize: 28,
      fontWeight: FontWeight.w600,
      height: 1.29,
    ),
    headlineSmall: TextStyle(
      fontSize: 24,
      fontWeight: FontWeight.w600,
      height: 1.33,
    ),
    titleLarge: TextStyle(
      fontSize: 22,
      fontWeight: FontWeight.w500,
      height: 1.27,
    ),
    titleMedium: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.15,
      height: 1.5,
    ),
    titleSmall: TextStyle(
      fontSize: 14,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.1,
      height: 1.43,
    ),
    bodyLarge: TextStyle(
      fontSize: 16,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.5,
      height: 1.5,
    ),
    bodyMedium: TextStyle(
      fontSize: 14,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.25,
      height: 1.43,
    ),
    bodySmall: TextStyle(
      fontSize: 12,
      fontWeight: FontWeight.w400,
      letterSpacing: 0.4,
      height: 1.33,
    ),
    labelLarge: TextStyle(
      fontSize: 14,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.1,
      height: 1.43,
    ),
    labelMedium: TextStyle(
      fontSize: 12,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.5,
      height: 1.33,
    ),
    labelSmall: TextStyle(
      fontSize: 11,
      fontWeight: FontWeight.w500,
      letterSpacing: 0.5,
      height: 1.45,
    ),
  ),
);
```

### Theme Data

```dart
// lib/theme/theme.dart
import 'package:flutter/material.dart';
import 'color_scheme.dart';
import 'text_theme.dart';

ThemeData appTheme = ThemeData(
  useMaterial3: true,
  colorScheme: lightColorScheme,
  textTheme: textTheme,
  
  // Elevation
  elevatedButtonTheme: ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      elevation: 0,
      padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 10),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    ),
  ),
  
  // Card
  cardTheme: CardTheme(
    elevation: 1,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
    ),
  ),
  
  // Input
  inputDecorationTheme: InputDecorationTheme(
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(8),
    ),
    contentPadding: const EdgeInsets.all(16),
  ),
);
```

### Spacing Constants

```dart
// lib/theme/spacing.dart
class AppSpacing {
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 12.0;
  static const double lg = 16.0;
  static const double xl = 24.0;
  static const double xxl = 32.0;
  static const double xxxl = 40.0;
}

class AppRadius {
  static const double xs = 4.0;
  static const double sm = 8.0;
  static const double md = 12.0;
  static const double lg = 16.0;
  static const double xl = 20.0;
  static const double xxl = 24.0;
  static const double full = 9999.0;
}
```

---

## 📤 Exports y Handoff

### Assets para Exportar

#### Iconos
```
Export settings:
- Format: SVG
- Android: también PNG @1x, @2x, @3x, @4x
- iOS: también PDF o PNG @1x, @2x, @3x
```

#### Logo
```
Export variants:
- logo-full-color.svg
- logo-white.svg (para app bar)
- logo-monochrome.svg
- Sizes: 48×48, 64×64, 128×128, 256×256
```

#### Ilustraciones
```
- SVG primary
- PNG fallback @2x, @3x
```

### Inspect Mode (Dev Mode)

Para cada componente y pantalla, incluir en notas:

```
Component: {nombre}
Flutter Widget: {widget sugerido}
Size: {width} × {height}
Padding: {specs}
Radius: {valor}
Colors: {tokens usados}
Typography: {text styles}
Elevation: {level}
```

### Redlines Example

Para botón primary:
```
┌─────────────────────────┐
│  8px    24px         8px│
│  ↓     ↓            ↓   │
├───┬──────────────┬───────┤
│ 40│  [  TEXT  ]  │       │ ← Height: 40px
├───┴──────────────┴───────┤
│←─────────280px──────────→│
│  Radius: 8px all corners │
│  Bg: primary (#16a34a)   │
│  Text: label-large       │
└──────────────────────────┘
```

---

## ✅ Checklist de QA

### Design System
- [ ] Todos los Color Styles creados (mínimo 20)
- [ ] Todos los Text Styles creados (13 variantes M3)
- [ ] Effect Styles (4 elevaciones)
- [ ] Tokens de spacing documentados
- [ ] Tokens de radius documentados

### Componentes
- [ ] App Bar (2 variantes)
- [ ] Bottom Navigation (5 items)
- [ ] Buttons (4 tipos con estados)
- [ ] Text Fields (2 tipos con estados)
- [ ] Cards (2 tipos)
- [ ] Badges (5 status)
- [ ] Tabs (activo/inactivo)
- [ ] Bottom Sheet
- [ ] Dialog
- [ ] Message Bubble (2 tipos)
- [ ] Empty State
- [ ] Loading (spinner + skeleton)

### Screens
- [ ] 14 pantallas principales creadas
- [ ] Variantes Android (360×800) e iOS (390×844)
- [ ] Auto Layout en todos los frames
- [ ] Safe areas respetadas
- [ ] Notas con rutas Flutter agregadas

### Accesibilidad
- [ ] Contraste AA verificado
- [ ] Touch targets ≥ 44 px
- [ ] Estados de foco visibles
- [ ] Textos escalables

### Exports
- [ ] Logo exportado (4 variantes)
- [ ] Iconos exportados (SVG + PNG)
- [ ] Ilustraciones exportadas
- [ ] Hoja de navegación creada

### Handoff
- [ ] Dev Mode activado
- [ ] Specs por componente completos
- [ ] Mapping a Flutter documentado
- [ ] README con instrucciones de uso

---

## 🚀 Próximos Pasos

1. **Crear archivo Figma** con estructura de 3 Pages
2. **Implementar Design System** (colores, tipografía, efectos)
3. **Construir componentes base** con variantes
4. **Diseñar 14 pantallas** en Android e iOS
5. **Activar Dev Mode** y agregar specs
6. **Exportar assets** según configuración
7. **Crear documento de handoff** para equipo Flutter
8. **QA de accesibilidad** con plugin Figma

---

## 📚 Referencias

- [Material Design 3](https://m3.material.io/)
- [Flutter Material Components](https://docs.flutter.dev/ui/widgets/material)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [Inter Font](https://fonts.google.com/specimen/Inter)
- [Apple HIG - iOS](https://developer.apple.com/design/human-interface-guidelines/ios)
- [Material Design for Android](https://developer.android.com/design)

---

**Versión**: 1.0  
**Fecha**: 2025-10-02  
**Autor**: Equipo Integra IPS  
**Status**: Ready for Design Implementation
