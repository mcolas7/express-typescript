// Es molt important en Typescript crear el minim de tipats possibles
// AQUEST FITXER ES PER DEFINICIONS PER AIXO ES types.d.ts
// EN EL MOMENT QUE FEM UN ENUM L'HAURIEM DE CANVIAR A types.ts o seprarar els ENUMS

// HEM CANVIAT ELS ENUMS EN UN FITXER ANOMENAT enum.ts
// Creem els tipus de tipat (string, boolean, etc) que volem que tingui la nostra API per exemple no volem que el Weather sigui un string sino que sigui un ENUM entre aquestes posibilitats aixi que aqui ho declarem
// export type Weather = 'sunny' | 'rainy' | 'cloudy' | 'windy' | 'stormy'
// Aixo es millor ferho amb un ENUM perque aixi podrem accedir directament a ell
// Amb aixo en qualsevol part del codi podriem accedir al Weather.Sunny que ens donaria 'sunny'
// export enum Weather {
//   sunny = 'sunny',
//   Rainy = 'rainy',
//   Cloudy = 'cloudy',
//   Windy = 'windy',
//   Stormy = 'stormy'
// }

// Amb Vsibilty hem de fer el mateix
// export type Visibility = 'great' | 'good' | 'ok' | 'poor'
// export enum Visibility {
//   Great = 'great',
//   Good = 'good',
//   Ok = 'ok',
//   Poor = 'poor'
// }

// Les interficies serveixen per definir com volem que siguin els objectes JSON
export interface DiaryEntry {
  id: number
  date: string
  weather: Weather
  visibility: Visibility
  comment: string
}

// Hem creat un tipo de tipat a partir de la interficie DiaryEntry pero que no conte informacio sensible, amb el Pick li diem els atributs que volem agafar del DiaryEntry
// export type NonSensitiveInfoDiaryEntry = Pick<DiaryEntry, 'id' | 'date' | 'weather' | 'visibility'>
// Ho farem millor amb el Omit que es el contrari que el Pick, li has de dir quin o quins atributs vols omitir
export type NonSensitiveInfoDiaryEntry = Omit<DiaryEntry, 'comment'>

// Com que un nou registre sera lo mateix que el DiaryEntry pero sense el id creem un nou tipus de tipat que agafi el DiaryEntry i omiteixi el id
export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

// En veritat per un objecte tambe podem utilizar un tipat i no una interficie. Les interficies estan pensades perque puguin ser extensibles en canvi els tipats no.
// Un exemple d'extensio d'una interficie:
// interface SpecialDiaryEntry extends DiaryEntry {
//    flightNumber: number
// }

// Els tipats son mes fixos i les interficies mes flexibles
