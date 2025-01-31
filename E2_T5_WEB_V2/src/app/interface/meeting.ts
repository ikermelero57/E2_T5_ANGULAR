export interface MeetingStudent {
  id_reunion: number;
  titulo: string;
  asunto: string;
  aula: string;
  fecha: Date;
  estado: string;
  //estadoEus: string | null; //Estado en euskera (puede ser nulo)
  //profesorId: number; // ID del profesor que organiza la reunión
  profesor_nombre: string;
  profesor_apellidos: string;

}


export interface MeetingTeacher {
id_reunion: number;
titulo: string;
asunto: string;
aula: string;
fecha: Date;
estado: string;
//estadoEus: string | null; //Estado en euskera (puede ser nulo)
//profesorId: number; // ID del profesor que organiza la reunión
alumno_nombre: string;
alumno_apellidos: string;
}
