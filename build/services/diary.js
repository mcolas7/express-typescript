"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDiary = exports.findById = exports.getEntriesWithoutSensitiveInfo = exports.getEntries = void 0;
const diaries_json_1 = __importDefault(require("./diaries.json"));
// Creem una constant que es diu diaries que es un array del tipus DiaryEntry que es una interficie que hem creat en el fitxer types.d.ts i aixo ve de diaryData que es el fitxer JSON
// Aixo en donara un error "El tipo string no se puede asignar al tipo Weather". El Typescript ens esta dient que del JSON a l'atribut Weather pot venir qualsevol cosa i no el tipo de tipat que hem creat nosaltres en el fitxer types.d.ts anomenat Weather
// Per lo tant li haurem de dir que nosaltres estem segurs (l'obliguem) que en el JSON a l'atribut Weather vindra un dels ENUMS que hem dit nosaltres per lo tant afeim el as Array<DiaryEntry>
// NOMES HEM DE FER AIXO SI SOM NOSALTRES ELS QUE CONTROLEM EL JSON, NO FERHO SI AFAGEM EL JSON D'UNA API EXTERNA
// Els arrays es poden declarar aixi Array<DiaryEntry> o aixi DiaryEntry[]
const diaries = diaries_json_1.default;
// export const getEntries = () => diaries tambe es pot fer aixi
// despres de : posem el tipo que hem de retornar
const getEntries = () => diaries;
exports.getEntries = getEntries;
// Es lo mateix pero sense l'atribut comentaris del DiaryEntry
// export const getEntriesWithoutSensitiveInfo = (): NonSensitiveInfoDiaryEntry[] => diaries
// Amb la linia de adalt hi ha un problema que quan li diem que ens mostri la informacio en la ruta /api/diaries no ens exclou la propietat comment. Aixo ho hem de fer nosaltres manualment. El map ens serveix per crear un nou array
// De manera estatica Typscript controla que no hi hagi un comment pero si volem que aixo pasi de veritat quan el client consulta la informacio ho hem de ccontrolar nosaltres
const getEntriesWithoutSensitiveInfo = () => {
    return diaries.map(({ id, date, weather, visibility }) => {
        return {
            id,
            date,
            weather,
            visibility
        };
    });
};
exports.getEntriesWithoutSensitiveInfo = getEntriesWithoutSensitiveInfo;
// NOMES HO CONTROLA DE MANERA ESTATICA I NO AL MOSTRAR LA INFORMACIO!!!!!!!!!!!!
// Per veure com Typescript ens diu que la propietat comment no exiteix de diariesWithoutSensitiveInfo
// const diariesWithoutSensitiveInfo = getEntriesWithoutSensitiveInfo()
// diariesWithoutSensitiveInfo[0].comment
// DELS PROBLEMES MES COMUNS A TYPESCRIPT ES ALHORA DELS UNDEFINED. Anem a veure un exemple:
// Entre () el que li passem per parametre en aquest cas un id que sera un numero i retornara el NonSensitiveInfoDiaryEntry
const findById = (id) => {
    // UTilitzem la funcio find per buscar un id concret dintre del array. d correspon al NonSensitiveInfoDiaryEntry i id es el parametre que li hem passat a la funcio
    const entry = diaries.find(d => d.id === id);
    // Aixo ens donara un error perque li hem dit que la funcio retornara un NonSensitiveInfoDiaryEntry pero quan tu fas un find si no troba el id retornara un undefined. Per lo tant no sempre retornara un NonSensitiveInfoDiaryEntry, per lo tant li diem que tambe pot tornar un undefined (| undefined)
    if (entry != null) {
        const { comment } = entry, restOfDiary = __rest(entry, ["comment"]);
        return restOfDiary;
    }
    return undefined;
};
exports.findById = findById;
// Per afegir registres al nostre JSON
// export const addDiary = (date: string, weather: Weather, visibility: Visibility, comment: string): DiaryEntry => {
// Ho feiem aixi perque en el fitxer diaries.ts li passavem tots els parametres pero es molt millor passarli un objecte
// Si li passem tots els parametres es molt important importar el Weather i el Visibility que son tipats que nosaltres hem creat en el fitxer types.d.ts
// Com que li passem un objecte per parametre li diem newDiaryEntry que sera del tipat NewDiaryEntry que hem creat en el fitxer types.d.ts
const addDiary = (newDiaryEntry) => {
    // Ho fariem aixi si a la funcio li passem tots els parametres i no un objecte
    // const newDiary = {
    // Per el id tambe es pot fer aixi -> id: Math.max( ...diaries,map(d => d.id)) +1
    // id: diaries.length + 1,
    // date,
    // weather,
    // visibility,
    // comment
    // }
    // Creem el nou registre
    const newDiary = Object.assign({ id: Math.max(...diaries.map(d => d.id)) + 1 }, newDiaryEntry);
    // Per afegir el nou registre al nostre JSON utilitzem el push
    diaries.push(newDiary);
    // Retornem el nou registre
    return newDiary;
};
exports.addDiary = addDiary;
