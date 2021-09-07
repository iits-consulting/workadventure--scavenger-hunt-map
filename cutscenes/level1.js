var isFirstTimeTuto = false;
var textFirstPopup = 'On level 1, go the computers placed on desks. One of them contains a password to the next level.'
var targetObjectTutoBubble ='level1Message';
var targetObjectTutoChat ='level1Message';
var targetObjectTutoExplanation ='level1Message';
var popUpExplanation = undefined;
var enterSoundUrl = "webrtc-in.mp3";
var exitSoundUrl = "webrtc-out.mp3";
var soundConfig = {
    volume : 0.2,
    loop : false
}


function launchTuto (){
    WA.openPopup(targetObjectTutoBubble, textFirstPopup, [
        {
            label: "OK",
            className: "popUpElement",
            callback: (popup) => {
                popup.close();
            }
        }
    ]);
    WA.disablePlayerControl();

}


WA.onEnterZone('popupZone', () => {
    WA.displayBubble();
    WA.loadSound(enterSoundUrl).play(soundConfig);
    if (!isFirstTimeTuto) {
        isFirstTimeTuto = true;
        launchTuto();
    }
    else {
        popUpExplanation = WA.openPopup(targetObjectTutoExplanation, 'Do you want to review the explanation?', [
            {
                label: "No",
                className: "error",
                callback: (popup) => {
                    popup.close();
                }
            },
            {
                label: "Yes",
                className: "success",
                callback: (popup) => {
                    popup.close();
                    launchTuto();
                }
            }
        ])
    }
});


WA.onLeaveZone('popupZone', () => {
    if (popUpExplanation !== undefined) popUpExplanation.close();
    WA.removeBubble();
    WA.loadSound(exitSoundUrl).play(soundConfig);
})
