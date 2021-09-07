var isFirstTimeTuto = false;
var textFirstPopup = 'Hey ! Welcome to iits world 😊 This is how to start a discussion with someone ! You can be 4 max in a bubble.';
var textSecondPopup = 'Let\'s play a Scavenger Hunt Game 😊  ';
var targetObjectTutoBubble ='Tutobubble';
var targetObjectTutoChat ='tutoChat';
var targetObjectTutoExplanation ='tutoExplanation';
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
            label: "Next",
            className: "popUpElement",
            callback: (popup) => {
                popup.close();

                WA.openPopup(targetObjectTutoChat, textSecondPopup, [
                    {
                        label: "Open Chat",
                        className: "popUpElement",
                        callback: (popup1) => {
                            WA.sendChatMessage("Let's see if you can beat this game." +
                                " If you go through the gates you will come to the next level where you need to solve a riddle." +
                                " If you solve the riddle access to the next level will be granted. Try to solve all 3 levels to get access to the jungle party ;) ", 'IITS');
                            popup1.close();
                            WA.openPopup("TutoFinal","You are good to go! Go to the next NPC who will explain the game to you",[
                                {
                                    label: "Got it!",
                                    className : "success",callback:(popup2 => {
                                        popup2.close();
                                        WA.restorePlayerControl();
                                        WA.loadSound(winSoundUrl).play(soundConfig);
                                    })
                                }
                            ])
                        }
                    }

                ])
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
