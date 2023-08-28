import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/questions.js'

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✅ ${correct} correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
      <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', placeItems: 'center' }}>
        <button style={{
        width: '120px',
        height: '25px',
        background: '#1B74D2',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer',
        fontWeight: '500',
        letterSpacing: '1px'
      }} onClick={() => reset()}>
          Resetear juego
        </button>
      </div>
    </footer>
  )
}
