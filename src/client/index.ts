import './cb';
import { cache, sleep } from '@communityox/ox_lib';
import { Ped, Vehicle, VehicleSeat } from '@nativewrappers/fivem';
import { useWebview, PageIndex } from './useWebview';

const webview = useWebview();

onNet('rv_gui:Webview:switch', async (arg: PageIndex, focus?: number) => {
   await sleep(1);

   Citizen.trace(`^3[rv_gui] Boilerplate^0 | arguments at webview switch event received ^3{ ${arg}, ${focus} }^0`);

   try {
      webview.setPage(arg);

      if (webview.getPage() === arg && focus === 1) {
         webview.focus();
      } else if (webview.getPage() === arg && focus === 0) {
         webview.unfocus();
      } else return;
   } catch (error) {
      Citizen.trace(`^3[rv_gui] Boilerplate^0 | error for webview switch event occured ^1'${error}'^0`)
   }
})

on('gameEventTriggered', (name: string, args) => {
   if (name === 'CEventNetworkPlayerEnteredVehicle')
      emit('rv_gui:client:enteredVeh', args[0], args[1])
});

on('rv_gui:client:enteredVeh', (netId: number, vehId: number) => {
   console.log(`Yeah called enteredVeh with netID ${netId} and vehicleID ${vehId}`);

   const pedVehicleIsIn = GetVehiclePedIsIn(cache.ped, false);
   const getPedFromSeat = GetPedInVehicleSeat(vehId, -1);

   if (pedVehicleIsIn !== 0 && getPedFromSeat === cache.ped) {
      LocalPlayer.state.set('inVehicle', true, false);
   }
})

AddStateBagChangeHandler('inVehicle', '', async (bagName, key, value, _, replicated) => {
   console.log(`Bag: ${bagName}, key: ${key}, value: ${value}, isReplicated: ${replicated}`)

   if (!cache.vehicle) {
      console.log('No vehicle found, returning!')
      return
   }

   let statePlayer = GetPlayerFromStateBagName(bagName)
   let playerPed = Ped.fromHandle(cache.ped)
   let playerVehicle = Vehicle.fromHandle(GetVehiclePedIsIn(cache.ped, false))
   if (!statePlayer && !playerPed && !playerVehicle) {
      await sleep(1)
   }

   if (statePlayer > 0 && key == 'inVehicle' && value === true) {
      SendNUIMessage({
         type: 'isInVehicle',
         value: true
      })

      if (playerPed !== null && playerVehicle !== null && cache.seat !== false) {
         runOnTick(playerPed, playerVehicle)
      }
   } else {
      SendNUIMessage({
         type: 'isInVehicle',
         value: false
      })
   }
})

function runOnTick(ped: Ped, vehicle: Vehicle) {
   if (!ped?.exists() && !vehicle?.exists()) return;

   console.log(`Ped netID: ${ped.NetworkId}, vehicle netID: ${vehicle.NetworkId}`)

   let tick = setTick(async () => {
      await sleep(150)

      let pedOnSeat = vehicle.getPedOnSeat(VehicleSeat.Driver);
      if (pedOnSeat !== null && pedOnSeat?.isInVehicle(vehicle)) {
         if (GetEntitySpeed(vehicle.Handle) > 0) {
            SendNUIMessage({
               type: 'speed',
               value: GetEntitySpeed(vehicle.Handle)
            })
         } else {
            await sleep(1000);
         }
      } else {
         LocalPlayer.state.set('inVehicle', false, false)
         clearTick(tick);
         return;
      }
   })
}