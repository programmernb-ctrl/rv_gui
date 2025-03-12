import { triggerServerCallback } from '@overextended/ox_lib/client';

onNet('ox:startCharacterSelect', (userId: number, characters): void => {
   if (!userId || !characters) return;

   setTimeout(async () => {
      const args = [userId, characters];
      const response = await triggerServerCallback<{ serverValue: number }>('test:server', null, args)
      if (!response || typeof response === undefined) return;

      console.log('Response from server', response);

      SendNUIMessage({
         type: 'isVisible',
         value: true
      })

   }, 50);
})

// Example to get player data in the webview
RegisterNuiCallbackType('playerData');

on('__cfx_nui:playerData', async (data, cb) => {
   const playerData = data;
   if (!playerData) return;

   const pCoords = GetEntityCoords(PlayerPedId())

   cb({
      id: NetworkGetNetworkIdFromEntity(PlayerPedId()),
      name: GetPlayerName(PlayerId()),
      coords: pCoords
   });
})