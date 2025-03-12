import { onClientCallback } from "@overextended/ox_lib/server";

type PlayerVals = [number, string, string, string, string, number, number, number, number, string | Date][]
type CbReturnType = {
   serverValue: number;
}

onClientCallback('test:server', (playerId, ...args: [number, characters: PlayerVals]): CbReturnType | undefined => {
   console.log('onClientCallback', playerId, ...args);

   const gameTimer = GetGameTimer();

   return {
      serverValue: gameTimer
   } as const;
})