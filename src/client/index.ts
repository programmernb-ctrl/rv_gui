import './cb';
import {sleep, cache} from '@communityox/ox_lib/client';
import {Ped, Vehicle, VehicleSeat} from '@nativewrappers/fivem';
import {useWebview, validPages} from '@/client/useWebview';
import {debugLog} from '@/common/Config';

const webview = useWebview();

onNet('rv_gui:Webview:switch', async (arg: keyof typeof validPages, focus?: number) => {
    await sleep(1);

    debugLog(`^3[rv_gui] Boilerplate^0 | arguments at webview switch event received ^3{ ${arg}, ${focus} }^0`);

    try {
        webview.setPage(arg);

        if (webview.getPage() === arg && focus === 1) {
            webview.focus();
        } else if (webview.getPage() === arg && focus === 0) {
            webview.unfocus();
        } else return;
    } catch (error) {
        debugLog(`^3[rv_gui] Boilerplate^0 | error for webview switch event occured ^1'${error}'^0`);
    }
});

on('gameEventTriggered', (name: string, args) => {
    if (name === 'CEventNetworkPlayerEnteredVehicle') emit('rv_gui:client:enteredVeh', args[0], args[1]);
});

on('rv_gui:client:enteredVeh', (netId: number, vehId: number) => {
    debugLog(`called enteredVeh with netID ${netId} and vehicleID ${vehId}`);

    const pedVehicleIsIn = GetVehiclePedIsIn(cache.ped, false);
    const getPedFromSeat = GetPedInVehicleSeat(vehId, -1);

    if (pedVehicleIsIn !== 0 && getPedFromSeat === cache.ped) {
        LocalPlayer.state.set('inVehicle', true, false);
    }
});

AddStateBagChangeHandler(
    'inVehicle',
    `player:${cache.serverId}`,
    async (bagName: string, key: string, value: boolean, reserved: number, replicated: boolean) => {
        debugLog(`Bag: ${bagName}, key: ${key}, value: ${value}, isReplicated: ${replicated}`);
        if (replicated === true) return;

        let statePlayer = GetPlayerFromStateBagName(bagName);
        let playerPed = Ped.fromHandle(cache.ped);
        let playerVehicle = Vehicle.fromHandle(GetVehiclePedIsIn(cache.ped, false));

        while (!statePlayer && !playerPed && !playerVehicle) {
            await sleep(100);
            statePlayer = GetPlayerFromStateBagName(bagName);
            playerPed = Ped.fromHandle(cache.ped);
            playerVehicle = Vehicle.fromHandle(GetVehiclePedIsIn(cache.ped, false));

            if (statePlayer && playerPed && playerVehicle) {
                break;
            }
        }

        if (key === 'inVehicle' && value === true) {
            if (playerPed?.exists() && playerVehicle?.exists()) {
                SendNUIMessage({
                    type: 'isInVehicle',
                    value: true
                })
                runOnTick(playerPed, playerVehicle);
            }
        } else if (key === 'inVehicle' && value === false) {
            SendNUIMessage({
                type: 'isInVehicle',
                value: false
            })
        }
    },
);

function runOnTick(ped: Ped, vehicle: Vehicle) {
    if (!ped?.exists() || !vehicle?.exists()) return;

    debugLog(`Ped netID: ${ped.NetworkId}, Vehicle netID: ${vehicle.NetworkId}`);

    let tick: number = setTick(async () => {
        await sleep(150);

        const seatPed = vehicle.getPedOnSeat(VehicleSeat.Driver);

        if (seatPed?.isInVehicle ?? cache.vehicle) {
            if (GetEntitySpeed(vehicle.Handle) > 0) {
                SendNUIMessage({
                    type: 'speed',
                    value: GetEntitySpeed(vehicle.Handle),
                });
            } else {
                await sleep(1000);
            }
        } else {
            LocalPlayer.state.set('inVehicle', false, false);
            clearTick(tick);
        }
    });
}
