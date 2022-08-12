function setTraffic(color)
{
    resetAllLights();
    switch(color)
    {
        case "go":
            let goLight = document.querySelector(".light-go");
            goLight.classList.add("go-on");
            break;
        case "wait":
            let waitLight = document.querySelector(".light-wait");
            waitLight.classList.add("wait-on");
            break;
        case "stop":
            let stopLight = document.querySelector(".light-stop");
            stopLight.classList.add("stop-on");
            break;
    }
}
function resetAllLights()
{
    let lights = document.getElementsByClassName("light");
    lights[0].classList.remove("stop-on");
    lights[1].classList.remove("wait-on");
    lights[2].classList.remove("go-on");
}
let autoTraffic = false;
//setTimeOutIds
let lightTimers = [];
function autoControl(btn)
{
    if(!autoTraffic)
    {
       startTraffilight();
    }
    else{
        for(let timerId of lightTimers)
        {
            clearTimeout(timerId);
            resetAllLights();
        }
    }

    autoTraffic = !autoTraffic;
    btn.innerText = autoTraffic? "PAUSE" : "START";

}

function startTraffilight()
{
    setTraffic("stop");
    goTimerId = setTimeout(
        ()=>{
            setTraffic("go");
            waitTimerId = setTimeout(()=>{
                setTraffic("wait");

                resetTimeId = setTimeout(()=>{
                    startTraffilight();
                },2000);
                lightTimers.push(resetTimeId);
            },5000);
            lightTimers.push(waitTimerId);
        },5000);

        lightTimers.push(goTimerId);

}