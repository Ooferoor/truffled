(function () {
  const partnerScript = document.createElement("script");
  partnerScript.async = true;
  document.head.appendChild(partnerScript);
  const adsEnabled = localStorage.getItem("adsEnabled");
  const isAdsOn = adsEnabled === null ? true : adsEnabled === "true";
  if (isAdsOn) {
    const adScript = document.createElement("script");
    adScript.type = "text/javascript";
    adScript.src = "//pl27846331.effectivegatecpm.com/3f/32/36/3f3236be1ec5673d9ed3582262c4dab9.js";
    adScript.async = true;
    const appendAdScript = () => document.body.appendChild(adScript);
    if (document.body) appendAdScript();
    else document.addEventListener("DOMContentLoaded", appendAdScript);
  } else {
    console.log("disabled.");
  }
})();
