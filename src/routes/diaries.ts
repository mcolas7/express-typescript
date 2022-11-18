import express from 'express'
// Per importarho tot d'un fitxer posem el *
import * as diaryServices from '../services/diary'
import toNewDiaryEntry from '../utils'

const router = express.Router()

router.get('/', (_req, res) => {
  res.send(diaryServices.getEntriesWithoutSensitiveInfo())
})

router.get('/:id', (req, res) => {
  // Ens maracara un error en el req.param.id perque sempre els params venen com strings aixi que l'hem de transformar a un numero
  const diary = diaryServices.findById(Number(req.params.id))
  // Si intentem accedir a una propietat del diary ens sortira aixo: diary?.comment
  // Typescript ens esta dient que el valor que retorna la funcio findById pot ser undefined per lo tant necessitem primer controlarho amb un if
  return (diary != null) ? res.send(diary) : res.sendStatus(404)
})

router.post('/', (req, res) => {
  try {
    // El problema es que aqui li estem passant els parametres amb el req.body i no els estem validant per lo tant ens podrien posar un boolean al wather per exemple
    // const { date, weather, visibility, comment } = req.body

    // Per lo tant hem de crear un metode perque validi les dades, l'hem creat en el fitxer utils.ts
    const newDiaryEntry = toNewDiaryEntry(req.body)

    // Una manera facil de ferho es aquest pero no es la mes correcta perque estem repetint codi en el fitxer diary
    // const newDiaryEntry = diaryServices.addDiary(date, weather, visibility, comment)
    // Es molt mes facil passarli un objecte i no tots els parametres
    // const newDiary = diaryServices.addDiary({ date, weather, visibility, comment })
    // Com que ja hem creat l'objecte abans ara nomes fara falta passarli el newDiaryEntry
    const addedDiaryEntry = diaryServices.addDiary(newDiaryEntry)

    res.json(addedDiaryEntry)
  } catch (error: any) {
    res.status(400).send(error.message)
  }
})

export default router
