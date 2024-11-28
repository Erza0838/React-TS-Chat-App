"use client"
import React from "react"
import { useState } from "react"
import Picker, { EmojiClickData, EmojiStyle } from "emoji-picker-react"
import { Theme } from "emoji-picker-react"
import dynamic from "next/dynamic"
import { DataEmoji } from "emoji-picker-react/dist/dataUtils/DataTypes"

type CustomEmoji = 
{
    emoji: string
    name: string
    url: string
}
export declare type BaseEmojiProps = {
  emoji?: DataEmoji | CustomEmoji;
  emojiStyle: EmojiStyle;
  unified: string;
  size?: number;
  lazyLoad?: boolean;
  getEmojiUrl?: GetEmojiUrl;
  className?: string;
};
export declare type GetEmojiUrl = (unified: string, style: EmojiStyle) => string;

export default function EmojiPicker() 
{
  const [choseEmoji,setChoseEmoji] = useState<string | null>(null)
  const onEmojiClick = (emojiObject:  CustomEmoji) => 
  {
    setChoseEmoji(emojiObject.emoji)
  }

  console.log("Emoji url : " )

  return (
    <>
        <Picker className="absolute z-10"
                // height={250}
                // width={310}
                onEmojiClick={(emojiData) => onEmojiClick({emoji: emojiData.emoji, name: emojiData.names[1], url: emojiData.imageUrl})}/>
    </>
  )
}