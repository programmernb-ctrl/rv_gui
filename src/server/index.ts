import { Game, Player, OrphanMode } from "@nativewrappers/server";
import { onClientCallback, sleep, waitFor } from "@communityox/ox_lib/server";
import './commands';

type PlayerVals = [number, string, string, string, string, number, number, number, number, string | Date][]
type CbResponse = [id: number, characters: PlayerVals]
interface PlayerValues {
   online: boolean;
   source: number | string;
   idents?: string | string[];
}

const players = new Map<string, PlayerValues>()

on('onResourceStart', (resource: string) => {
   if (resource !== GetCurrentResourceName()) {
      return;
   }

   Citizen.trace(`^3[rv_gui] Boilerplate^0 :: started resource!`);
})

on('onResourceStop', (resource: string) => {
   if (resource !== GetCurrentResourceName()) {
      return;
   }

   Citizen.trace('^3[rv_gui] Boilerplate^0 :: stopped resource!');
})

on('playerJoining', async (source: string, oldID: string) => {
   await initPlayers();
})

onClientCallback('test:server', async (playerId, ...args: CbResponse): Promise<number> => {
   Citizen.trace(`^3[rv_gui] Boilerplate^0 :: received ^3 { ${JSON.stringify(args, null, 2)} }^0 at test:server callback.`);

   const gameTimer = GetGameTimer();

   const player = new Player(playerId);

   const onlineState = player.State.online
   if (!onlineState) {
      player.State.set('online', true, true);
   }

   const coords = GetEntityCoords(player.Ped.Handle);
   Citizen.trace(`Coords from player ped: { ${coords} }`);

   const serverValue = gameTimer
   return serverValue
})

AddStateBagChangeHandler('online', null, async (bagName: string, key: string, value: any, _, replicated: boolean) => {
   Citizen.trace(`Bag: ^3${bagName}^0, key: ^3${key}^0, value: ^3${value}^0, replicated: ^3${replicated}^0`);

   const playerHandle = GetPlayerFromStateBagName(bagName);

   const player: Player = new Player(playerHandle)

   if (!player.Exists) {
      return;
   }

   const orphanMode = GetEntityOrphanMode(player.Ped.Handle);
   const netID = NetworkGetNetworkIdFromEntity(player.Ped.Handle);

   if (netID !== 0 && orphanMode !== OrphanMode.DeleteOnOwnerDisconnect && value === true) {
      SetEntityOrphanMode(player.Ped.Handle, OrphanMode.DeleteOnOwnerDisconnect)
      console.log(`^3[rv_gui] Boilerplate^0 :: Orphan Mode for ^1netID^0 ^5${netID}^0 ^3is^0 ^6=>^0 ^5${GetEntityOrphanMode(player.Ped.Handle)}^0`)

      SetPedConfigFlag(player.Ped.Handle, 44, true);
      SetPedConfigFlag(player.Ped.Handle, 115, true);
      SetPedConfigFlag(player.Ped.Handle, 159, false);
      SetPedConfigFlag(player.Ped.Handle, 227, true);
      SetPedConfigFlag(player.Ped.Handle, 318, true);
      return;
   } else {
      await sleep(1000);
   }

   if (DoesEntityExist(player?.Ped.Handle) && value === false) {
      SetPedConfigFlag(player.Ped.Handle, 44, false);
      SetPedConfigFlag(player.Ped.Handle, 115, false);
      SetPedConfigFlag(player.Ped.Handle, 159, true);
      SetPedConfigFlag(player.Ped.Handle, 227, false);
      SetPedConfigFlag(player.Ped.Handle, 318, false);
   }
})

async function initPlayers() {
   const allPlayer = Game.PlayerList();

   for (const player of allPlayer) {
      await sleep(0);

      const playerExists = waitFor(() => {
         return DoesPlayerExist(player.Src)
      }, 'Player does not exist!', 1000);

      if (!playerExists) {
         Citizen.trace(`^3[rv_gui] Boilerplate^0 :: Player does not exist!`);
         continue;
      }

      if (player.State.online) {
         continue;
      }

      player.State.set('online', true, true);

      let playerName = GetPlayerName(player?.Src)

      if (players.has(playerName) && !DoesEntityExist(player.Source)) {
         players.delete(playerName)
      } else {
         players.set(
            GetPlayerName(player.Src),
            {
               online: true,
               source: player.Source ?? player.Src,
               idents: player.Identifiers
            }
         );
      }
   }

   players.forEach((data) => {
      console.log(JSON.stringify(data, null, 2));
   })
}