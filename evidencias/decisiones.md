# Decisiones — TP5 / Despliegue en Azure

## 1. Configuración Inicial de Azure

Se crearon los recursos necesarios para el despliegue de la aplicación **PlantHub** dentro del grupo de recursos `gr-tp05-ingsoft3-2025`.  
Este grupo reúne los servicios requeridos para los entornos QA y Producción.

**Pasos realizados:**
1. Creación del **Resource Group**: `gr-tp05-ingsoft3-2025`
2. Creación del **App Service Plan**: `ASP-grtp05ingsoft32025-8589`
3. Creación de las **Web Apps**:
   - `webapp-tp5-qa` (entorno QA)
   - `webapp-tp5-prod` (entorno PROD)

**Evidencias:**
- Implementación completada de webapp QA  
  ![Evidencia 1](evidencias/foto1.png)
- Implementación completada de webapp PROD  
  ![Evidencia 2](evidencias/foto2.png)

---

## 2. Conexión Azure – Azure DevOps

Se estableció una conexión segura entre **Azure DevOps** y el grupo de recursos en Azure a través de un **Service Connection** de tipo *Azure Resource Manager*.  
Esto permite autenticar y desplegar automáticamente sin credenciales locales.

**Nombre de la conexión:** `azure-tp05-connection`  
**Tipo:** Azure Resource Manager  
**Creadora:** victoria sponton

**Evidencia:**  
![Evidencia 3](evidencias/foto3.png)

---

## 3. Recursos Desplegados

En el portal de Azure se observan todos los recursos generados automáticamente por el pipeline.  
Incluyen las Web Apps, el plan de servicio, el grupo de recursos y los Application Insights asociados.

**Recursos creados:**
- `webapp-tp5-qa` → App Service (QA)
- `webapp-tp5-prod` → App Service (PROD)
- `ASP-grtp05ingsoft32025-8589` → App Service Plan
- `gr-tp05-ingsoft3-2025` → Resource Group

**Evidencia:**  
![Evidencia 3A](evidencias/foto3A.png)

---

## 4. Estrategia de Aprobaciones

Se configuraron aprobaciones en los **Environments** de Azure DevOps para mantener control sobre los despliegues.  
- En QA el despliegue se realiza automáticamente.  
- En PROD requiere aprobación manual por parte de los revisores.  

**Configuración aplicada:**
- Tipo de check: `Approvals`
- Timeout: `30 días`
- Aprobadores: miembros del equipo (M y VS)

**Evidencias:**
- Configuración de aprobaciones  
  ![Evidencia 4](evidencias/foto4.png)
- Solicitud de aprobación pendiente  
  ![Evidencia 5](evidencias/foto5.png)

---

## 5. Ejecución del Pipeline

El pipeline de Azure DevOps fue configurado con tres stages principales:
1. **Build and Test PlantHub** → Ejecuta build y pruebas.
2. **Deploy to QA** → Despliega automáticamente al entorno QA.
3. **Deploy to Producción** → Despliega al entorno productivo tras aprobación.

Todos los stages se completaron exitosamente, con una duración total de aproximadamente **3 minutos y 49 segundos**.

**Evidencia:**  
![Evidencia 6](evidencias/foto6.png)

---

## 6. Conclusiones

El proceso de integración y despliegue continuo implementado en **Azure DevOps** permitió:
- Automatizar las etapas de build, prueba y despliegue.  
- Garantizar seguridad y control mediante aprobaciones manuales.  
- Centralizar la trazabilidad del proceso en DevOps.  
- Asegurar la disponibilidad de los servicios en los entornos QA y PROD.

Con esta configuración, el flujo CI/CD quedó completo y replicable para futuros proyectos.
