import { useState } from 'react'
export function TwitterFollowCard ({ userName, children, initialIsFollowing }) {

    const [isFollowing, setIsFollwing] = useState(initialIsFollowing)

    const text = isFollowing ? 'Siguiendo' : 'Seguir'
    const buttonClassName = isFollowing ?
    'tw-followCard-button is-following' :
    'tw-followCard-button'

    const handleClick = () => {
        setIsFollwing(!isFollowing)
    }

    return (
        <article className='tw-followCard'>
        <header className='tw-followCard-header'>
            <img 
            className='tw-followCard-avatar' 
            src={`https://unavatar.io/${userName}`} 
            alt="avatar de midudev" />
            
            <div className='tw-followCard-info'>
                <strong>
                    {children}
                </strong>
                <span className="tw-followCard-infoUserName">@{userName}</span>
            </div>
        </header>

        <aside>
            <button className={buttonClassName} onClick={handleClick}>
                <span className="tw-followCard-text"> {text}</span>
                <span className="tw-followCard-stopFollow">Dejar de seguir</span>
            </button>
        </aside>
    </article>
    )
}