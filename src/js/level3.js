var isFirstTimeTuto = false;
var textFirstPopup = 'On level 3, find the whiteboard with the password. If the whiteboard doesn\'t open properly, try reloading the page'
var targetObjectTutoBubble ='level3Message';
var targetObjectTutoChat ='level3Message';
var targetObjectTutoExplanation ='level3Message';
var popUpExplanation = undefined;
var enterSoundUrl = "audio/webrtc-in.mp3";
var exitSoundUrl = "audio/webrtc-out.mp3";
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
