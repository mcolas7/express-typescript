"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Per importarho tot d'un fitxer posem el *
const diaryServices = __importStar(require("../services/diary"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get('/', (_req, res) => {
    res.send(diaryServices.getEntriesWithoutSensitiveInfo());
});
router.get('/:id', (req, res) => {
    // Ens maracara un error en el req.param.id perque sempre els params venen com strings aixi que l'hem de transformar a un numero
    const diary = diaryServices.findById(Number(req.params.id));
    // Si intentem accedir a una propietat del diary ens sortira aixo: diary?.comment
    // Typescript ens esta dient que el valor que retorna la funcio findById pot ser undefined per lo tant necessitem primer controlarho amb un if
    return (diary != null) ? res.send(diary) : res.sendStatus(404);
});
router.post('/', (req, res) => {
    try {
        // El problema es que aqui li estem passant els parametres amb el req.body i no els estem validant per lo tant ens podrien posar un boolean al wather per exemple
        // const { date, weather, visibility, comment } = req.body
        // Per lo tant hem de crear un metode perque validi les dades, l'hem creat en el fitxer utils.ts
        const newDiaryEntry = (0, utils_1.default)(req.body);
        // Una manera facil de ferho es aquest pero no es la mes correcta perque estem repetint codi en el fitxer diary
        // const newDiaryEntry = diaryServices.addDiary(date, weather, visibility, comment)
        // Es molt mes facil passarli un objecte i no tots els parametres
        // const newDiary = diaryServices.addDiary({ date, weather, visibility, comment })
        // Com que ja hem creat l'objecte abans ara nomes fara falta passarli el newDiaryEntry
        const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry);
        res.json(addedDiaryEntry);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
exports.default = router;
