export class Ticket {
  _id: string
  ticket_id: string
  asunto: string
  descripción: string
  imagenes = []
  fecha: string
  tipo_caso: string
  prioridad: string
  estado: string
  usuario_email: string
  responsable= []
}
