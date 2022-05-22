import React, { useContext } from 'react'
import styles from '../styles/messageForm.module.css'
import Image from 'next/image'
import plusFilled from '../assets/icons/plus-filled.svg'
import sticker from '../assets/icons/sticker.svg'
import smiley from '../assets/icons/smiley.svg'
import gift from '../assets/icons/gift.svg'
import gif from '../assets/icons/gif.svg'
import { DiscordContext } from '../context/context'
function MessageForm() {
  const {
    messageText,
    setMessageText,
    placeholder,
    gun,
    roomName,
    currentAccount,
    currentUser
  } = useContext(DiscordContext)
  const sendMessage = (event) =>{
    event.preventDefault()
    if(!currentUser) {
      console.error('there is no account logged in!')
    } else {
      if(messageText.trim() === '') return
      const messagesRef = gun.get(roomName)
      const newMessage = {
        sender: currentUser.name,
        avatar: currentUser.avatar
          ? currentUser.avatar
          : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3OCSMFIW5fZ3vSN6yGpD-w-6SsL2_ZPA_sw&usqp=CAU',
        content: messageText.trim(),
        createdAt: Date().substring(4, 11),
        messageId: Date.now(),
      }
      messagesRef.set(newMessage);
      setMessageText('');
    };
    

    
  }
  const getData = async() =>{
    try {
      const response = await fetch(
      `api/getCurrentUserData?account=${currentAccount}`,
    )
    const data = await response.json()
    console.log(currentUser)
  } 
  catch (error) {
    console.error(error)
  }
  }
  return (
    <form
      onSubmit={event => sendMessage(event)}
      className={styles.chatInputContainer}
    >
      <div className={styles.chatInputWrapper}>
        <div className={styles.svgContainer}>
          <Image
            height={25}
            width={25}
            src={plusFilled}
            className={styles.svg}
          />
        </div>
        <input
          type='text'
          className={styles.chatInput}
          onChange={e => setMessageText(e.target.value)}
          placeholder={placeholder}
        />

        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={gift} className={styles.svg} />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={gif} className={styles.svg} />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={sticker} className={styles.svg} />
        </div>
        <div className={styles.svgContainer}>
          <Image height={25} width={25} src={smiley} className={styles.svg} />
        </div>
      </div>
    </form>
  )
}

export default MessageForm