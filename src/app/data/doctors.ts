export interface Doctor {
  id: string;
  name: string;
  title: string; // Dr., Dra., Fgo., Fga.
  specialty: string;
  image: string;
  yearsExperience: number;
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  certifications: string[];
  expertise: string[];
  schedule: {
    day: string;
    hours: string;
  }[];
  location: string;
  bio: string;
  languages: string[];
  ratingScore: number;
  totalReviews: number;
}

export const doctors: Doctor[] = [
  {
    id: 'carlos-mendoza',
    name: 'Carlos Mendoza',
    title: 'Dr.',
    specialty: 'Otorrinolaringología',
    image: 'https://images.unsplash.com/photo-1762237798212-bcc000c00891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcwNjk1MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 15,
    education: [
      {
        degree: 'Especialización en Otorrinolaringología',
        institution: 'Universidad Nacional de Colombia',
        year: '2009'
      },
      {
        degree: 'Medicina y Cirugía',
        institution: 'Universidad de los Andes',
        year: '2006'
      }
    ],
    certifications: [
      'Certificación en Cirugía Endoscópica de Nariz y Senos Paranasales',
      'Fellowship en Cirugía de Base de Cráneo - Cleveland Clinic',
      'Certificación en Fibronasolaringoscopia Avanzada'
    ],
    expertise: [
      'Cirugía de nariz y senos paranasales',
      'Fibronasolaringoscopia',
      'Nasosinuscopia',
      'Manejo integral de las disfonías de voz',
      'Cirugía de Trompa de Eustaquio'
    ],
    schedule: [
      { day: 'Lunes', hours: '08:00 - 12:00' },
      { day: 'Miércoles', hours: '14:00 - 18:00' },
      { day: 'Viernes', hours: '08:00 - 12:00' }
    ],
    location: 'Consulta 201 - Edificio Principal',
    bio: 'Médico especialista en Otorrinolaringología con más de 15 años de experiencia en el diagnóstico y tratamiento de enfermedades del oído, nariz y garganta. Experto en procedimientos quirúrgicos endoscópicos y manejo integral de patologías ORL complejas.',
    languages: ['Español', 'Inglés'],
    ratingScore: 4.9,
    totalReviews: 248
  },
  {
    id: 'ana-ruiz',
    name: 'Ana Ruiz',
    title: 'Dra.',
    specialty: 'Audiología',
    image: 'https://images.unsplash.com/photo-1652549210870-bf3a6955f9d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzA2NDU2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 12,
    education: [
      {
        degree: 'Maestría en Audiología',
        institution: 'Universidad del Rosario',
        year: '2012'
      },
      {
        degree: 'Fonoaudiología',
        institution: 'Universidad Nacional de Colombia',
        year: '2010'
      }
    ],
    certifications: [
      'Certificación en Implantes Cocleares',
      'Especialización en Potenciales Evocados Auditivos',
      'Certificación en Adaptación de Audífonos Digitales'
    ],
    expertise: [
      'Audiometría tonal y logoaudiometría',
      'Impedanciometría',
      'Potenciales evocados auditivos',
      'Adaptación de audífonos',
      'Evaluación para implantes cocleares'
    ],
    schedule: [
      { day: 'Martes', hours: '08:00 - 13:00' },
      { day: 'Jueves', hours: '14:00 - 18:00' },
      { day: 'Sábado', hours: '08:00 - 12:00' }
    ],
    location: 'Sala de Audiometría - 2do Piso',
    bio: 'Audióloga especializada en diagnóstico y rehabilitación auditiva. Experta en la evaluación completa de la función auditiva y adaptación de dispositivos de amplificación. Amplia experiencia en el manejo de pacientes candidatos a implantes cocleares.',
    languages: ['Español', 'Inglés'],
    ratingScore: 4.8,
    totalReviews: 192
  },
  {
    id: 'roberto-silva',
    name: 'Roberto Silva',
    title: 'Dr.',
    specialty: 'Vértigo y Tinnitus',
    image: 'https://images.unsplash.com/photo-1722600857460-50501b69fd5b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwYXVkaW9sb2dpc3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwNzU0MzA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 18,
    education: [
      {
        degree: 'Subespecialización en Otoneurología',
        institution: 'Hospital Johns Hopkins - USA',
        year: '2011'
      },
      {
        degree: 'Especialización en Otorrinolaringología',
        institution: 'Universidad Javeriana',
        year: '2008'
      },
      {
        degree: 'Medicina y Cirugía',
        institution: 'Universidad del Valle',
        year: '2005'
      }
    ],
    certifications: [
      'Certificación en Videonistagmografía Avanzada',
      'Especialización en Tratamiento de Tinnitus - Reve 134',
      'Certificación en Rehabilitación Vestibular'
    ],
    expertise: [
      'Manejo integral del vértigo',
      'Tratamiento de sonido condicionado para Tinnitus',
      'Videonistagmografía',
      'Electrococleografía',
      'Rehabilitación vestibular'
    ],
    schedule: [
      { day: 'Lunes', hours: '14:00 - 18:00' },
      { day: 'Miércoles', hours: '08:00 - 12:00' },
      { day: 'Viernes', hours: '14:00 - 17:00' }
    ],
    location: 'Consulta 305 - Unidad de Vértigo',
    bio: 'Especialista en trastornos del equilibrio y audición con formación internacional. Pionero en Colombia en la aplicación de tratamientos de última generación para vértigo y tinnitus. Experto en diagnóstico otoneurológico mediante videonistagmografía.',
    languages: ['Español', 'Inglés', 'Portugués'],
    ratingScore: 5.0,
    totalReviews: 156
  },
  {
    id: 'luis-ramirez',
    name: 'Luis Ramírez',
    title: 'Fgo.',
    specialty: 'Fonoaudiología',
    image: 'https://images.unsplash.com/photo-1703449481095-bb99a6928f1d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGVlY2glMjB0aGVyYXBpc3QlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzcwNzU0MzA5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 10,
    education: [
      {
        degree: 'Maestría en Neurorehabilitación',
        institution: 'Universidad del Rosario',
        year: '2016'
      },
      {
        degree: 'Fonoaudiología',
        institution: 'Universidad Nacional de Colombia',
        year: '2014'
      }
    ],
    certifications: [
      'Certificación en Rehabilitación Auditiva',
      'Especialización en Terapia de Voz',
      'Certificación en Disfagia'
    ],
    expertise: [
      'Terapia de rehabilitación auditiva',
      'Terapia de lenguaje',
      'Terapia de voz (manejo de disfonías)',
      'Terapia de disfagia',
      'Terapia del habla'
    ],
    schedule: [
      { day: 'Lunes', hours: '08:00 - 13:00' },
      { day: 'Martes', hours: '14:00 - 18:00' },
      { day: 'Jueves', hours: '08:00 - 13:00' }
    ],
    location: 'Consulta 102 - Unidad de Fonoaudiología',
    bio: 'Fonoaudiólogo especializado en rehabilitación auditiva y terapias de comunicación. Experto en el manejo integral de pacientes con implantes cocleares y audífonos. Amplia experiencia en terapia de voz y lenguaje.',
    languages: ['Español'],
    ratingScore: 4.9,
    totalReviews: 134
  },
  {
    id: 'fernando-rojas',
    name: 'Fernando Rojas',
    title: 'Dr.',
    specialty: 'Otología',
    image: 'https://images.unsplash.com/photo-1762237798212-bcc000c00891?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxlJTIwZG9jdG9yJTIwcHJvZmVzc2lvbmFsJTIwaGVhZHNob3R8ZW58MXx8fHwxNzcwNjk1MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 20,
    education: [
      {
        degree: 'Fellowship en Otología y Neurotología',
        institution: 'House Ear Institute - Los Angeles',
        year: '2006'
      },
      {
        degree: 'Especialización en Otorrinolaringología',
        institution: 'Universidad de Antioquia',
        year: '2004'
      },
      {
        degree: 'Medicina y Cirugía',
        institution: 'Universidad CES',
        year: '2001'
      }
    ],
    certifications: [
      'Certificación en Cirugía de Implantes Cocleares',
      'Certificación en Estapedectomía',
      'Especialización en Implantes de Oído Medio'
    ],
    expertise: [
      'Implantes cocleares',
      'Estapedectomía',
      'Implantes de oído medio',
      'Timpanoplastia',
      'Cirugía reconstructiva del oído'
    ],
    schedule: [
      { day: 'Martes', hours: '09:00 - 13:00' },
      { day: 'Jueves', hours: '09:00 - 13:00' }
    ],
    location: 'Consulta 204 - Unidad de Otología',
    bio: 'Otólogo con formación internacional y más de 20 años de experiencia en cirugía del oído. Pionero en implantes cocleares en Colombia. Experto en procedimientos quirúrgicos complejos del oído medio e interno.',
    languages: ['Español', 'Inglés'],
    ratingScore: 5.0,
    totalReviews: 203
  },
  {
    id: 'patricia-lopez',
    name: 'Patricia López',
    title: 'Dra.',
    specialty: 'Otología',
    image: 'https://images.unsplash.com/photo-1659353886508-63654e63eca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBhdWRpb2xvZ2lzdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzA3NTQzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 14,
    education: [
      {
        degree: 'Subespecialización en Otología',
        institution: 'Universidad de Barcelona - España',
        year: '2012'
      },
      {
        degree: 'Especialización en Otorrinolaringología',
        institution: 'Universidad Javeriana',
        year: '2010'
      },
      {
        degree: 'Medicina y Cirugía',
        institution: 'Universidad del Rosario',
        year: '2007'
      }
    ],
    certifications: [
      'Certificación en Microcirugía del Oído',
      'Especialización en Timpanoplastia Avanzada',
      'Certificación en Cirugía de Oído Medio'
    ],
    expertise: [
      'Timpanoplastia',
      'Cirugía de oído medio',
      'Tratamiento de otitis crónica',
      'Reconstrucción timpánica',
      'Cirugía de colesteatoma'
    ],
    schedule: [
      { day: 'Lunes', hours: '09:00 - 13:00' },
      { day: 'Miércoles', hours: '14:00 - 18:00' },
      { day: 'Viernes', hours: '09:00 - 12:00' }
    ],
    location: 'Consulta 206 - Unidad de Otología',
    bio: 'Especialista en otología y cirugía del oído medio con formación en Europa. Experta en procedimientos reconstructivos y tratamiento de patologías crónicas del oído. Enfoque en atención personalizada y resultados de excelencia.',
    languages: ['Español', 'Inglés', 'Catalán'],
    ratingScore: 4.9,
    totalReviews: 167
  },
  {
    id: 'laura-martinez',
    name: 'Laura Martínez',
    title: 'Dra.',
    specialty: 'Otorrinolaringología',
    image: 'https://images.unsplash.com/photo-1652549210870-bf3a6955f9d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzA2NDU2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 11,
    education: [
      {
        degree: 'Especialización en Otorrinolaringología',
        institution: 'Universidad de los Andes',
        year: '2013'
      },
      {
        degree: 'Medicina y Cirugía',
        institution: 'Universidad El Bosque',
        year: '2010'
      }
    ],
    certifications: [
      'Certificación en Cirugía de Apnea del Sueño',
      'Especialización en Ronquido y FRL',
      'Certificación en Adenoamigdalectomía'
    ],
    expertise: [
      'Tratamiento de ronquido y apnea del sueño',
      'Adenoidectomía',
      'Amigdalectomía',
      'Cirugía de vías respiratorias',
      'Manejo de trastornos del sueño'
    ],
    schedule: [
      { day: 'Martes', hours: '14:00 - 18:00' },
      { day: 'Miércoles', hours: '08:00 - 12:00' },
      { day: 'Viernes', hours: '14:00 - 18:00' }
    ],
    location: 'Consulta 203 - Edificio Principal',
    bio: 'Otorrinolaringóloga especializada en trastornos respiratorios del sueño. Experta en el manejo integral de ronquido y apnea mediante técnicas quirúrgicas avanzadas. Enfoque multidisciplinario para mejorar la calidad de vida de los pacientes.',
    languages: ['Español', 'Inglés'],
    ratingScore: 4.8,
    totalReviews: 145
  },
  {
    id: 'carolina-reyes',
    name: 'Carolina Reyes',
    title: 'Dra.',
    specialty: 'Audiología',
    image: 'https://images.unsplash.com/photo-1659353886508-63654e63eca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBhdWRpb2xvZ2lzdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzA3NTQzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 9,
    education: [
      {
        degree: 'Maestría en Audiología',
        institution: 'Universidad Nacional de Colombia',
        year: '2015'
      },
      {
        degree: 'Fonoaudiología',
        institution: 'Universidad del Rosario',
        year: '2013'
      }
    ],
    certifications: [
      'Certificación en Potenciales Evocados Auditivos',
      'Especialización en Audiología Pediátrica',
      'Certificación en Protección Auditiva'
    ],
    expertise: [
      'Potenciales evocados auditivos',
      'Audiología pediátrica',
      'Tratamiento de sonido condicionado (TSC)',
      'Protectores auditivos',
      'Screening auditivo neonatal'
    ],
    schedule: [
      { day: 'Lunes', hours: '14:00 - 18:00' },
      { day: 'Miércoles', hours: '09:00 - 13:00' },
      { day: 'Viernes', hours: '09:00 - 13:00' }
    ],
    location: 'Sala de Audiometría - 2do Piso',
    bio: 'Audióloga especializada en población pediátrica y evaluaciones auditivas avanzadas. Experta en potenciales evocados auditivos y screening auditivo neonatal. Comprometida con la detección temprana y rehabilitación auditiva infantil.',
    languages: ['Español'],
    ratingScore: 4.9,
    totalReviews: 118
  },
  {
    id: 'valentina-cruz',
    name: 'Valentina Cruz',
    title: 'Fga.',
    specialty: 'Fonoaudiología',
    image: 'https://images.unsplash.com/photo-1652549210870-bf3a6955f9d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzA2NDU2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 8,
    education: [
      {
        degree: 'Especialización en Terapia de Lenguaje',
        institution: 'Universidad del Valle',
        year: '2017'
      },
      {
        degree: 'Fonoaudiología',
        institution: 'Universidad Nacional de Colombia',
        year: '2015'
      }
    ],
    certifications: [
      'Certificación en Terapia de Lenguaje Infantil',
      'Especialización en Trastornos del Habla',
      'Certificación en Intervención Temprana'
    ],
    expertise: [
      'Terapia de lenguaje',
      'Terapia del habla (dificultades articulatorias)',
      'Trastornos del desarrollo del lenguaje',
      'Intervención temprana',
      'Estimulación del lenguaje'
    ],
    schedule: [
      { day: 'Lunes', hours: '14:00 - 18:00' },
      { day: 'Miércoles', hours: '08:00 - 12:00' },
      { day: 'Jueves', hours: '14:00 - 18:00' }
    ],
    location: 'Consulta 103 - Unidad de Fonoaudiología',
    bio: 'Fonoaudióloga especializada en terapia de lenguaje y habla en población infantil. Experta en trastornos del desarrollo del lenguaje y dificultades articulatorias. Enfoque lúdico y personalizado para cada paciente.',
    languages: ['Español'],
    ratingScore: 4.8,
    totalReviews: 95
  },
  {
    id: 'diana-castro',
    name: 'Diana Castro',
    title: 'Fga.',
    specialty: 'Fonoaudiología',
    image: 'https://images.unsplash.com/photo-1659353886508-63654e63eca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBhdWRpb2xvZ2lzdCUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3NzA3NTQzMDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 7,
    education: [
      {
        degree: 'Maestría en Disfagia',
        institution: 'Universidad del Rosario',
        year: '2018'
      },
      {
        degree: 'Fonoaudiología',
        institution: 'Universidad Manuela Beltrán',
        year: '2016'
      }
    ],
    certifications: [
      'Certificación en Disfagia Orofaríngea',
      'Especialización en Rehabilitación de Voz',
      'Certificación en Videofluoroscopia'
    ],
    expertise: [
      'Terapia de disfagia',
      'Terapia de voz (manejo de disfonías)',
      'Rehabilitación de deglución',
      'Trastornos de la voz profesional',
      'Evaluación videofluoroscópica'
    ],
    schedule: [
      { day: 'Martes', hours: '08:00 - 12:00' },
      { day: 'Jueves', hours: '09:00 - 13:00' },
      { day: 'Viernes', hours: '14:00 - 18:00' }
    ],
    location: 'Consulta 104 - Unidad de Fonoaudiología',
    bio: 'Fonoaudióloga especializada en trastornos de la deglución y voz. Experta en el manejo integral de pacientes con disfagia y disfonías. Amplia experiencia en rehabilitación vocal y evaluaciones instrumentales.',
    languages: ['Español'],
    ratingScore: 4.9,
    totalReviews: 87
  },
  {
    id: 'maria-torres',
    name: 'María Torres',
    title: 'Dra.',
    specialty: 'Vértigo y Tinnitus',
    image: 'https://images.unsplash.com/photo-1652549210870-bf3a6955f9d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3NzA2NDU2Njd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    yearsExperience: 13,
    education: [
      {
        degree: 'Especialización en Otoneurología',
        institution: 'Universidad de Buenos Aires - Argentina',
        year: '2013'
      },
      {
        degree: 'Especialización en Otorrinolaringología',
        institution: 'Universidad Nacional de Colombia',
        year: '2011'
      },
      {
        degree: 'Medicina y Cirugía',
        institution: 'Universidad Javeriana',
        year: '2008'
      }
    ],
    certifications: [
      'Certificación en Tinnitusless y Terapia Zen',
      'Especialización en Microaudiometría',
      'Certificación en Rehabilitación Vestibular Avanzada'
    ],
    expertise: [
      'Tratamiento de sonido condicionado para Tinnitus',
      'Microaudiometría',
      'Tinnitusless y Terapia Zen',
      'Manejo de acúfenos crónicos',
      'Terapia cognitivo-conductual para tinnitus'
    ],
    schedule: [
      { day: 'Martes', hours: '14:00 - 18:00' },
      { day: 'Jueves', hours: '14:00 - 18:00' },
      { day: 'Sábado', hours: '09:00 - 12:00' }
    ],
    location: 'Consulta 306 - Unidad de Vértigo',
    bio: 'Especialista en el manejo integral del tinnitus con formación internacional. Pionera en la aplicación de terapias de sonido condicionado en Colombia. Enfoque multidisciplinario combinando tratamiento médico y terapia cognitivo-conductual.',
    languages: ['Español', 'Inglés'],
    ratingScore: 4.9,
    totalReviews: 142
  }
];

// Helper function to get doctor by name
export const getDoctorByName = (fullName: string): Doctor | undefined => {
  const nameWithoutTitle = fullName.replace(/^(Dr\.|Dra\.|Fgo\.|Fga\.)\s+/, '');
  return doctors.find(doc => doc.name === nameWithoutTitle);
};

// Helper function to get doctor by ID
export const getDoctorById = (id: string): Doctor | undefined => {
  return doctors.find(doc => doc.id === id);
};
