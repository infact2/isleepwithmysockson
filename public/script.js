const cursor = "█";

window.onerror = (event) => {
    alert(event);
}

function base64ToBytes(base64) {
    const binString = atob(base64);
    return Uint8Array.from(binString, (m) => m.codePointAt(0));
}

function bytesToBase64(bytes) {
    const binString = String.fromCodePoint(...bytes);
    return btoa(binString);
}

function generate() {
    let input = document.querySelector("#input");
    if (input.disabled) return;

    document.getElementById("generate-btn").disabled = true;
    document.getElementById("generate-btn").innerHTML = "(Please Wait)";
    document.getElementById("loading").style.display = "unset";

    $.post(`/generate/${input.value.replace("/", "%2F")}/${document.getElementById("sentences").value}/${document.getElementById("training-document").value}`, async function (data, status) {
        console.log("balls2");
        await output(data);
        document.getElementById("generate-btn").disabled = false;
        document.getElementById("generate-btn").innerHTML = "Generate";
        document.getElementById("loading").style.display = "none";
    })
}

function delay(ms) { 
    return new Promise(resolve => { 
        setTimeout(() => { resolve('') }, ms); 
    }) 
}

async function output(input) {
    let errorReplaced = false;
    let output = document.querySelector("#output");
    output.innerHTML = cursor;

    const ballsslslsls = input.split(" ");

    for (let i = 0; i < ballsslslsls.length; i++) {
        output.innerHTML = output.innerHTML.replace(cursor, "");
        output.innerHTML += ballsslslsls[i] + " " + cursor;

        output.innerHTML = output.innerHTML.replace("[LTERROR]", "<span style='background: #ffcc00; padding: 7px; font-weight: 700;'>[[ ⚠ ERROR: There was an error with grammar correction, uncorrected version will be displayed instead... ⚠ ]]</span>");
        await delay(17.5);
    }
    output.innerHTML = output.innerHTML.replace(cursor, "");
}

function openAsLink() {
    // window.open("https://www.google.com")
    let data = bytesToBase64(new TextEncoder().encode(document.getElementById("output").innerHTML));

    // let tab = window.open("about:blank");
    // tab.document.write() = data;
    // // window.location.href = data;

    window.open(`/preview/${data}`);
}