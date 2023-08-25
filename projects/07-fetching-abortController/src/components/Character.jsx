import styles from './Character.module.css'

export function Character ({ props }) {
  const { IMAGE, NAME, STATUS, TYPE } = props
  return (
        <div className={styles.card}>
            <img className={styles.image} src={IMAGE} alt={NAME} />
            <h3>Name: <strong>{NAME}</strong></h3>
            <h3>Type: <p className={styles.type}>{TYPE}</p></h3>
            <span className={styles.status}>{STATUS}</span>
        </div>
  )
}
