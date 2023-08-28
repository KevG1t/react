import { LeftArrowIcon, RightArrowIcon } from './Icons.jsx'
import styles from './Game.module.css'
import { useQuestionsStore } from '../store/questions.js'
import { Footer } from './Footer.jsx'

const getStylesColor = (info, index) => {
  const noSelected = styles.option
  const incorrect = `${styles.option} ${styles.incorrect}`
  const correct = `${styles.option} ${styles.correct}`
  const { userSelectedOption, correctOption } = info

  // no ha seleccionado
  if (userSelectedOption === undefined) return noSelected
  // selecciono pero incorrecto
  if (index !== correctOption && index !== userSelectedOption) return noSelected
  // si es la correcta
  if (index === correctOption) return correct
  // si es incorrecta
  if (index === userSelectedOption) return incorrect
  // si no es ninguna
  return noSelected
}

export function Game () {
  const questions = useQuestionsStore(state => state.questions)
  const currentQuestion = useQuestionsStore(state => state.currentQuestion)
  const goNexQuestion = useQuestionsStore(state => state.goNexQuestion)
  const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)
  const selectOption = useQuestionsStore(state => state.selectOption)

  const info = questions[currentQuestion]
  const amount = questions.length

  const createHandleClick = (optionIndex) => () => { selectOption(info.id, optionIndex) }

  return (
       <>
        <section className={styles.questionNavigate}>
            <button onClick={goPrevQuestion} disabled={currentQuestion === 0} className={styles.btnNav}> <LeftArrowIcon/> </button>
                <span>{currentQuestion + 1}/{amount}</span>
            <button disabled={currentQuestion >= amount - 1} onClick={goNexQuestion} className={styles.btnNav}> <RightArrowIcon/> </button>
            </section>
        <section className={styles.gameContainer}>

            <p className={styles.question}>{info.question}</p>
            <ul className={styles.optionsContainer}>
                {info.options.map((option, index) => {
                  return (
                        <button disabled={info.userSelectedOption !== undefined} onClick={createHandleClick(index)} key={index} className={getStylesColor(info, index)}>{option}</button>
                  )
                })}

            </ul>
        </section>
        <Footer/>
       </>
  )
}
