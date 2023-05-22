import { Correo } from ;


export function filtrarCorreos(filtro: (c: Correo) => boolean, Correos: Correo[]): Correo[] {
  const correosFiltrados: Correo[] = [];
  for (const c of Correos) {
    if (filtro(c)) {
      correosFiltrados.push(c);
    }
  }
  return correosFiltrados;
}

export function filtrarCorreosPorAsunto(asunto: string, Correos: Correo[]): Correo[] {
  const Porasunto = (c: Correo) => c.getAsunto().includes(asunto);
  return filtrarCorreos(Porasunto, Correos);
}

export function filtrarCorreosPorCorreo(correo: string, Correos: Correo[]): Correo[] {
  const Porcontacto = (c: Correo) => c.getContacto().getCorreo().includes(correo);
  return filtrarCorreos(Porcontacto, Correos);
}

export function filtrarCorreosPorNombre(nombre: string, Correos: Correo[]): Correo[] {
  const Porcontacto = (c: Correo) => c.getContacto().getNombreyApellido().includes(nombre);
  return filtrarCorreos(Porcontacto, Correos);
}

export function filtrarCorreosPorTipoemail(tipoemail: string, Correos: Correo[]): Correo[] {
  const Correogmail = (c: Correo) => c.getContacto().getCorreo().endsWith(tipoemail);
  return filtrarCorreos(Correogmail, Correos);
}

export function filtrarCorreosPorContenido(contenido: string, Correos: Correo[]): Correo[] {
  const Porcontenido = (c: Correo) => c.getContenido().includes(contenido);
  return filtrarCorreos(Porcontenido, Correos);
}