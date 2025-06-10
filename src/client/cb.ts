import {waitFor, triggerServerCallback, sleep, cache} from '@communityox/ox_lib/client';
import {useWebview} from './useWebview';
import {debugLog} from '@/common/Config';

const Webview = useWebview();

onNet('ox:startCharacterSelect', async (userId: number, ...characters) => {
    if (!userId || !characters) return;

    const sessionStarted = await waitFor(
        () => {
            return NetworkIsSessionStarted();
        },
        'Failed to wait for session start..',
        10000,
    );

    if (!sessionStarted) {
        return;
    }

    setTimeout(async () => {
        const args = [userId, characters];
        const response = await triggerServerCallback<{serverValue: number}>('test:server', 1, args);
        if (!response) return;

        debugLog(`Response from server: ${JSON.stringify(response)}`);

        SendNUIMessage({
            type: 'isVisible',
            value: true,
        });

        await sleep(500);

        if (Webview.getPage() !== 'hud') {
            Webview.setPage('hud');
        }

        LocalPlayer.state.set('webview', 'opened', false);
    }, 50);
});

// Example to get player data in the webview
RegisterNuiCallbackType('playerData');
on('__cfx_nui:playerData', async (data, cb) => {
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
            type: 'playerData',
            value: {
                id: netID,
                name: playerName,
                coords: playerCoords,
            },
        });
    } else {
        cb({
            type: 'playerData',
            value: {
                id: 0,
                name: 'Unknown',
                coords: {x: 0, y: 0, z: 0},
            },
        });
    }
});

AddStateBagChangeHandler(
    'webview',
    `player:${cache.serverId}`,
    async (bagName: string, key: string, value: string, reserved: number, replicated: boolean) => {
        if (bagName && key && value && replicated !== true) {
            const playerFromBag = GetEntityFromStateBagName(bagName);

            const entityExists = await waitFor(
                () => {
                    return NetworkIsSessionStarted();
                },
                'Session is not started!',
                10000,
            );

            if (!entityExists) {
                console.log(`^3[rv_gui] Boilerplate^0 :: Session is not started... !`);
                return;
            }

            if (value === 'opened') {
                if (Webview.getPage() !== 'hud') {
                    return;
                }

                setTick(async () => {
                    if (
                        cache.vehicle ||
                        IsPedWalking(cache.ped) ||
                        IsPedRunning(cache.ped) ||
                        IsPedSprinting(cache.ped)
                    ) {
                        SendNUIMessage({
                            type: 'playerData',
                            value: {
                                id: cache.serverId,
                                name: GetPlayerName(playerFromBag),
                                coords: GetEntityCoords(cache.ped),
                            },
                        });
                    }
                    await sleep(100);
                });
            }
        }
    },
);
