var isFirstTimeTuto = false;
var textFirstPopup = 'On level 2, there is a place in one of rooms that teleports you to level 3. Hint: For cloud native teams there is a genius guideline, it is called "The ?-Factor App"'
var targetObjectTutoBubble ='level2Message';
var targetObjectTutoChat ='level2Message';
var targetObjectTutoExplanation ='level2Message';
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
