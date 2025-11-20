# Resumen de Cambios - Calculadora Fiscal

Hoy se realizaron varias actualizaciones y mejoras importantes a la aplicación `nominamx---calculadora-fiscal`. A continuación se detalla el trabajo realizado:

## 1. Refactorización del Cálculo de Aguinaldo

Para mayor claridad y modularidad, el cálculo del aguinaldo se separó de la lógica principal de la nómina.

- **Servicio de Cálculo:** Se movió la lógica del aguinaldo a una nueva función `calculateAguinaldo` dentro de `calculatorService.ts`.
- **Interfaz de Usuario:** Se eliminó el interruptor "Incluir Aguinaldo" y se reemplazó por una tarjeta dedicada que permite al usuario introducir los días de aguinaldo y calcularlo de forma independiente en cualquier momento.

## 2. Implementación del Cálculo de Prima Vacacional

Se añadió una nueva funcionalidad para calcular la prima vacacional, un derecho laboral importante.

- **Nueva Lógica de Cálculo:** Se creó la función `calculatePrimaVacacional` en `calculatorService.ts` para manejar el pago (25% del salario correspondiente a los días de vacaciones) y su exención fiscal (hasta 15 UMAs).
- **Nueva Interfaz:** Se agregó una nueva tarjeta en la UI donde el usuario puede especificar los días de vacaciones y el porcentaje de la prima para realizar el cálculo.

## 3. Implementación de Pago por Días Festivos y Domingos

Se añadieron opciones para registrar y calcular la compensación por trabajar en días no laborables.

- **Días Festivos Laborados:** Se agregó un campo para que el usuario indique si trabajó en un día festivo. El sistema calcula el pago adicional correspondiente a un salario doble, sumándolo al ingreso total.
- **Prima Dominical:** Se incluyó un campo para los domingos trabajados. La aplicación calcula la prima del 25% sobre el salario diario y maneja la exención fiscal correspondiente (1 UMA por domingo trabajado).
- **Actualización de UI:** La interfaz principal ahora muestra campos para estos dos nuevos conceptos y presenta un desglose del pago adicional en la sección de resultados.

## 4. Aclaración sobre el Cálculo de Días Festivos

Se resolvió una duda del usuario sobre cómo se calcula el pago de un día festivo. Se explicó que el sistema sigue la Ley Federal del Trabajo, pagando el salario diario (ya incluido en el sueldo base) más un salario doble adicional, resultando en un **pago triple** por ese día. Se aclaró por qué este monto puede ser diferente al de horas extra, debido a que se basan en unidades distintas (salario diario vs. salario por hora).
