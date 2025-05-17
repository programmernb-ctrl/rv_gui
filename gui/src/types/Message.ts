import { PlayerData } from './PlayerData'

export interface Message {
   type: string,
   value: string | string[] | PlayerData
}