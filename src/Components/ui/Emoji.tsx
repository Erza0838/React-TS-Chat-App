import React, { useRef, useState } from 'react'
import { Emoji } from '@/Helper/ProfilePage/EmojiCollection/FaceEmojiList'

export default function EmojiComponent() 
{
  const [SelectedEmoji,SetSelectedEmoji] = useState<string>("")
  
  return (
    <>
      <div className="flex flex-row justify-center bg-white w-44 h-16 absolute left-80 top-8 z-10 rounded-sm">        
        {Emoji.unicode.map((emoji,index) => 
        (
          <p key={index} dangerouslySetInnerHTML={{__html: emoji}} className="cursor-pointer bg-cyan-700"/>
        ))}
      </div>
    </>
  )
}
