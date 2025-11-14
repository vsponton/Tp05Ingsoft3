# README — TP5 / Despliegue en Azure

## Resumen

Este repositorio contiene la aplicación del TP5 y las configuraciones de despliegue a Azure App Service.  
Aquí encontrarás cómo acceder a las aplicaciones (QA / PROD) y el proceso estándar de despliegue mediante Azure DevOps.

---

## Acceso a los servicios

- **Entorno QA:**
  - URL pública: [https://webapp-tp5-qa-bed5dmb0cxbxdehx.chilecentral-01.azurewebsites.net](https://webapp-tp5-qa-bed5dmb0cxbxdehx.chilecentral-01.azurewebsites.net)
  - Nota: esta URL corresponde a la Web App `webapp-tp5-qa` creada en Azure.

- **Entorno PROD:**
  - URL pública (reemplazar): `https://webapp-tp5-prod-<id>.chilecentral-01.azurewebsites.net`
  - Nota: esta URL corresponderá a la Web App `webapp-tp5-prod` creada en Azure.

---

## Credenciales y permisos

- **Acceso a Azure Portal:** usar la cuenta institucional correspondiente.  
- **Azure DevOps:**
  - Proyecto: `TP5-PlantHub`
  - Service Connection: `AzurePlantHubConnection`

> **Importante:** No guardar secretos en el repositorio.  
> Usar **Azure Key Vault** o las **Variables/Secretos** del pipeline para el manejo seguro de credenciales.

---

## Pasos concretos para ejecutar el pipeline (resumen)

1. En Azure DevOps → **Pipelines → TP5-PlantHub**.  
2. Seleccionar **“Run pipeline”**.  
3. Confirmar variables si el pipeline las solicita.  
4. Ejecutar y seguir los stages (`Build`, `Deploy QA`, `Deploy PROD`).  
5. Para PROD: aprobar cuando el pipeline solicite la aprobación en el **Environment PROD**.
