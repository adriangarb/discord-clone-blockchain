import {useEffect,useState} from 'react'
import styles from '../styles/sidebar.module.css'
import {useRouter} from 'next/router'
import RoomAvatar from './RoomAvatar'
function Sidebar() {
    const router = useRouter()
    const [channels,setChannels] = useState([])
    useEffect(()=>{
        const fetchData = async () => {
        try {
          const response = await fetch(
            `api/getchannels`,
          )
          const data = await response.json()
          setChannels(data)
    
          router.push(`?channel=${data[0].roomId}&name=${data[0].roomName}`)
        } catch (error) {
            console.error(error)
        }
     };
     fetchData()
    }, [])
    return (
        <div className={styles.wrapper}>
            {channels.map((channel,index)=> (
                <RoomAvatar
                    key={index}
                    id={channel.roomId}
                    avatar={channel.avatar}
                    name={channel.roomName}
                />
            ))}
        </div>
    )
}

export default Sidebar