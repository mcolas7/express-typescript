// ENS SERVEIX PER VALIDAR LES DADES D'UN NOU REGISTRE
import { NewDiaryEntry } from './types'
// Importem els ENUMS que volem utilitzar
import { Weather, Visibility } from './enums'

// AQUEST COP NOSALTRES HEM CREAT LES VALIDACIONS PERO AIXO HI HAN ALTRES MANERES MES FACILS DE FERHO. COM UTILIZANT UN MIDDELWARE ANOMENAT EXPRESS-VALIDATOR

// Metode per pasejar el comentari
const parseComment = (commentFromRequest: any): string => {
  // Com que necessitarem aquest if mes d'un cop creem una funcio anomenada isString
  // if (typeof commentFromRequest !== 'string') {
  // throw new Error('Incorrect or missing comment')
  // }

  if (!isString(commentFromRequest)) {
    throw new Error('Incorrect or missing comment')
  }

  return commentFromRequest
}

// Metode per saber si es un string
const isString = (string: any): boolean => {
  // El instanceof ho posem perque hi han 2 maneres de crear strings. La 1era es la de sempre const msg = 'Hola mundo' aquesta manera amb el typeof ens donara 'string' pero amb el instanceof String ens donara false
  // La 2na manera de declarar un string (que ningu utilitza) es const b = new String("Hola mundo") que pel typeof ens donara 'object' pero en canvi per el instanceof String ens donara true
  return typeof string === 'string' || string instanceof String
}

// Metode per parsejar una data
const parseDate = (dateFromRequest: any): string => {
  if (!isString(dateFromRequest) || !isDate(dateFromRequest)) {
    throw new Error('Incorrect or missing date')
  }

  return dateFromRequest
}

// Metode per saber si es una data
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date))
}

// Metode per validar el Weather, es a dir, perque sigui una de les opcions que nosaltres hem dit
const parseWeather = (weatherFromRequest: any): Weather => {
  // Aquesta vegada tambe hem de validar que sigui una de les opcions que nosaltres diem que ha de tenir el Weather per aixo creem un metode anomenat isWeather
  if (!isString(weatherFromRequest) || !isWeather(weatherFromRequest)) {
    throw new Error('Incorrect or missing Weather')
  }

  return weatherFromRequest
}

// Metode per saber si es un Weather per parametre li passem qualsevol cosa i retornara un boolea
const isWeather = (param: any): boolean => {
  // Aquesta es una manera senzilla de fer-ho pero ja estem reptetint un tipus de tipat que tenim en el fitxer types.d.ts
  // Imaginat que afegim 'snowy' en el tipat del fitxer types.d.ts doncs tambe ho hauriem d'afegir aqui i si no ens enrecordem de canviarho ens pot donar error
  // return ['sunny', 'rainy', 'cloudy', 'windy', 'stormy'].includes(string)
  // Per lo tant hem de crear un ENUM en el fitxer types.d.ts
  // El Object.values ens retorna una matriu de vols de la propietat enumerables propis d'un obejecte determinat, es a dir, ens estalviem de iterar amb un bucle tot el enum per comprovar si hi ha una de les opcions
  return Object.values(Weather).includes(param)
}

// Metode per validar el Visibility, es a dir, perque sigui una de les opcions que nosaltres hem dit
const parseVisibility = (visibilityFromRequest: any): Visibility => {
  // Aquesta vegada tambe hem de validar que sigui una de les opcions que nosaltres diem que ha de tenir el Visibility per aixo creem un metode anomenat isVisibility
  if (!isString(visibilityFromRequest) || !isVisibility(visibilityFromRequest)) {
    throw new Error('Incorrect or missing Visibility')
  }

  return visibilityFromRequest
}

// Metode per saber si es un Visibility per parametre li passem qualsevol cosa i retornara un boolea
const isVisibility = (param: any): boolean => {
  // Passa exactament el mateix que en el metode isWeather
  return Object.values(Visibility).includes(param)
}

// Aquesta funcio ens servira per validar les dades
// Per parametre li passem un objecte que pot ser qualsevol cosa (any) perque ens ho diu el usuari
const toNewDiaryEntry = (object: any): NewDiaryEntry => {
  const newEntry: NewDiaryEntry = {
    date: parseDate(object.date),
    weather: parseWeather(object.weather),
    visibility: parseVisibility(object.visibility),
    comment: parseComment(object.comment)
  }

  return newEntry
}

// Per poder exportar a altres fitxers el metode toNewDiaryEntry
export default toNewDiaryEntry
