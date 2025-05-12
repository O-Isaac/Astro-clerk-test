# SupraBox - Plataforma E-commerce

![Arquitectura de la Tienda](https://i.imgur.com/rLErKu0.png)

## 📦 Descripción

SupraBox es una plataforma de comercio electrónico moderna construida con Astro, React y Turso. Integra Stripe para pagos seguros y Clerk para la autenticación de usuarios.

## ✨ Características

- 🛍️ Carrito de compras dinámico
- 💳 Pagos seguros a través de Stripe
- 🔐 Autenticación de usuarios con Clerk
- 🎨 Interfaz moderna con Tailwind CSS
- 📱 Diseño responsive
- 🔄 Actualizaciones en tiempo real
- 🛒 Gestión de productos

## 🛠️ Tecnologías Utilizadas

- **Frontend**:

  - Astro
  - React
  - Tailwind CSS
  - Vaul (para componentes drawer)
  - Nanostores (gestión de estado)

- **Backend**:
  - Turso
  - API de Stripe
  - Autenticación con Clerk

## 📁 Estructura del Proyecto

```text
/
├── public/            # Archivos estáticos
├── src/
│   ├── components/    # Componentes UI
│   ├── hooks/        # Hooks personalizados
│   ├── icons/        # Iconos SVG
│   ├── layouts/      # Layouts de páginas
│   ├── pages/        # Rutas y páginas
│   └── utils/        # Funciones auxiliares
└── astro.config.mjs  # Configuración de Astro
```

## 🔄 Flujo de Trabajo

### Carrito de Compras

1. Usuarios navegan productos
2. Agregan items al carrito
3. Actualizaciones en tiempo real
4. Gestión de cantidades
5. Eliminación de productos

### Proceso de Compra

1. Revisión del carrito
2. Proceder al pago
3. Ingreso de datos de envío
4. Pago mediante Stripe
5. Confirmación del pedido

### Autenticación

- Inicio de sesión/registro con Clerk
- Rutas protegidas
- Gestión de perfil

## 🚀 Inicio Rápido

1. Clonar el repositorio

```bash
git clone [url-repositorio]
```

2. Instalar dependencias

```bash
pnpm install
```

3. Configurar variables de entorno

```env
PUBLIC_CLERK_PUBLISHABLE_KEY=<Token>
CLERK_SECRET_KEY=<token>
ASTRO_DB_REMOTE_URL=<url>
ASTRO_DB_APP_TOKEN<token>
PUBLIC_STRIPE_SECRET_KEY=<token>
STRIPE_PUBLIC_KEY=<token>
```

## 🧞 Comandos

| Comando        | Acción                                    |
| :------------- | :---------------------------------------- |
| `pnpm install` | Instala dependencias                      |
| `pnpm dev`     | Inicia servidor local en `localhost:4321` |
| `pnpm build`   | Construye el sitio para producción        |
| `pnpm preview` | Vista previa local de la construcción     |

## 🤝 Contribuir

¡Las contribuciones son bienvenidas! No dudes en enviar un Pull Request.

## 📝 Licencia

MIT

## 🔗 Enlaces Útiles

- [Documentación de Astro](https://docs.astro.build)
- [Documentación de Stripe](https://stripe.com/docs)
- [Documentación de Turso](https://docs.turso.tech/introduction)
- [Documentación de Clerk](https://clerk.com/docs)
