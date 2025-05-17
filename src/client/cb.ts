import { waitFor, triggerServerCallback, sleep } from '@communityox/ox_lib/client';
import { useWebview } from './useWebview';

const Webview = useWebview();

onNet('ox:startCharacterSelect', async (userId: number, ...characters) => {
   if (!userId || !characters) return;

   const sessionStarted = await waitFor(() => {
      return NetworkIsSessionStarted();
   }, 'Failed to wait for session start..', 10000);

   if (!sessionStarted) {
      return
   }

   setTimeout(async () => {
      const args = [userId, characters]
      const response = await triggerServerCallback<{ serverValue: number }>('test:server', 1, args)
      if (!response) return;

      console.log(`Response from server: ${JSON.stringify(response)}`);

      LocalPlayer.state.set('webview', 'opened', false)

      SendNUIMessage({
         type: 'isVisible',
         value: true
      })

      await sleep(10)

      if (Webview.getPage() !== 'hud') {
         Webview.setPage('hud');
      }
   }, 50);
})

// Example to get player data in the webview
RegisterNuiCallbackType('playerData');
on('__cfx_nui:playerData', async (data, cb) => {
   const playerData = data;
   if (!playerData) return;

   let netID: number = 0;
   let tried: number = 0;

   while (netID === 0 && tried < 10) {
      netID = NetworkGetNetworkIdFromEntity(PlayerPedId());
      tried++;
      await sleep(1000);
   }

   if (netID > 0) {
      const playerName = GetPlayerName(PlayerId());
      const playerCoords = GetEntityCoords(PlayerPedId());

      cb({
         id: netID,
         name: playerName,
         coords: playerCoords
      });
   } else {
      cb({
         id: 0,
         name: 'Unknown',
         coords: { x: 0, y: 0, z: 0 }
      });
   }
})

AddStateBagChangeHandler('webview', '', async (bagName: string, key: string, value: any) => {
   if (bagName && key && value) {
      const playerFromBag = GetEntityFromStateBagName(bagName)

      const entityExists = await waitFor(() => {
         return DoesEntityExist(playerFromBag)
      }, 'Entity does not exist!', 1000)

      if (entityExists === true) {
         Citizen.trace(`Got Player ${playerFromBag} from StateBag...`);

         // emit('rv_gui:client:UpdateData', value as boolean)
      }
   }
});
