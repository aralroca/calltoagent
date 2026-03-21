---
title: "Por qué construimos CallToAgent: Reemplazando la música de espera con resolución instantánea por IA"
date: "2024-03-21"
excerpt: "Estábamos cansados de los agentes de voz robóticos que no podían 'hacer' nada realmente. Así que construimos una infraestructura que se conecta directamente a tus herramientas de negocio."
author: "Aral Roca"
category: "Startup"
image: "/blog/introducing-calltoagent.jpg"
---

# Por qué construimos CallToAgent: Reemplazando la música de espera con resolución instantánea por IA

Hola Indie Hackers,

Soy Aral, y como muchos de vosotros, he pasado el último año obsesionado con el potencial de los LLMs. Pero cuando se trataba de voz, algo se sentía roto.

Todos hemos visto las demostraciones llamativas de voces de IA que suenan humanas. Pero cuando realmente intentas usarlas para un negocio —para reservar una cita real en una clínica o comprobar el estado de un pedido real— fallan. ¿Por qué? Porque están desconectadas de la lógica de negocio.

## El Problema del "Contexto"

La mayoría de los agentes de voz son solo un envoltorio elegante alrededor de un modelo de texto. Pueden hablar, pero no pueden *actuar*. 

Si un paciente llama a una clínica, no quiere oír "haré que alguien le llame de vuelta". Quieren la cita reservada. Punto. Para hacer eso, el agente necesita "ver" el calendario.

## Construyendo para el "Estándar Abierto" (MCP)

Cuando Anthropic lanzó el **Model Context Protocol (MCP)**, supimos que era la pieza que faltaba. En lugar de construir integraciones desordenadas y propietarias para cada CRM y base de datos, decidimos construir una infraestructura que fuera **nativa en MCP desde el primer día**.

Esto permite a nuestros agentes:
- Navegar por tu disponibilidad en tiempo real mediante Google Calendar.
- Buscar pedidos en tu base de datos SQL específica.
- Actualizar los registros de pacientes en un EHR.

## La Velocidad es una Característica

En la voz, cada milisegundo cuenta. Una pausa de 1 segundo parece una eternidad. Hemos luchado duro para mantener nuestra latencia de viaje de ida y vuelta **por debajo de los 600ms** (y a menudo por debajo de los 300ms) al co-ubicar nuestra infraestructura cerca de los PoP de telefonía.

## El Resultado

Ya hemos visto a una clínica en Madrid reducir su tasa de inasistencia en un **40%** solo con el hecho de que el agente gestione las confirmaciones y re-reservas fuera de horario.

Estamos construyendo CallToAgent para que sea la fontanería para la próxima generación de negocios que priorizan la voz. No más "presione 1 para ventas". Solo resolución instantánea.

¡Me encantaría saber qué pensáis o si habéis enfrentado desafíos similares con la voz de la IA!

— Aral
